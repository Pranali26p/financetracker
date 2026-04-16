import { format, isWithinInterval, parseISO } from "date-fns";
/**
 * Transaction service — localStorage-backed mock CRUD.
 * All methods are async to match real API call signatures.
 * Drop-in replaceable with real ICP actor calls.
 */
import type {
  Category,
  CreateTransactionInput,
  Transaction,
  TransactionFilters,
  UpdateTransactionInput,
} from "../types";

const STORAGE_KEY = "finly-transactions";
let nextId = 1;

// ─── Storage Helpers ──────────────────────────────────────────────────────────

function loadAll(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? (JSON.parse(raw) as Transaction[]) : [];
    // Track next ID
    if (data.length > 0) {
      nextId = Math.max(...data.map((t) => t.id)) + 1;
    }
    return data;
  } catch {
    return [];
  }
}

function saveAll(transactions: Transaction[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Seed realistic sample transactions on first launch. */
function seedSampleData(): void {
  const existing = loadAll();
  if (existing.length > 0) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const pad = (n: number) => String(n).padStart(2, "0");
  const d = (day: number, m = month) => `${year}-${pad(m)}-${pad(day)}`;

  const samples: Omit<Transaction, "id" | "createdAt" | "updatedAt">[] = [
    {
      type: "income",
      category: "salary",
      amount: 5800,
      description: "Paycheck — Acme Corp",
      date: d(1),
    },
    {
      type: "income",
      category: "freelance",
      amount: 1200,
      description: "Design project — StartupXY",
      date: d(5),
    },
    {
      type: "expense",
      category: "housing",
      amount: 1800,
      description: "Rent — June",
      date: d(1),
    },
    {
      type: "expense",
      category: "groceries",
      amount: 185.2,
      description: "Whole Foods Market",
      date: d(3),
    },
    {
      type: "expense",
      category: "dining",
      amount: 52.99,
      description: "Starbucks Coffee",
      date: d(4),
    },
    {
      type: "expense",
      category: "utilities",
      amount: 112.5,
      description: "Electric & Gas Bill",
      date: d(6),
    },
    {
      type: "expense",
      category: "subscription",
      amount: 54.97,
      description: "Adobe Creative Cloud",
      date: d(8),
    },
    {
      type: "expense",
      category: "transport",
      amount: 45,
      description: "Monthly Metro Pass",
      date: d(2),
    },
    {
      type: "income",
      category: "investment",
      amount: 340,
      description: "Dividend — VTSAX",
      date: d(10),
    },
    {
      type: "expense",
      category: "healthcare",
      amount: 30,
      description: "Pharmacy — CVS",
      date: d(11),
    },
    {
      type: "expense",
      category: "entertainment",
      amount: 18.99,
      description: "Netflix Subscription",
      date: d(12),
    },
    {
      type: "expense",
      category: "shopping",
      amount: 89.95,
      description: "Amazon Order",
      date: d(14),
    },
    {
      type: "expense",
      category: "fitness",
      amount: 55,
      description: "Gym Membership",
      date: d(15),
    },
    {
      type: "expense",
      category: "dining",
      amount: 74.5,
      description: "Team Lunch",
      date: d(16),
    },
    {
      type: "expense",
      category: "groceries",
      amount: 203.4,
      description: "Trader Joe's",
      date: d(18),
    },
    {
      type: "income",
      category: "salary",
      amount: 5800,
      description: "Paycheck — Acme Corp (2nd)",
      date: d(15),
    },
    {
      type: "expense",
      category: "travel",
      amount: 312,
      description: "Flight to NYC",
      date: d(20),
    },
    {
      type: "expense",
      category: "education",
      amount: 29.99,
      description: "Udemy Course",
      date: d(21),
    },
  ];

  const transactions: Transaction[] = samples.map((s, i) => ({
    ...s,
    id: i + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  nextId = transactions.length + 1;
  saveAll(transactions);
}

// ─── Service API ──────────────────────────────────────────────────────────────

export const transactionService = {
  /** Seed sample data on first load. */
  seed: seedSampleData,

  /** Get all transactions, newest first. */
  async getAll(): Promise<Transaction[]> {
    await delay();
    return loadAll().sort((a, b) => b.date.localeCompare(a.date));
  },

  /** Create a new transaction. */
  async create(input: CreateTransactionInput): Promise<Transaction> {
    await delay(400);
    const all = loadAll();
    const now = new Date().toISOString();
    const tx: Transaction = {
      ...input,
      id: nextId++,
      createdAt: now,
      updatedAt: now,
    };
    saveAll([tx, ...all]);
    return tx;
  },

  /** Update an existing transaction. Returns null if not found. */
  async update(input: UpdateTransactionInput): Promise<Transaction | null> {
    await delay(400);
    const all = loadAll();
    const idx = all.findIndex((t) => t.id === input.id);
    if (idx === -1) return null;

    const updated: Transaction = {
      ...all[idx],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    all[idx] = updated;
    saveAll(all);
    return updated;
  },

  /** Delete a transaction by ID. Returns true if deleted. */
  async delete(id: number): Promise<boolean> {
    await delay(300);
    const all = loadAll();
    const filtered = all.filter((t) => t.id !== id);
    if (filtered.length === all.length) return false;
    saveAll(filtered);
    return true;
  },

  /** Get transactions for a specific month/year. */
  async getByMonth(month: number, year: number): Promise<Transaction[]> {
    await delay();
    return loadAll().filter((t) => {
      const d = parseISO(t.date);
      return d.getMonth() + 1 === month && d.getFullYear() === year;
    });
  },

  /** Get transactions by category. */
  async getByCategory(category: Category): Promise<Transaction[]> {
    await delay();
    return loadAll().filter((t) => t.category === category);
  },

  /** Apply filters to transaction list. */
  applyFilters(
    transactions: Transaction[],
    filters: TransactionFilters,
  ): Transaction[] {
    return transactions.filter((t) => {
      if (filters.type && filters.type !== "all" && t.type !== filters.type)
        return false;
      if (
        filters.category &&
        filters.category !== "all" &&
        t.category !== filters.category
      )
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
            end: parseISO(filters.dateTo),
          });
          if (!inRange) return false;
        } catch {
          // ignore invalid dates
        }
      }
      return true;
    });
  },

  /** Compute dashboard summary from current month's transactions. */
  async getDashboardSummary() {
    await delay(200);
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const allTx = loadAll();

    const monthly = allTx.filter((t) => {
      const d = parseISO(t.date);
      return d.getMonth() + 1 === month && d.getFullYear() === year;
    });

    const monthlyIncome = monthly
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const monthlyExpenses = monthly
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    const totalBalance = allTx.reduce(
      (s, t) => s + (t.type === "income" ? t.amount : -t.amount),
      0,
    );
    const savingsRate =
      monthlyIncome > 0
        ? Math.round(((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100)
        : 0;

    // Daily cash flow for current month
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthlyData = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dayStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayTx = monthly.filter((t) => t.date === dayStr);
      return {
        month: format(new Date(year, month - 1, day), "d"),
        day,
        income: dayTx
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0),
        expenses: dayTx
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0),
      };
    });

    const recentTransactions = allTx
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 8);

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      savingsRate,
      recentTransactions,
      monthlyData,
      budgetPerformance: [],
    };
  },
};
