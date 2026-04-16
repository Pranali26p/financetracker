/**
 * DashboardPage — main financial overview.
 * Composes StatCards, MonthlyBarChart, budget progress, and RecentTransactions.
 * Seeded data ensures the dashboard is never blank on first load.
 */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useMemo } from "react";
import { MonthlyBarChart } from "../components/charts/MonthlyBarChart";
import { CategoryBadge } from "../components/common/CategoryBadge";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { PageHeader } from "../components/common/PageHeader";
import { StatCard } from "../components/common/StatCard";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { useBudgets } from "../hooks/useBudgets";
import { useDashboardSummary } from "../hooks/useTransactions";
import { filterActiveChartDays } from "../utils/chartHelpers";
import { formatCurrency } from "../utils/formatters";

export function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: budgets, isLoading: budgetsLoading } = useBudgets();

  /** Filter to days with activity so the chart isn't flat */
  const chartData = useMemo(
    () => filterActiveChartDays(summary?.monthlyData ?? []),
    [summary],
  );

  /** Show only top 3 budgets in the performance panel */
  const topBudgets = useMemo(() => (budgets ?? []).slice(0, 3), [budgets]);

  const isLoading = summaryLoading || budgetsLoading;

  return (
    <div className="space-y-6" data-ocid="dashboard.page">
      {/* Page header with current date */}
      <PageHeader
        title="Financial Overview"
        subtitle={`Current ${format(new Date(), "MMMM d, yyyy")}`}
      />

      {/* ── KPI Stat Cards ─────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={summary ? formatCurrency(summary.totalBalance) : "$0.00"}
          trend="+2.1%"
          trendDirection="up"
          icon={Wallet}
          iconBg="bg-primary/10"
          iconColor="text-primary"
          isLoading={isLoading}
          ocid="dashboard.total_balance.card"
        />
        <StatCard
          title="Monthly Income"
          value={summary ? formatCurrency(summary.monthlyIncome) : "$0.00"}
          trend="This month"
          trendDirection="up"
          icon={TrendingUp}
          iconBg="bg-income"
          iconColor="text-income"
          isLoading={isLoading}
          ocid="dashboard.monthly_income.card"
        />
        <StatCard
          title="Monthly Expenses"
          value={summary ? formatCurrency(summary.monthlyExpenses) : "$0.00"}
          trend="This month"
          trendDirection="down"
          icon={TrendingDown}
          iconBg="bg-expense"
          iconColor="text-expense"
          isLoading={isLoading}
          ocid="dashboard.monthly_expenses.card"
        />
        <StatCard
          title="Savings Rate"
          value={summary ? `${summary.savingsRate}%` : "0%"}
          trend={
            summary && summary.savingsRate > 0
              ? `${summary.savingsRate}% saved`
              : undefined
          }
          trendDirection="up"
          icon={PiggyBank}
          iconBg="bg-accent/10"
          iconColor="text-accent"
          isLoading={isLoading}
          ocid="dashboard.savings_rate.card"
        />
      </div>

      {/* ── Cash Flow Chart + Budget Performance ───────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cash flow bar chart */}
        <div
          className="lg:col-span-2 rounded-lg bg-card border border-border p-5 shadow-card"
          data-ocid="dashboard.cashflow.card"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">
            Cash Flow: Income vs. Expenses (This Month)
          </h3>

          {summaryLoading ? (
            <LoadingSpinner
              size="md"
              label="Loading chart…"
              className="h-[220px]"
            />
          ) : (
            <MonthlyBarChart data={chartData} height={220} />
          )}
        </div>

        {/* Budget performance panel */}
        <div
          className="rounded-lg bg-card border border-border p-5 shadow-card"
          data-ocid="dashboard.budget_performance.card"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">
            Budget Performance
          </h3>

          {budgetsLoading ? (
            <LoadingSpinner size="md" label="Loading…" className="py-8" />
          ) : topBudgets.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                🎯
              </span>
              <p className="text-sm text-muted-foreground">
                No budgets set yet.
              </p>
              <Link to="/app/budget">
                <Button
                  size="sm"
                  variant="outline"
                  data-ocid="dashboard.set_budget.button"
                >
                  Set a Budget
                </Button>
              </Link>
            </div>
          ) : (
            /* Budget progress bars */
            <div className="space-y-4">
              {topBudgets.map((budget, i) => {
                const pct = budget.percentage;
                const barColor =
                  pct >= 100
                    ? "bg-expense"
                    : pct >= 80
                      ? "bg-accent"
                      : "bg-income";
                const textColor =
                  pct >= 100
                    ? "text-expense"
                    : pct >= 80
                      ? "text-accent"
                      : "text-income";

                return (
                  <div
                    key={budget.id}
                    data-ocid={`dashboard.budget.item.${i + 1}`}
                  >
                    {/* Label row */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <CategoryBadge category={budget.category} />
                      </div>
                      <span
                        className={cn(
                          "text-xs font-semibold ml-2 shrink-0",
                          textColor,
                        )}
                      >
                        {pct}% spent
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-smooth",
                          barColor,
                        )}
                        style={{ width: `${Math.min(100, pct)}%` }}
                        aria-label={`${budget.category}: ${pct}% of budget spent`}
                      />
                    </div>

                    {/* Spent / budget amounts */}
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>{formatCurrency(budget.spent)} spent</span>
                      <span>{formatCurrency(budget.amount)} limit</span>
                    </div>
                  </div>
                );
              })}

              <Link
                to="/app/budget"
                className="block pt-1"
                data-ocid="dashboard.view_all_budgets.link"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-primary text-xs"
                >
                  View all budgets →
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── Recent Transactions ─────────────────────────────────────────── */}
      <RecentTransactions
        transactions={summary?.recentTransactions ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
