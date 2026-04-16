/**
 * chartHelpers.ts — utilities for transforming transaction data into chart-ready formats.
 * Keeps chart logic out of components so they stay thin and testable.
 */

import type { MonthlyDataPoint, Transaction } from "../types";

// ─── Chart Data Types ─────────────────────────────────────────────────────────

export interface BarChartDataPoint {
  month: string;
  income: number;
  expenses: number;
}

export interface CategoryDataPoint {
  category: string;
  amount: number;
  percentage: number;
}

// ─── Monthly Aggregation ──────────────────────────────────────────────────────

/**
 * Filter monthlyData to only days with non-zero values — avoids a flat
 * chart when most days are empty. Also trims trailing zero days.
 */
export function filterActiveChartDays(
  data: MonthlyDataPoint[],
): BarChartDataPoint[] {
  // Find last day with activity
  let lastActiveIndex = -1;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].income > 0 || data[i].expenses > 0) {
      lastActiveIndex = i;
      break;
    }
  }

  // If no active days, return all data (let chart render empty gracefully)
  const trimmed =
    lastActiveIndex >= 0 ? data.slice(0, lastActiveIndex + 1) : data;

  return trimmed.map((d) => ({
    month: d.month,
    income: d.income,
    expenses: d.expenses,
  }));
}

/**
 * Aggregate daily transactions into monthly buckets for a multi-month bar chart.
 * Groups by "Mon YYYY" label (e.g. "Jan 2026", "Feb 2026").
 */
export function aggregateByMonth(
  transactions: Transaction[],
): BarChartDataPoint[] {
  const buckets = new Map<string, { income: number; expenses: number }>();

  for (const tx of transactions) {
    const [year, month] = tx.date.split("-").map(Number);
    const d = new Date(year, month - 1, 1);
    const label = d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    const existing = buckets.get(label) ?? { income: 0, expenses: 0 };
    if (tx.type === "income") {
      existing.income += tx.amount;
    } else if (tx.type === "expense") {
      existing.expenses += tx.amount;
    }
    buckets.set(label, existing);
  }

  // Sort by date chronologically
  return Array.from(buckets.entries())
    .sort(([a], [b]) => {
      const da = new Date(a);
      const db = new Date(b);
      return da.getTime() - db.getTime();
    })
    .map(([month, values]) => ({
      month,
      income: Math.round(values.income * 100) / 100,
      expenses: Math.round(values.expenses * 100) / 100,
    }));
}

// ─── Expense Category Breakdown ───────────────────────────────────────────────

/**
 * Aggregate expenses by category and compute percentages.
 * Returns top N categories sorted by amount descending.
 */
export function aggregateExpensesByCategory(
  transactions: Transaction[],
  topN = 6,
): CategoryDataPoint[] {
  const totals = new Map<string, number>();

  for (const tx of transactions) {
    if (tx.type !== "expense") continue;
    const prev = totals.get(tx.category) ?? 0;
    totals.set(tx.category, prev + tx.amount);
  }

  const total = Array.from(totals.values()).reduce((s, v) => s + v, 0);
  if (total === 0) return [];

  return Array.from(totals.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, topN)
    .map(([category, amount]) => ({
      category,
      amount: Math.round(amount * 100) / 100,
      percentage: Math.round((amount / total) * 1000) / 10,
    }));
}
