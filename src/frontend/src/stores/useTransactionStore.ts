/**
 * Zustand store for transactions state.
 * Manages the full CRUD state, loading/error flags, and filters.
 */
import { create } from "zustand";
import type { Transaction, TransactionFilters } from "../types";

interface TransactionStore {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  filters: TransactionFilters;

  // Actions
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (updated: Transaction) => void;
  removeTransaction: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<TransactionFilters>) => void;
  clearFilters: () => void;
}

const DEFAULT_FILTERS: TransactionFilters = {
  type: "all",
  category: "all",
  dateFrom: undefined,
  dateTo: undefined,
  search: "",
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  isLoading: false,
  error: null,
  filters: DEFAULT_FILTERS,

  setTransactions: (transactions) =>
    set({ transactions, isLoading: false, error: null }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  updateTransaction: (updated) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === updated.id ? updated : t,
      ),
    })),

  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error, isLoading: false }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  clearFilters: () => set({ filters: DEFAULT_FILTERS }),
}));
