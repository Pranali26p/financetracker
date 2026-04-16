import { c as createLucideIcon, k as create, l as useQueryClient, m as ue } from "./index-CS2BT5n9.js";
import { p as parseISO, u as useQuery, a as useMutation } from "./PageHeader-Drc5o7X6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
const BUDGETS_KEY = "finly-budgets";
const TRANSACTIONS_KEY = "finly-transactions";
let nextId = 100;
function loadBudgets() {
  try {
    const raw = localStorage.getItem(BUDGETS_KEY);
    const data = raw ? JSON.parse(raw) : [];
    if (data.length > 0) {
      nextId = Math.max(...data.map((b) => b.id)) + 1;
    }
    return data;
  } catch {
    return [];
  }
}
function loadTransactions() {
  try {
    const raw = localStorage.getItem(TRANSACTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveBudgets(budgets) {
  localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
}
function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function calcSpent(category, month, year) {
  return loadTransactions().filter((t) => {
    const d = parseISO(t.date);
    return t.type === "expense" && t.category === category && d.getMonth() + 1 === month && d.getFullYear() === year;
  }).reduce((sum, t) => sum + t.amount, 0);
}
function enrichBudget(budget) {
  const spent = calcSpent(budget.category, budget.month, budget.year);
  const remaining = Math.max(0, budget.amount - spent);
  const percentage = budget.amount > 0 ? Math.min(100, Math.round(spent / budget.amount * 100)) : 0;
  return { ...budget, spent, remaining, percentage };
}
function seedDefaultBudgets() {
  const existing = loadBudgets();
  if (existing.length > 0) return;
  const now = /* @__PURE__ */ new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const defaults = [
    { category: "groceries", amount: 500, month, year },
    { category: "dining", amount: 300, month, year },
    { category: "transport", amount: 150, month, year },
    { category: "entertainment", amount: 100, month, year },
    { category: "shopping", amount: 200, month, year },
    { category: "housing", amount: 2e3, month, year },
    { category: "subscription", amount: 100, month, year },
    { category: "fitness", amount: 80, month, year }
  ];
  const budgets = defaults.map((b, i) => ({
    ...b,
    id: i + 100,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }));
  nextId = budgets.length + 100;
  saveBudgets(budgets);
}
const budgetService = {
  seed: seedDefaultBudgets,
  /** Get all budgets with computed spending data. */
  async getAll() {
    await delay();
    return loadBudgets().map(enrichBudget);
  },
  /** Get budgets for a specific month/year. */
  async getByMonth(month, year) {
    await delay();
    return loadBudgets().filter((b) => b.month === month && b.year === year).map(enrichBudget);
  },
  /** Set (create or update) a budget for a category/month. */
  async set(input) {
    await delay(400);
    const all = loadBudgets();
    const existing = all.findIndex(
      (b) => b.category === input.category && b.month === input.month && b.year === input.year
    );
    let budget;
    if (existing !== -1) {
      budget = { ...all[existing], amount: input.amount };
      all[existing] = budget;
    } else {
      budget = {
        id: nextId++,
        ...input,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      all.push(budget);
    }
    saveBudgets(all);
    return enrichBudget(budget);
  },
  /** Delete a budget by ID. */
  async delete(id) {
    await delay(300);
    const all = loadBudgets();
    const filtered = all.filter((b) => b.id !== id);
    if (filtered.length === all.length) return false;
    saveBudgets(filtered);
    return true;
  }
};
const useBudgetStore = create((set) => ({
  budgets: [],
  isLoading: false,
  error: null,
  setBudgets: (budgets) => set({ budgets, isLoading: false, error: null }),
  addBudget: (budget) => set((state) => ({
    budgets: [...state.budgets, budget]
  })),
  updateBudget: (updated) => set((state) => ({
    budgets: state.budgets.map((b) => b.id === updated.id ? updated : b)
  })),
  removeBudget: (id) => set((state) => ({
    budgets: state.budgets.filter((b) => b.id !== id)
  })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false })
}));
const BUDGET_KEYS = {
  all: ["budgets"]
};
function useBudgets() {
  const { setBudgets } = useBudgetStore();
  return useQuery({
    queryKey: BUDGET_KEYS.all,
    queryFn: async () => {
      budgetService.seed();
      const data = await budgetService.getAll();
      setBudgets(data);
      return data;
    },
    staleTime: 3e4
  });
}
function useSetBudget() {
  const qc = useQueryClient();
  const { addBudget, updateBudget, budgets } = useBudgetStore();
  return useMutation({
    mutationFn: (input) => budgetService.set(input),
    onSuccess: (budget) => {
      const existing = budgets.find((b) => b.id === budget.id);
      if (existing) {
        updateBudget(budget);
      } else {
        addBudget(budget);
      }
      qc.invalidateQueries({ queryKey: BUDGET_KEYS.all });
      ue.success(`Budget for ${budget.category} saved.`);
    },
    onError: () => {
      ue.error("Failed to save budget.");
    }
  });
}
function useDeleteBudget() {
  const qc = useQueryClient();
  const { removeBudget } = useBudgetStore();
  return useMutation({
    mutationFn: (id) => budgetService.delete(id),
    onSuccess: (_, id) => {
      removeBudget(id);
      qc.invalidateQueries({ queryKey: BUDGET_KEYS.all });
      ue.success("Budget removed.");
    },
    onError: () => {
      ue.error("Failed to remove budget.");
    }
  });
}
export {
  TrendingDown as T,
  Wallet as W,
  useSetBudget as a,
  useDeleteBudget as b,
  useBudgets as u
};
