/**
 * useBudgets — React Query hooks for budget management.
 * Syncs with Zustand store and invalidates on mutations.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { budgetService } from "../services/budgetService";
import { useBudgetStore } from "../stores/useBudgetStore";
import type { SetBudgetInput } from "../types";

export const BUDGET_KEYS = {
  all: ["budgets"] as const,
  monthly: (month: number, year: number) =>
    ["budgets", "monthly", month, year] as const,
};

/** Fetch all budgets with spending data. */
export function useBudgets() {
  const { setBudgets } = useBudgetStore();

  return useQuery({
    queryKey: BUDGET_KEYS.all,
    queryFn: async () => {
      budgetService.seed();
      const data = await budgetService.getAll();
      setBudgets(data);
      return data;
    },
    staleTime: 30_000,
  });
}

/** Fetch budgets for a specific month/year. */
export function useMonthlyBudgets(month: number, year: number) {
  return useQuery({
    queryKey: BUDGET_KEYS.monthly(month, year),
    queryFn: () => budgetService.getByMonth(month, year),
    staleTime: 30_000,
  });
}

/** Set (upsert) a budget. */
export function useSetBudget() {
  const qc = useQueryClient();
  const { addBudget, updateBudget, budgets } = useBudgetStore();

  return useMutation({
    mutationFn: (input: SetBudgetInput) => budgetService.set(input),
    onSuccess: (budget) => {
      const existing = budgets.find((b) => b.id === budget.id);
      if (existing) {
        updateBudget(budget);
      } else {
        addBudget(budget);
      }
      qc.invalidateQueries({ queryKey: BUDGET_KEYS.all });
      toast.success(`Budget for ${budget.category} saved.`);
    },
    onError: () => {
      toast.error("Failed to save budget.");
    },
  });
}

/** Delete a budget. */
export function useDeleteBudget() {
  const qc = useQueryClient();
  const { removeBudget } = useBudgetStore();

  return useMutation({
    mutationFn: (id: number) => budgetService.delete(id),
    onSuccess: (_, id) => {
      removeBudget(id);
      qc.invalidateQueries({ queryKey: BUDGET_KEYS.all });
      toast.success("Budget removed.");
    },
    onError: () => {
      toast.error("Failed to remove budget.");
    },
  });
}
