/**
 * BudgetProgress — visual progress bar for budget spending.
 * Color thresholds: green (<70%), amber (70–90%), red (≥90%).
 */
import { cn } from "@/lib/utils";

interface BudgetProgressProps {
  /** Percentage of budget consumed (0–∞, capped at 100% for visual width) */
  percentage: number;
  /** Height class, e.g. "h-2", "h-3". Default: "h-2.5" */
  heightClass?: string;
  className?: string;
  ariaLabel?: string;
}

/** Resolve bar color based on spending threshold */
export function getProgressColor(pct: number): string {
  if (pct >= 90) return "bg-expense"; // red — danger
  if (pct >= 70) return "bg-accent"; // amber — warning
  return "bg-income"; // green — healthy
}

export function BudgetProgress({
  percentage,
  heightClass = "h-2.5",
  className,
  ariaLabel,
}: BudgetProgressProps) {
  const barColor = getProgressColor(percentage);
  const visualWidth = Math.min(100, percentage);

  return (
    <div
      className={cn(
        "w-full rounded-full bg-muted overflow-hidden",
        heightClass,
        className,
      )}
      aria-label={ariaLabel}
    >
      <div
        className={cn("h-full rounded-full transition-smooth", barColor)}
        style={{ width: `${visualWidth}%` }}
      />
    </div>
  );
}
