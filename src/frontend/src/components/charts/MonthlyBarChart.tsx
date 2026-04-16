/**
 * MonthlyBarChart — reusable income vs expense bar chart using Recharts.
 * Accepts pre-processed BarChartDataPoint[] so it stays a pure display component.
 */
import { cn } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BarChartDataPoint } from "../../utils/chartHelpers";
import { formatCurrency, formatCurrencyCompact } from "../../utils/formatters";

interface MonthlyBarChartProps {
  /** Pre-processed data points — each with month label, income, expenses */
  data: BarChartDataPoint[];
  /** Height of the chart area in px (default: 220) */
  height?: number;
  className?: string;
}

/** Custom tooltip rendered over hovered bars */
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-elevated text-xs">
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 py-0.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground capitalize">{entry.name}</span>
          <span className="ml-auto font-semibold tabular-nums text-foreground">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Legend item formatter */
function legendFormatter(value: string): string {
  return value === "income" ? "Income" : "Expenses";
}

export function MonthlyBarChart({
  data,
  height = 220,
  className,
}: MonthlyBarChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} barGap={3} barSize={13}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="oklch(var(--border))"
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCurrencyCompact}
            width={52}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "oklch(var(--muted) / 0.5)" }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
            formatter={legendFormatter}
          />
          <Bar
            dataKey="income"
            name="income"
            fill="oklch(var(--chart-1))"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            name="expenses"
            fill="oklch(var(--chart-2))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
