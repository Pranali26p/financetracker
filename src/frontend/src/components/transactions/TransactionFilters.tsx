/**
 * TransactionFilters — filter bar for the transactions page.
 * Controls: search input, income/expense/all type toggle,
 * category dropdown, date range (from/to).
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Filter, Search, X } from "lucide-react";
import { useState } from "react";
import {
  CATEGORY_META,
  type Category,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  type TransactionFilters,
} from "../../types";

// Combine all categories for the dropdown
const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

interface TransactionFiltersProps {
  filters: TransactionFilters;
  onFiltersChange: (updates: Partial<TransactionFilters>) => void;
  onClearFilters: () => void;
}

export function TransactionFiltersBar({
  filters,
  onFiltersChange,
  onClearFilters,
}: TransactionFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters =
    (filters.search && filters.search.length > 0) ||
    filters.type !== "all" ||
    filters.category !== "all" ||
    !!filters.dateFrom ||
    !!filters.dateTo;

  return (
    <div className="rounded-xl bg-card border border-border p-4 shadow-card space-y-3">
      {/* Primary row: search + toggle + clear */}
      <div className="flex gap-2 flex-wrap items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search transactions…"
            className="pl-9"
            value={filters.search ?? ""}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            data-ocid="transactions.search_input"
          />
        </div>

        <Button
          type="button"
          variant={showAdvanced ? "default" : "outline"}
          size="icon"
          onClick={() => setShowAdvanced((p) => !p)}
          aria-label="Toggle advanced filters"
          aria-expanded={showAdvanced}
          data-ocid="transactions.filter.toggle"
          className="shrink-0"
        >
          <Filter className="h-4 w-4" />
        </Button>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            data-ocid="transactions.clear_filters.button"
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            <X className="mr-1.5 h-3.5 w-3.5" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Advanced filters panel */}
      {showAdvanced && (
        <div className="flex flex-wrap gap-3 pt-3 border-t border-border">
          {/* Type filter — pill buttons */}
          <fieldset className="flex items-center gap-1 border-0 p-0 m-0">
            <legend className="sr-only">Filter by type</legend>
            {(["all", "income", "expense"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onFiltersChange({ type: t })}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-fast capitalize",
                  filters.type === t
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/70",
                )}
                data-ocid={`transactions.type_filter.${t}`}
              >
                {t === "all" ? "All Types" : t}
              </button>
            ))}
          </fieldset>

          {/* Category dropdown */}
          <Select
            value={filters.category ?? "all"}
            onValueChange={(v) =>
              onFiltersChange({ category: v as Category | "all" })
            }
          >
            <SelectTrigger
              className="h-8 w-44 text-xs"
              data-ocid="transactions.category_filter.select"
            >
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {ALL_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true">{CATEGORY_META[cat].icon}</span>
                    {CATEGORY_META[cat].label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date range */}
          <div className="flex items-center gap-1.5">
            <Input
              type="date"
              className="h-8 w-36 text-xs"
              value={filters.dateFrom ?? ""}
              onChange={(e) =>
                onFiltersChange({ dateFrom: e.target.value || undefined })
              }
              aria-label="From date"
              data-ocid="transactions.date_from.input"
            />
            <span className="text-xs text-muted-foreground">to</span>
            <Input
              type="date"
              className="h-8 w-36 text-xs"
              value={filters.dateTo ?? ""}
              onChange={(e) =>
                onFiltersChange({ dateTo: e.target.value || undefined })
              }
              aria-label="To date"
              data-ocid="transactions.date_to.input"
            />
          </div>
        </div>
      )}

      {/* Active filter chips — quick visual summary */}
      {hasActiveFilters && !showAdvanced && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {filters.type && filters.type !== "all" && (
            <FilterChip
              label={`Type: ${filters.type}`}
              onRemove={() => onFiltersChange({ type: "all" })}
            />
          )}
          {filters.category && filters.category !== "all" && (
            <FilterChip
              label={`${CATEGORY_META[filters.category].icon} ${CATEGORY_META[filters.category].label}`}
              onRemove={() => onFiltersChange({ category: "all" })}
            />
          )}
          {filters.dateFrom && (
            <FilterChip
              label={`From: ${filters.dateFrom}`}
              onRemove={() => onFiltersChange({ dateFrom: undefined })}
            />
          )}
          {filters.dateTo && (
            <FilterChip
              label={`To: ${filters.dateTo}`}
              onRemove={() => onFiltersChange({ dateTo: undefined })}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ─── FilterChip — small dismissible chip ─────────────────────────────────────

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="ml-0.5 rounded-full hover:bg-primary/20 transition-fast"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
