/**
 * Core domain types for the Personal Finance Manager.
 * These types mirror the backend Motoko types and are used throughout the app.
 */

// ─── Enums ───────────────────────────────────────────────────────────────────

export type TransactionType = "income" | "expense" | "transfer";

export type Category =
  | "salary"
  | "freelance"
  | "investment"
  | "business"
  | "food"
  | "groceries"
  | "dining"
  | "transport"
  | "travel"
  | "shopping"
  | "entertainment"
  | "healthcare"
  | "housing"
  | "utilities"
  | "education"
  | "fitness"
  | "subscription"
  | "insurance"
  | "savings"
  | "transfer"
  | "other";

// ─── Core Entities ────────────────────────────────────────────────────────────

export interface Transaction {
  id: number;
  type: TransactionType;
  category: Category;
  amount: number;
  description: string;
  date: string; // ISO date string YYYY-MM-DD
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: number;
  category: Category;
  amount: number; // monthly budget limit
  month: number; // 1-12
  year: number;
  createdAt: string;
}

export interface BudgetWithSpending extends Budget {
  spent: number;
  remaining: number;
  percentage: number; // 0-100
}

export interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number; // 0-100 percentage
  recentTransactions: Transaction[];
  monthlyData: MonthlyDataPoint[];
  budgetPerformance: BudgetWithSpending[];
}

export interface MonthlyDataPoint {
  month: string; // e.g. "Jan", "Feb"
  day?: number; // for daily view within a month
  income: number;
  expenses: number;
}

// ─── Input Types (for creating/updating) ─────────────────────────────────────

export interface CreateTransactionInput {
  type: TransactionType;
  category: Category;
  amount: number;
  description: string;
  date: string;
  notes?: string;
}

export interface UpdateTransactionInput
  extends Partial<CreateTransactionInput> {
  id: number;
}

export interface SetBudgetInput {
  category: Category;
  amount: number;
  month: number;
  year: number;
}

// ─── Filter Types ─────────────────────────────────────────────────────────────

export interface TransactionFilters {
  type?: TransactionType | "all";
  category?: Category | "all";
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

// ─── Category Metadata ────────────────────────────────────────────────────────

export interface CategoryMeta {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  type: "income" | "expense" | "both";
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  salary: {
    label: "Salary",
    icon: "💼",
    color: "text-income",
    bgColor: "bg-income",
    type: "income",
  },
  freelance: {
    label: "Freelance",
    icon: "💻",
    color: "text-income",
    bgColor: "bg-income",
    type: "income",
  },
  investment: {
    label: "Investment",
    icon: "📈",
    color: "text-income",
    bgColor: "bg-income",
    type: "income",
  },
  business: {
    label: "Business",
    icon: "🏢",
    color: "text-income",
    bgColor: "bg-income",
    type: "income",
  },
  food: {
    label: "Food",
    icon: "🍔",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  groceries: {
    label: "Groceries",
    icon: "🛒",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  dining: {
    label: "Dining",
    icon: "🍽️",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  transport: {
    label: "Transport",
    icon: "🚌",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  travel: {
    label: "Travel",
    icon: "✈️",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  shopping: {
    label: "Shopping",
    icon: "🛍️",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  entertainment: {
    label: "Entertainment",
    icon: "🎬",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  healthcare: {
    label: "Healthcare",
    icon: "🏥",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  housing: {
    label: "Housing",
    icon: "🏠",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  utilities: {
    label: "Utilities",
    icon: "💡",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  education: {
    label: "Education",
    icon: "📚",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  fitness: {
    label: "Fitness",
    icon: "🏋️",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  subscription: {
    label: "Subscription",
    icon: "🔄",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  insurance: {
    label: "Insurance",
    icon: "🛡️",
    color: "text-expense",
    bgColor: "bg-expense",
    type: "expense",
  },
  savings: {
    label: "Savings",
    icon: "🏦",
    color: "text-income",
    bgColor: "bg-income",
    type: "both",
  },
  transfer: {
    label: "Transfer",
    icon: "↔️",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    type: "both",
  },
  other: {
    label: "Other",
    icon: "📌",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    type: "both",
  },
};

export const INCOME_CATEGORIES: Category[] = [
  "salary",
  "freelance",
  "investment",
  "business",
];
export const EXPENSE_CATEGORIES: Category[] = [
  "food",
  "groceries",
  "dining",
  "transport",
  "travel",
  "shopping",
  "entertainment",
  "healthcare",
  "housing",
  "utilities",
  "education",
  "fitness",
  "subscription",
  "insurance",
];
