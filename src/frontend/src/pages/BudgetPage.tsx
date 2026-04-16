/**
 * BudgetPage — manage monthly budgets with visual progress indicators.
 *
 * Layout:
 *  1. PageHeader + "Set Budget" CTA
 *  2. Summary row (Total Budgeted / Total Spent / Categories Over Budget)
 *  3. Overall monthly budget card (shows aggregate spending vs. total budget)
 *  4. Per-category budget grid
 *  5. BudgetModal (add/edit form)
 *  6. ConfirmDialog (delete confirmation)
 */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  AlertTriangle,
  Plus,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { BudgetCard } from "../components/budget/BudgetCard";
import { BudgetModal } from "../components/budget/BudgetModal";
import { BudgetProgress } from "../components/budget/BudgetProgress";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { EmptyState } from "../components/common/EmptyState";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { PageHeader } from "../components/common/PageHeader";
import { useBudgets, useDeleteBudget } from "../hooks/useBudgets";
import type { BudgetWithSpending } from "../types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(v: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);
}

// ─── Overall Budget Summary Card ──────────────────────────────────────────────

interface OverallBudgetCardProps {
  totalBudgeted: number;
  totalSpent: number;
  overBudgetCount: number;
  month: string;
}

function OverallBudgetCard({
  totalBudgeted,
  totalSpent,
  overBudgetCount,
  month,
}: OverallBudgetCardProps) {
  const pct =
    totalBudgeted > 0 ? Math.round((totalSpent / totalBudgeted) * 100) : 0;
  const isOver = totalSpent > totalBudgeted;
  const remaining = totalBudgeted - totalSpent;

  return (
    <div
      className="rounded-xl border border-border bg-card p-6 shadow-card"
      data-ocid="budget.overall.card"
    >
      {/* Card header */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground">
              Overall Budget
            </h3>
            <p className="text-sm text-muted-foreground">{month}</p>
          </div>
        </div>

        {overBudgetCount > 0 && (
          <div className="flex items-center gap-1.5 rounded-lg bg-expense/10 px-3 py-1.5 text-xs font-semibold text-expense">
            <AlertTriangle className="h-3.5 w-3.5" />
            {overBudgetCount} over budget
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-2 mb-5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {formatCurrency(totalSpent)} spent
          </span>
          <span className="font-semibold text-foreground">{pct}%</span>
        </div>
        <BudgetProgress
          percentage={pct}
          heightClass="h-3"
          ariaLabel={`Overall budget: ${pct}% spent`}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span
            className={cn(
              "font-medium",
              isOver ? "text-expense" : "text-income",
            )}
          >
            {isOver
              ? `${formatCurrency(Math.abs(remaining))} over limit`
              : `${formatCurrency(remaining)} remaining`}
          </span>
          <span>Budget: {formatCurrency(totalBudgeted)}</span>
        </div>
      </div>

      {/* Stat chips */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Budgeted",
            value: formatCurrency(totalBudgeted),
            icon: Wallet,
            color: "text-primary",
          },
          {
            label: "Spent",
            value: formatCurrency(totalSpent),
            icon: TrendingDown,
            color: isOver ? "text-expense" : "text-foreground",
          },
          {
            label: "Remaining",
            value: formatCurrency(Math.abs(remaining)),
            icon: TrendingUp,
            color: isOver ? "text-expense" : "text-income",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-muted/50 border border-border/50 p-3"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <stat.icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <p
              className={cn(
                "font-display text-base font-bold tabular-nums",
                stat.color,
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function BudgetPage() {
  const { data: budgets = [], isLoading } = useBudgets();
  const deleteMutation = useDeleteBudget();
  const now = new Date();

  const [modalOpen, setModalOpen] = useState(false);
  const [editBudget, setEditBudget] = useState<
    BudgetWithSpending | undefined
  >();
  const [budgetToDelete, setBudgetToDelete] = useState<
    BudgetWithSpending | undefined
  >();

  // ─── Computed stats ─────────────────────────────────────────────────────────

  const totalBudgeted = useMemo(
    () => budgets.reduce((s, b) => s + b.amount, 0),
    [budgets],
  );
  const totalSpent = useMemo(
    () => budgets.reduce((s, b) => s + b.spent, 0),
    [budgets],
  );
  const overBudgetCount = useMemo(
    () => budgets.filter((b) => b.percentage >= 100).length,
    [budgets],
  );

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const openAddModal = () => {
    setEditBudget(undefined);
    setModalOpen(true);
  };

  const openEditModal = (b: BudgetWithSpending) => {
    setEditBudget(b);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditBudget(undefined);
  };

  const handleDeleteConfirm = async () => {
    if (!budgetToDelete) return;
    await deleteMutation.mutateAsync(budgetToDelete.id);
    setBudgetToDelete(undefined);
  };

  const monthLabel = format(now, "MMMM yyyy");

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6" data-ocid="budget.page">
      {/* Page header */}
      <PageHeader
        title="Budget Management"
        subtitle={`Monthly spending limits for ${monthLabel}`}
        actions={
          <Button onClick={openAddModal} data-ocid="budget.add_button">
            <Plus className="mr-2 h-4 w-4" />
            Set Budget
          </Button>
        }
      />

      {/* Loading */}
      {isLoading && (
        <LoadingSpinner size="md" label="Loading budgets…" className="py-16" />
      )}

      {/* Empty state */}
      {!isLoading && budgets.length === 0 && (
        <EmptyState
          icon={Target}
          title="No budgets set yet"
          description="Set monthly spending limits per category to track your financial goals and stay on target."
          actionLabel="Set Your First Budget"
          onAction={openAddModal}
          ocid="budget"
          className="py-24"
        />
      )}

      {/* Budget content */}
      {!isLoading && budgets.length > 0 && (
        <>
          {/* Overall summary card */}
          <OverallBudgetCard
            totalBudgeted={totalBudgeted}
            totalSpent={totalSpent}
            overBudgetCount={overBudgetCount}
            month={monthLabel}
          />

          {/* Section heading */}
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Category Budgets
            </h3>
            <span className="text-sm text-muted-foreground">
              {budgets.length} budget{budgets.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Per-category budget grid */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {budgets.map((budget, i) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                index={i + 1}
                onEdit={openEditModal}
                onDelete={setBudgetToDelete}
              />
            ))}
          </div>
        </>
      )}

      {/* Add / Edit modal */}
      <BudgetModal
        open={modalOpen}
        onClose={closeModal}
        editBudget={editBudget}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!budgetToDelete}
        onOpenChange={(isOpen) => {
          if (!isOpen) setBudgetToDelete(undefined);
        }}
        title="Remove Budget"
        description={
          budgetToDelete
            ? `Remove the ${budgetToDelete.category} budget? This will not affect existing transactions.`
            : undefined
        }
        confirmLabel="Remove"
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
        ocid="budget.delete"
      />
    </div>
  );
}
