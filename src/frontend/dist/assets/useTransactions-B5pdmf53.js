import { t as toDate, j as jsxRuntimeExports, b as cn, f as format, k as create, l as useQueryClient, m as ue } from "./index-CS2BT5n9.js";
import { C as CATEGORY_META, p as parseISO, u as useQuery, a as useMutation } from "./PageHeader-Drc5o7X6.js";
function isWithinInterval(date, interval) {
  const time = +toDate(date);
  const [startTime, endTime] = [
    +toDate(interval.start),
    +toDate(interval.end)
  ].sort((a, b) => a - b);
  return time >= startTime && time <= endTime;
}
function CategoryBadge({
  category,
  variant = "default",
  className
}) {
  const meta = CATEGORY_META[category];
  if (variant === "icon-only") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-lg text-base",
          meta.bgColor,
          className
        ),
        title: meta.label,
        "aria-label": meta.label,
        children: meta.icon
      }
    );
  }
  if (variant === "label-only") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("text-sm font-medium", meta.color, className), children: [
      meta.icon,
      " ",
      meta.label
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        meta.bgColor,
        meta.color,
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: meta.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: meta.label })
      ]
    }
  );
}
const STORAGE_KEY = "finly-transactions";
let nextId = 1;
function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];
    if (data.length > 0) {
      nextId = Math.max(...data.map((t) => t.id)) + 1;
    }
    return data;
  } catch {
    return [];
  }
}
function saveAll(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}
function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function seedSampleData() {
  const existing = loadAll();
  if (existing.length > 0) return;
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const pad = (n) => String(n).padStart(2, "0");
  const d = (day, m = month) => `${year}-${pad(m)}-${pad(day)}`;
  const samples = [
    {
      type: "income",
      category: "salary",
      amount: 5800,
      description: "Paycheck — Acme Corp",
      date: d(1)
    },
    {
      type: "income",
      category: "freelance",
      amount: 1200,
      description: "Design project — StartupXY",
      date: d(5)
    },
    {
      type: "expense",
      category: "housing",
      amount: 1800,
      description: "Rent — June",
      date: d(1)
    },
    {
      type: "expense",
      category: "groceries",
      amount: 185.2,
      description: "Whole Foods Market",
      date: d(3)
    },
    {
      type: "expense",
      category: "dining",
      amount: 52.99,
      description: "Starbucks Coffee",
      date: d(4)
    },
    {
      type: "expense",
      category: "utilities",
      amount: 112.5,
      description: "Electric & Gas Bill",
      date: d(6)
    },
    {
      type: "expense",
      category: "subscription",
      amount: 54.97,
      description: "Adobe Creative Cloud",
      date: d(8)
    },
    {
      type: "expense",
      category: "transport",
      amount: 45,
      description: "Monthly Metro Pass",
      date: d(2)
    },
    {
      type: "income",
      category: "investment",
      amount: 340,
      description: "Dividend — VTSAX",
      date: d(10)
    },
    {
      type: "expense",
      category: "healthcare",
      amount: 30,
      description: "Pharmacy — CVS",
      date: d(11)
    },
    {
      type: "expense",
      category: "entertainment",
      amount: 18.99,
      description: "Netflix Subscription",
      date: d(12)
    },
    {
      type: "expense",
      category: "shopping",
      amount: 89.95,
      description: "Amazon Order",
      date: d(14)
    },
    {
      type: "expense",
      category: "fitness",
      amount: 55,
      description: "Gym Membership",
      date: d(15)
    },
    {
      type: "expense",
      category: "dining",
      amount: 74.5,
      description: "Team Lunch",
      date: d(16)
    },
    {
      type: "expense",
      category: "groceries",
      amount: 203.4,
      description: "Trader Joe's",
      date: d(18)
    },
    {
      type: "income",
      category: "salary",
      amount: 5800,
      description: "Paycheck — Acme Corp (2nd)",
      date: d(15)
    },
    {
      type: "expense",
      category: "travel",
      amount: 312,
      description: "Flight to NYC",
      date: d(20)
    },
    {
      type: "expense",
      category: "education",
      amount: 29.99,
      description: "Udemy Course",
      date: d(21)
    }
  ];
  const transactions = samples.map((s, i) => ({
    ...s,
    id: i + 1,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  }));
  nextId = transactions.length + 1;
  saveAll(transactions);
}
const transactionService = {
  /** Seed sample data on first load. */
  seed: seedSampleData,
  /** Get all transactions, newest first. */
  async getAll() {
    await delay();
    return loadAll().sort((a, b) => b.date.localeCompare(a.date));
  },
  /** Create a new transaction. */
  async create(input) {
    await delay(400);
    const all = loadAll();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const tx = {
      ...input,
      id: nextId++,
      createdAt: now,
      updatedAt: now
    };
    saveAll([tx, ...all]);
    return tx;
  },
  /** Update an existing transaction. Returns null if not found. */
  async update(input) {
    await delay(400);
    const all = loadAll();
    const idx = all.findIndex((t) => t.id === input.id);
    if (idx === -1) return null;
    const updated = {
      ...all[idx],
      ...input,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    all[idx] = updated;
    saveAll(all);
    return updated;
  },
  /** Delete a transaction by ID. Returns true if deleted. */
  async delete(id) {
    await delay(300);
    const all = loadAll();
    const filtered = all.filter((t) => t.id !== id);
    if (filtered.length === all.length) return false;
    saveAll(filtered);
    return true;
  },
  /** Get transactions for a specific month/year. */
  async getByMonth(month, year) {
    await delay();
    return loadAll().filter((t) => {
      const d = parseISO(t.date);
      return d.getMonth() + 1 === month && d.getFullYear() === year;
    });
  },
  /** Get transactions by category. */
  async getByCategory(category) {
    await delay();
    return loadAll().filter((t) => t.category === category);
  },
  /** Apply filters to transaction list. */
  applyFilters(transactions, filters) {
    return transactions.filter((t) => {
      if (filters.type && filters.type !== "all" && t.type !== filters.type)
        return false;
      if (filters.category && filters.category !== "all" && t.category !== filters.category)
        return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!t.description.toLowerCase().includes(q) && !t.category.includes(q))
          return false;
      }
      if (filters.dateFrom && filters.dateTo) {
        try {
          const inRange = isWithinInterval(parseISO(t.date), {
            start: parseISO(filters.dateFrom),
            end: parseISO(filters.dateTo)
          });
          if (!inRange) return false;
        } catch {
        }
      }
      return true;
    });
  },
  /** Compute dashboard summary from current month's transactions. */
  async getDashboardSummary() {
    await delay(200);
    const now = /* @__PURE__ */ new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const allTx = loadAll();
    const monthly = allTx.filter((t) => {
      const d = parseISO(t.date);
      return d.getMonth() + 1 === month && d.getFullYear() === year;
    });
    const monthlyIncome = monthly.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const monthlyExpenses = monthly.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const totalBalance = allTx.reduce(
      (s, t) => s + (t.type === "income" ? t.amount : -t.amount),
      0
    );
    const savingsRate = monthlyIncome > 0 ? Math.round((monthlyIncome - monthlyExpenses) / monthlyIncome * 100) : 0;
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthlyData = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dayStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayTx = monthly.filter((t) => t.date === dayStr);
      return {
        month: format(new Date(year, month - 1, day), "d"),
        day,
        income: dayTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
        expenses: dayTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0)
      };
    });
    const recentTransactions = allTx.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      savingsRate,
      recentTransactions,
      monthlyData,
      budgetPerformance: []
    };
  }
};
const DEFAULT_FILTERS = {
  type: "all",
  category: "all",
  dateFrom: void 0,
  dateTo: void 0,
  search: ""
};
const useTransactionStore = create((set) => ({
  transactions: [],
  isLoading: false,
  error: null,
  filters: DEFAULT_FILTERS,
  setTransactions: (transactions) => set({ transactions, isLoading: false, error: null }),
  addTransaction: (transaction) => set((state) => ({
    transactions: [transaction, ...state.transactions]
  })),
  updateTransaction: (updated) => set((state) => ({
    transactions: state.transactions.map(
      (t) => t.id === updated.id ? updated : t
    )
  })),
  removeTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter((t) => t.id !== id)
  })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  clearFilters: () => set({ filters: DEFAULT_FILTERS })
}));
const TRANSACTION_KEYS = {
  all: ["transactions"],
  dashboard: ["dashboard"]
};
function useTransactions() {
  const { setTransactions } = useTransactionStore();
  return useQuery({
    queryKey: TRANSACTION_KEYS.all,
    queryFn: async () => {
      transactionService.seed();
      const data = await transactionService.getAll();
      setTransactions(data);
      return data;
    },
    staleTime: 3e4
  });
}
function useDashboardSummary() {
  return useQuery({
    queryKey: TRANSACTION_KEYS.dashboard,
    queryFn: () => transactionService.getDashboardSummary(),
    staleTime: 3e4
  });
}
function useCreateTransaction() {
  const qc = useQueryClient();
  const { addTransaction } = useTransactionStore();
  return useMutation({
    mutationFn: (input) => transactionService.create(input),
    onSuccess: (tx) => {
      addTransaction(tx);
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.all });
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.dashboard });
      ue.success("Transaction added successfully.");
    },
    onError: () => {
      ue.error("Failed to add transaction. Please try again.");
    }
  });
}
function useUpdateTransaction() {
  const qc = useQueryClient();
  const { updateTransaction } = useTransactionStore();
  return useMutation({
    mutationFn: (input) => transactionService.update(input),
    onSuccess: (tx) => {
      if (tx) updateTransaction(tx);
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.all });
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.dashboard });
      ue.success("Transaction updated.");
    },
    onError: () => {
      ue.error("Failed to update transaction.");
    }
  });
}
function useDeleteTransaction() {
  const qc = useQueryClient();
  const { removeTransaction } = useTransactionStore();
  return useMutation({
    mutationFn: (id) => transactionService.delete(id),
    onSuccess: (_, id) => {
      removeTransaction(id);
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.all });
      qc.invalidateQueries({ queryKey: TRANSACTION_KEYS.dashboard });
      ue.success("Transaction deleted.");
    },
    onError: () => {
      ue.error("Failed to delete transaction.");
    }
  });
}
export {
  CategoryBadge as C,
  useCreateTransaction as a,
  useUpdateTransaction as b,
  useTransactions as c,
  useTransactionStore as d,
  useDeleteTransaction as e,
  transactionService as t,
  useDashboardSummary as u
};
