/**
 * RecentTransactions — displays the last N transactions in a styled table.
 * Used on the dashboard. Accepts transactions directly to stay data-agnostic.
 */
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Transaction } from "../../types";
import { formatCurrency, formatShortDate } from "../../utils/formatters";
import { CategoryBadge } from "../common/CategoryBadge";

interface RecentTransactionsProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

/** Table row skeleton for loading state */
function RowSkeleton({ index }: { index: number }) {
  return (
    <tr data-ocid={`dashboard.transaction.loading.${index}`}>
      <td className="py-3 pl-5 pr-4">
        <Skeleton className="h-4 w-14" />
      </td>
      <td className="py-3 pr-4">
        <Skeleton className="h-4 w-40" />
      </td>
      <td className="py-3 pr-4">
        <Skeleton className="h-5 w-20 rounded-full" />
      </td>
      <td className="py-3 pr-5 text-right">
        <Skeleton className="h-4 w-16 ml-auto" />
      </td>
    </tr>
  );
}

export function RecentTransactions({
  transactions,
  isLoading = false,
}: RecentTransactionsProps) {
  return (
    <div
      className="rounded-lg bg-card border border-border shadow-card overflow-hidden"
      data-ocid="dashboard.recent_transactions.card"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-display font-semibold text-foreground">
          Recent Transactions
        </h3>
        <Link to="/app/transactions" tabIndex={-1}>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-primary hover:text-primary"
            data-ocid="dashboard.view_all_transactions.link"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="py-2.5 pl-5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date
              </th>
              <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </th>
              <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </th>
              <th className="py-2.5 pr-5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              /* Loading skeleton rows */
              Array.from({ length: 5 }, (_, i) => (
                <RowSkeleton key={`skeleton-${i + 1}`} index={i + 1} />
              ))
            ) : transactions.length === 0 ? (
              /* Empty state */
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-sm text-muted-foreground"
                  data-ocid="dashboard.recent_transactions.empty_state"
                >
                  No transactions yet.{" "}
                  <Link
                    to="/app/transactions"
                    className="text-primary hover:underline font-medium"
                  >
                    Add your first one.
                  </Link>
                </td>
              </tr>
            ) : (
              /* Transaction rows */
              transactions.map((tx, i) => (
                <tr
                  key={tx.id}
                  className="hover:bg-muted/40 transition-fast"
                  data-ocid={`dashboard.transaction.item.${i + 1}`}
                >
                  {/* Date */}
                  <td className="py-3 pl-5 pr-4 text-sm text-muted-foreground whitespace-nowrap">
                    {formatShortDate(tx.date)}
                  </td>

                  {/* Description */}
                  <td className="py-3 pr-4 text-sm font-medium text-foreground max-w-[200px]">
                    <span className="block truncate" title={tx.description}>
                      {tx.description}
                    </span>
                  </td>

                  {/* Category badge */}
                  <td className="py-3 pr-4">
                    <CategoryBadge category={tx.category} />
                  </td>

                  {/* Amount — green for income, red for expense */}
                  <td
                    className={cn(
                      "py-3 pr-5 text-right text-sm font-semibold tabular-nums",
                      tx.type === "income" ? "text-income" : "text-expense",
                    )}
                  >
                    {tx.type === "income" ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
