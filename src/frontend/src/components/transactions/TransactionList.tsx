import type { Transaction, TransactionFilters } from "../../types";
/**
 * TransactionList — renders the transaction data table with sticky headers.
 * Handles loading state, empty state, and maps rows to TransactionRow.
 */
import { EmptyState } from "../common/EmptyState";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { TransactionRow } from "./TransactionRow";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  filters: TransactionFilters;
  onEdit: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
  onAddNew: () => void;
}

export function TransactionList({
  transactions,
  isLoading,
  filters,
  onEdit,
  onDelete,
  onAddNew,
}: TransactionListProps) {
  // Check if any filter is active for contextual empty state messaging
  const hasActiveFilters =
    (filters.search && filters.search.length > 0) ||
    filters.type !== "all" ||
    filters.category !== "all" ||
    !!filters.dateFrom ||
    !!filters.dateTo;

  if (isLoading) {
    return (
      <LoadingSpinner
        size="md"
        label="Loading transactions…"
        className="py-16"
        data-ocid="transactions.loading_state"
      />
    );
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        title={
          hasActiveFilters
            ? "No transactions match your filters"
            : "No transactions yet"
        }
        description={
          hasActiveFilters
            ? "Try adjusting or clearing your filters to see more results."
            : "Add your first transaction to start tracking your finances."
        }
        actionLabel={hasActiveFilters ? undefined : "Add Transaction"}
        onAction={hasActiveFilters ? undefined : onAddNew}
        ocid="transactions"
        className="m-4 border-dashed"
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="py-3 pl-5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Date
            </th>
            <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </th>
            <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Category
            </th>
            <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
              Type
            </th>
            <th className="py-3 pr-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Amount
            </th>
            <th className="py-3 pr-5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <TransactionRow
              key={tx.id}
              transaction={tx}
              index={i + 1}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
