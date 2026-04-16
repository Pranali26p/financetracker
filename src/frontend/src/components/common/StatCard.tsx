import { Skeleton } from "@/components/ui/skeleton";
/**
 * StatCard — displays a single KPI metric with icon, value, and trend.
 * Used across the dashboard for Balance, Income, Expenses, Savings Rate.
 */
import { cn } from "@/lib/utils";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

type TrendDirection = "up" | "down" | "neutral";

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendDirection?: TrendDirection;
  icon: React.ElementType;
  iconBg?: string;
  iconColor?: string;
  isLoading?: boolean;
  /** data-ocid identifier */
  ocid?: string;
}

export function StatCard({
  title,
  value,
  trend,
  trendDirection = "neutral",
  icon: Icon,
  iconBg = "bg-primary/10",
  iconColor = "text-primary",
  isLoading = false,
  ocid,
}: StatCardProps) {
  const TrendIcon =
    trendDirection === "up"
      ? TrendingUp
      : trendDirection === "down"
        ? TrendingDown
        : Minus;
  const trendColor =
    trendDirection === "up"
      ? "text-income"
      : trendDirection === "down"
        ? "text-expense"
        : "text-muted-foreground";

  if (isLoading) {
    return (
      <div
        className="rounded-lg bg-card p-5 shadow-card border border-border"
        data-ocid={ocid ? `${ocid}.loading_state` : undefined}
      >
        <div className="flex items-start justify-between">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="group rounded-lg bg-card p-5 shadow-card border border-border transition-smooth hover:shadow-elevated"
      data-ocid={ocid}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            iconBg,
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>

        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              trendColor,
              "bg-current/10",
            )}
          >
            <TrendIcon className="h-3 w-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 font-display text-2xl font-bold tabular-nums text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}
