/**
 * Zustand store for budget state.
 * Manages budgets with spending calculations.
 */
import { create } from "zustand";
import type { BudgetWithSpending } from "../types";

interface BudgetStore {
  budgets: BudgetWithSpending[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setBudgets: (budgets: BudgetWithSpending[]) => void;
  addBudget: (budget: BudgetWithSpending) => void;
  updateBudget: (updated: BudgetWithSpending) => void;
  removeBudget: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
  budgets: [],
  isLoading: false,
  error: null,

  setBudgets: (budgets) => set({ budgets, isLoading: false, error: null }),

  addBudget: (budget) =>
    set((state) => ({
      budgets: [...state.budgets, budget],
    })),

  updateBudget: (updated) =>
    set((state) => ({
      budgets: state.budgets.map((b) => (b.id === updated.id ? updated : b)),
    })),

  removeBudget: (id) =>
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error, isLoading: false }),
}));
