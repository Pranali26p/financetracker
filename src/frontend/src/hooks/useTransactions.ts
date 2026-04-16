/**
 * useTransactions — React Query hooks for transaction CRUD.
 * Wraps transactionService calls with caching, invalidation, and Zustand sync.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { transactionService } from "../services/transactionService";
import { useTransactionStore } from "../stores/useTransactionStore";
import type { CreateTransactionInput, UpdateTransactionInput } from "../types";

export const TRANSACTION_KEYS = {
  all: ["transactions"] as const,
  monthly: (month: number, year: number) =>
    ["transactions", "monthly", month, year] as const,
  dashboard: ["dashboard"] as const,
};

/** Fetch all transactions and sync to Zustand store. */
export function useTransactions() {
  const { setTransactions } = useTransactionStore();

  return useQuery({
    queryKey: TRANSACTION_KEYS.all,
    queryFn: async () => {
      transactionService.seed();
      const data = await transactionService.getAll();
      setTransactions(data);
      return data;
    },
    staleTime: 30_000,
  });
}

/** Fetch monthly transactions. */
export function useMonthlyTransactions(month: number, year: number) {
  return useQuery({
    queryKey: TRANSACTION_KEYS.monthly(month, year),
    queryFn: () => transactionService.getByMonth(month, year),
    staleTime: 30_000,
  });
}

/** Fetch dashboard summary. */
export function useDashboardSummary() {
  return useQuery({
    queryKey: TRANSACTION_KEYS.dashboard,
    queryFn: () => transactionService.getDashboardSummary(),
    staleTime: 30_000,
  });
}

/** Create transaction mutation. */
export function useCreateTransaction() {
  const qc = useQueryClient();
  const { addTransaction } = useTransactionStore();

  return useMutation({
    mutationFn: (input: CreateTransactionInput) =>
      transactionService.create(input),
    onSuccess: (tx) => {
      addTransaction(tx);
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.all });
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.dashboard });
      toast.success("Transaction added successfully.");
    },
    onError: () => {
      toast.error("Failed to add transaction. Please try again.");
    },
  });
}

/** Update transaction mutation. */
export function useUpdateTransaction() {
  const qc = useQueryClient();
  const { updateTransaction } = useTransactionStore();

  return useMutation({
    mutationFn: (input: UpdateTransactionInput) =>
      transactionService.update(input),
    onSuccess: (tx) => {
      if (tx) updateTransaction(tx);
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.all });
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.dashboard });
      toast.success("Transaction updated.");
    },
    onError: () => {
      toast.error("Failed to update transaction.");
    },
  });
}

/** Delete transaction mutation. */
export function useDeleteTransaction() {
  const qc = useQueryClient();
  const { removeTransaction } = useTransactionStore();

  return useMutation({
    mutationFn: (id: number) => transactionService.delete(id),
    onSuccess: (_, id) => {
      removeTransaction(id);
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.all });
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.dashboard });
      toast.success("Transaction deleted.");
    },
    onError: () => {
      toast.error("Failed to delete transaction.");
    },
  });
}
