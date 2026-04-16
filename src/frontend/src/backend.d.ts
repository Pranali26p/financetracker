import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface CreateTransactionInput {
    date: Timestamp;
    description: string;
    category: Category;
    txType: TransactionType;
    amount: bigint;
}
export interface SetBudgetInput {
    month: bigint;
    year: bigint;
    category?: Category;
    amount: bigint;
}
export interface User {
    id: UserId;
    username: string;
    createdAt: Timestamp;
    email: string;
}
export interface UpdateTransactionInput {
    id: RecordId;
    date: Timestamp;
    description: string;
    category: Category;
    txType: TransactionType;
    amount: bigint;
}
export interface BudgetWithSpending {
    spent: bigint;
    remaining: bigint;
    budget: Budget;
}
export interface DashboardSummary {
    totalIncome: bigint;
    totalExpenses: bigint;
    totalBalance: bigint;
    transactionCount: bigint;
}
export type RecordId = bigint;
export interface Transaction {
    id: RecordId;
    userId: UserId;
    date: Timestamp;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    category: Category;
    txType: TransactionType;
    amount: bigint;
}
export type UserId = string;
export interface UpsertUserInput {
    username: string;
    email: string;
}
export interface Budget {
    id: RecordId;
    month: bigint;
    userId: UserId;
    createdAt: Timestamp;
    year: bigint;
    updatedAt: Timestamp;
    category?: Category;
    amount: bigint;
}
export enum Category {
    healthcare = "healthcare",
    salary = "salary",
    entertainment = "entertainment",
    food = "food",
    travel = "travel",
    rent = "rent",
    education = "education",
    others = "others",
    shopping = "shopping"
}
export enum TransactionType {
    expense = "expense",
    income = "income"
}
export interface backendInterface {
    createTransaction(input: CreateTransactionInput): Promise<Transaction>;
    deleteBudget(id: bigint): Promise<void>;
    deleteTransaction(id: bigint): Promise<void>;
    getBudgets(): Promise<Array<BudgetWithSpending>>;
    getDashboardSummary(): Promise<DashboardSummary>;
    getTransactions(): Promise<Array<Transaction>>;
    getTransactionsByCategory(category: Category): Promise<Array<Transaction>>;
    getTransactionsByMonth(month: bigint, year: bigint): Promise<Array<Transaction>>;
    getUser(): Promise<User | null>;
    setBudget(input: SetBudgetInput): Promise<Budget>;
    updateTransaction(input: UpdateTransactionInput): Promise<Transaction>;
    upsertUser(input: UpsertUserInput): Promise<User>;
}
