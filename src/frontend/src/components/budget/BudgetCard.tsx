/**
 * BudgetCard — displays a single budget entry with:
 * - Category icon + label
 * - Progress bar (green/amber/red by threshold)
 * - Spent vs. budget amounts + remaining
 * - Edit / Delete action buttons (visible on hover)
 */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Edit2, Trash2, TrendingUp, Zap } from "lucide-react";
import { type BudgetWithSpending, CATEGORY_META } from "../../types";
import { BudgetProgress, getProgressColor } from "./BudgetProgress";

interface BudgetCardProps {
  budget: BudgetWithSpending;
  index: number;
  onEdit: (b: BudgetWithSpending) => void;
  onDelete: (b: BudgetWithSpending) => void;
}

function formatCurrency(v: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);
}

/** Status badge shown below category name */
function StatusBadge({ pct }: { pct: number }) {
  if (pct >= 90) {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-expense">
        <AlertTriangle className="h-3.5 w-3.5" />
        {pct >= 100 ? "Over budget" : "Near limit"}
      </span>
    );
  }
  if (pct >= 70) {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-accent">
        <Zap className="h-3.5 w-3.5" />
        Approaching limit
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs font-medium text-income">
      <TrendingUp className="h-3.5 w-3.5" />
      On track
    </span>
  );
}

export function BudgetCard({
  budget,
  index,
  onEdit,
  onDelete,
}: BudgetCardProps) {
  const meta = CATEGORY_META[budget.category];
  const pct = budget.percentage;
  const isOver = pct >= 100;

  return (
    <div
      className="rounded-xl bg-card border border-border p-5 shadow-card hover:shadow-elevated transition-smooth group"
      data-ocid={`budget.item.${index}`}
    >
      {/* Header row: icon + label + actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Category icon */}
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl",
              meta.bgColor,
            )}
          >
            {meta.icon}
          </div>

          <div className="min-w-0">
            <h4 className="font-semibold text-foreground truncate capitalize">
              {meta.label}
            </h4>
            <StatusBadge pct={pct} />
          </div>
        </div>

        {/* Hover actions */}
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-fast">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(budget)}
            aria-label={`Edit ${meta.label} budget`}
            data-ocid={`budget.edit_button.${index}`}
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(budget)}
            aria-label={`Delete ${meta.label} budget`}
            data-ocid={`budget.delete_button.${index}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Progress section */}
      <div className="mt-4 space-y-2">
        {/* Labels row */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatCurrency(budget.spent)} spent</span>
          <span className="font-medium text-foreground">{pct}%</span>
        </div>

        {/* Progress bar */}
        <BudgetProgress
          percentage={pct}
          ariaLabel={`${meta.label} budget: ${pct}% spent`}
        />

        {/* Amounts row */}
        <div className="flex justify-between text-xs">
          <span
            className={cn(
              "font-semibold",
              isOver ? "text-expense" : "text-income",
            )}
          >
            {isOver
              ? `${formatCurrency(Math.abs(budget.remaining))} over`
              : `${formatCurrency(budget.remaining)} left`}
          </span>
          <span className="text-muted-foreground">
            of {formatCurrency(budget.amount)}
          </span>
        </div>
      </div>

      {/* Over-budget indicator strip */}
      {isOver && (
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-expense/10 px-3 py-1.5 text-xs font-medium text-expense">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          You've exceeded this budget by{" "}
          {formatCurrency(Math.abs(budget.remaining))}
        </div>
      )}
    </div>
  );
}
