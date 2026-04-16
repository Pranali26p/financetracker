/**
 * formatters.ts — shared formatting utilities for currency, dates, and numbers.
 * Centralises formatting logic so all pages use consistent output.
 */

// ─── Currency ─────────────────────────────────────────────────────────────────

const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format a number as US dollars: 1234.5 → "$1,234.50" */
export function formatCurrency(value: number): string {
  return USD_FORMATTER.format(value);
}

/**
 * Format a number as compact currency for chart axes.
 * e.g. 1500 → "$1.5k", 1000000 → "$1M"
 */
export function formatCurrencyCompact(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}k`;
  }
  return `$${value}`;
}

/** Format a percentage: 42.8 → "42.8%" */
export function formatPercent(value: number, decimals = 1): string {
  return `${Number(value).toFixed(decimals)}%`;
}

// ─── Dates ────────────────────────────────────────────────────────────────────

/**
 * Format a date string (ISO YYYY-MM-DD) as a readable short date.
 * e.g. "2026-04-16" → "Apr 16"
 */
export function formatShortDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

/**
 * Format a date string as long date.
 * e.g. "2026-04-16" → "April 16, 2026"
 */
export function formatLongDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ─── Numbers ──────────────────────────────────────────────────────────────────

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
