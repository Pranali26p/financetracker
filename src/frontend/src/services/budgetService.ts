import { parseISO } from "date-fns";
/**
 * Budget service — localStorage-backed mock CRUD.
 * Computes spending vs budget limits from stored transactions.
 */
import type {
  Budget,
  BudgetWithSpending,
  Category,
  SetBudgetInput,
} from "../types";

const BUDGETS_KEY = "finly-budgets";
const TRANSACTIONS_KEY = "finly-transactions";
let nextId = 100;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadBudgets(): Budget[] {
  try {
    const raw = localStorage.getItem(BUDGETS_KEY);
    const data = raw ? (JSON.parse(raw) as Budget[]) : [];
    if (data.length > 0) {
      nextId = Math.max(...data.map((b) => b.id)) + 1;
    }
    return data;
  } catch {
    return [];
  }
}

interface StoredTransaction {
  id: number;
  type: string;
  category: Category;
  amount: number;
  date: string;
}

function loadTransactions(): StoredTransaction[] {
  try {
    const raw = localStorage.getItem(TRANSACTIONS_KEY);
    return raw ? (JSON.parse(raw) as StoredTransaction[]) : [];
  } catch {
    return [];
  }
}

function saveBudgets(budgets: Budget[]): void {
  localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
}

function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Calculate spending for a category in a given month/year. */
function calcSpent(category: Category, month: number, year: number): number {
  return loadTransactions()
    .filter((t) => {
      const d = parseISO(t.date);
      return (
        t.type === "expense" &&
        t.category === category &&
        d.getMonth() + 1 === month &&
        d.getFullYear() === year
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

function enrichBudget(budget: Budget): BudgetWithSpending {
  const spent = calcSpent(budget.category, budget.month, budget.year);
  const remaining = Math.max(0, budget.amount - spent);
  const percentage =
    budget.amount > 0
      ? Math.min(100, Math.round((spent / budget.amount) * 100))
      : 0;
  return { ...budget, spent, remaining, percentage };
}

/** Seed default budgets on first launch. */
function seedDefaultBudgets(): void {
  const existing = loadBudgets();
  if (existing.length > 0) return;

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const defaults: Omit<Budget, "id" | "createdAt">[] = [
    { category: "groceries", amount: 500, month, year },
    { category: "dining", amount: 300, month, year },
    { category: "transport", amount: 150, month, year },
    { category: "entertainment", amount: 100, month, year },
    { category: "shopping", amount: 200, month, year },
    { category: "housing", amount: 2000, month, year },
    { category: "subscription", amount: 100, month, year },
    { category: "fitness", amount: 80, month, year },
  ];

  const budgets: Budget[] = defaults.map((b, i) => ({
    ...b,
    id: i + 100,
    createdAt: new Date().toISOString(),
  }));

  nextId = budgets.length + 100;
  saveBudgets(budgets);
}

// ─── Service API ──────────────────────────────────────────────────────────────

export const budgetService = {
  seed: seedDefaultBudgets,

  /** Get all budgets with computed spending data. */
  async getAll(): Promise<BudgetWithSpending[]> {
    await delay();
    return loadBudgets().map(enrichBudget);
  },

  /** Get budgets for a specific month/year. */
  async getByMonth(month: number, year: number): Promise<BudgetWithSpending[]> {
    await delay();
    return loadBudgets()
      .filter((b) => b.month === month && b.year === year)
      .map(enrichBudget);
  },

  /** Set (create or update) a budget for a category/month. */
  async set(input: SetBudgetInput): Promise<BudgetWithSpending> {
    await delay(400);
    const all = loadBudgets();
    const existing = all.findIndex(
      (b) =>
        b.category === input.category &&
        b.month === input.month &&
        b.year === input.year,
    );

    let budget: Budget;
    if (existing !== -1) {
      budget = { ...all[existing], amount: input.amount };
      all[existing] = budget;
    } else {
      budget = {
        id: nextId++,
        ...input,
        createdAt: new Date().toISOString(),
      };
      all.push(budget);
    }

    saveBudgets(all);
    return enrichBudget(budget);
  },

  /** Delete a budget by ID. */
  async delete(id: number): Promise<boolean> {
    await delay(300);
    const all = loadBudgets();
    const filtered = all.filter((b) => b.id !== id);
    if (filtered.length === all.length) return false;
    saveBudgets(filtered);
    return true;
  },
};
