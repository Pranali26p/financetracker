/**
 * TransactionsPage — full CRUD for income/expense transactions.
 * Orchestrates TransactionList, TransactionFiltersBar, TransactionModal, ConfirmDialog.
 * Filtering logic delegates to transactionService.applyFilters.
 */
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { PageHeader } from "../components/common/PageHeader";
import { TransactionFiltersBar } from "../components/transactions/TransactionFilters";
import { TransactionList } from "../components/transactions/TransactionList";
import { TransactionModal } from "../components/transactions/TransactionModal";
import {
  useDeleteTransaction,
  useTransactions,
} from "../hooks/useTransactions";
import { transactionService } from "../services/transactionService";
import { useTransactionStore } from "../stores/useTransactionStore";
import type { Transaction } from "../types";

/** Format USD currency for the summary footer. */
function formatCurrency(v: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(v);
}

export function TransactionsPage() {
  const { data: allTransactions = [], isLoading } = useTransactions();
  const { filters, setFilters, clearFilters } = useTransactionStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | undefined>();
  const [deleteTx, setDeleteTx] = useState<Transaction | undefined>();

  const deleteMutation = useDeleteTransaction();

  // Apply all active filters client-side
  const filtered = useMemo(
    () => transactionService.applyFilters(allTransactions, filters),
    [allTransactions, filters],
  );

  // Derived totals for footer summary
  const totalIncome = useMemo(
    () =>
      filtered
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + t.amount, 0),
    [filtered],
  );
  const totalExpenses = useMemo(
    () =>
      filtered
        .filter((t) => t.type === "expense")
        .reduce((s, t) => s + t.amount, 0),
    [filtered],
  );
  const netBalance = totalIncome - totalExpenses;

  const handleOpenAdd = () => {
    setEditTx(undefined);
    setModalOpen(true);
  };

  const handleEdit = (tx: Transaction) => {
    setEditTx(tx);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditTx(undefined);
  };

  const handleDeleteRequest = (tx: Transaction) => {
    setDeleteTx(tx);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTx) return;
    await deleteMutation.mutateAsync(deleteTx.id);
    setDeleteTx(undefined);
  };

  return (
    <div className="space-y-6" data-ocid="transactions.page">
      {/* Page header with Add Transaction CTA */}
      <PageHeader
        title="Transactions"
        subtitle="Track all your income and expense transactions"
        actions={
          <Button onClick={handleOpenAdd} data-ocid="transactions.add_button">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        }
      />

      {/* Filter bar */}
      <TransactionFiltersBar
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
      />

      {/* Transaction table card */}
      <div className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
        <TransactionList
          transactions={filtered}
          isLoading={isLoading}
          filters={filters}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
          onAddNew={handleOpenAdd}
        />
      </div>

      {/* Summary footer — only shown when there are results */}
      {!isLoading && filtered.length > 0 && (
        <div className="flex flex-wrap gap-4 items-center rounded-xl bg-card border border-border px-5 py-3.5 shadow-card text-sm">
          <span className="text-muted-foreground mr-auto">
            {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
          </span>
          <span className="text-income font-semibold">
            Income: {formatCurrency(totalIncome)}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="text-expense font-semibold">
            Expenses: {formatCurrency(totalExpenses)}
          </span>
          <span className="text-muted-foreground">·</span>
          <span
            className={
              netBalance >= 0
                ? "text-income font-semibold"
                : "text-expense font-semibold"
            }
          >
            Net: {netBalance >= 0 ? "+" : ""}
            {formatCurrency(netBalance)}
          </span>
        </div>
      )}

      {/* Add / Edit modal */}
      <TransactionModal
        open={modalOpen}
        onClose={handleCloseModal}
        editTx={editTx}
      />

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={!!deleteTx}
        onOpenChange={(open) => {
          if (!open) setDeleteTx(undefined);
        }}
        title="Delete Transaction"
        description={
          deleteTx
            ? `Are you sure you want to delete "${deleteTx.description}"? This cannot be undone.`
            : undefined
        }
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
        ocid="transactions.delete"
      />
    </div>
  );
}
