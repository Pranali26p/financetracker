/**
 * BudgetForm — react-hook-form powered form for creating or editing a budget.
 * Validation: amount > 0 required, month/year required, category required.
 * Used inside BudgetModal.
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { useSetBudget } from "../../hooks/useBudgets";
import {
  type BudgetWithSpending,
  CATEGORY_META,
  type Category,
  EXPENSE_CATEGORIES,
  type SetBudgetInput,
} from "../../types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BudgetFormValues {
  category: Category;
  amount: string;
  month: string;
  year: string;
}

interface BudgetFormProps {
  editBudget?: BudgetWithSpending;
  onSuccess: () => void;
  onCancel: () => void;
}

// ─── Month options ─────────────────────────────────────────────────────────────

const MONTH_OPTIONS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

/** Generate a range of years around current year */
function getYearOptions(): { value: string; label: string }[] {
  const current = new Date().getFullYear();
  return [-1, 0, 1, 2].map((offset) => {
    const y = current + offset;
    return { value: String(y), label: String(y) };
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BudgetForm({
  editBudget,
  onSuccess,
  onCancel,
}: BudgetFormProps) {
  const { mutateAsync, isPending } = useSetBudget();
  const now = new Date();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BudgetFormValues>({
    defaultValues: {
      category: editBudget?.category ?? "groceries",
      amount: editBudget ? String(editBudget.amount) : "",
      month: editBudget ? String(editBudget.month) : String(now.getMonth() + 1),
      year: editBudget ? String(editBudget.year) : String(now.getFullYear()),
    },
  });

  const onSubmit = async (data: BudgetFormValues) => {
    const input: SetBudgetInput = {
      category: data.category,
      amount: Number.parseFloat(data.amount),
      month: Number.parseInt(data.month, 10),
      year: Number.parseInt(data.year, 10),
    };
    await mutateAsync(input);
    onSuccess();
  };

  const yearOptions = getYearOptions();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
      {/* Category */}
      <div className="space-y-1.5">
        <Label htmlFor="budget-category">Category</Label>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required." }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(v) => field.onChange(v as Category)}
              disabled={!!editBudget}
            >
              <SelectTrigger
                id="budget-category"
                data-ocid="budget.category.select"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {CATEGORY_META[cat].icon} {CATEGORY_META[cat].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p
            className="text-xs text-destructive"
            data-ocid="budget.category.field_error"
          >
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Amount */}
      <div className="space-y-1.5">
        <Label htmlFor="budget-amount">Monthly Budget Limit ($)</Label>
        <Input
          id="budget-amount"
          type="number"
          step="1"
          min="1"
          placeholder="e.g. 500"
          data-ocid="budget.amount.input"
          {...register("amount", {
            required: "Amount is required.",
            min: { value: 1, message: "Must be at least $1." },
            validate: (v) =>
              !Number.isNaN(Number.parseFloat(v)) || "Enter a valid number.",
          })}
        />
        {errors.amount && (
          <p
            className="text-xs text-destructive"
            data-ocid="budget.amount.field_error"
          >
            {errors.amount.message}
          </p>
        )}
      </div>

      {/* Month / Year row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Month */}
        <div className="space-y-1.5">
          <Label htmlFor="budget-month">Month</Label>
          <Controller
            name="month"
            control={control}
            rules={{ required: "Month is required." }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="budget-month"
                  data-ocid="budget.month.select"
                >
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {MONTH_OPTIONS.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.month && (
            <p
              className="text-xs text-destructive"
              data-ocid="budget.month.field_error"
            >
              {errors.month.message}
            </p>
          )}
        </div>

        {/* Year */}
        <div className="space-y-1.5">
          <Label htmlFor="budget-year">Year</Label>
          <Controller
            name="year"
            control={control}
            rules={{ required: "Year is required." }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="budget-year" data-ocid="budget.year.select">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((y) => (
                    <SelectItem key={y.value} value={y.value}>
                      {y.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.year && (
            <p
              className="text-xs text-destructive"
              data-ocid="budget.year.field_error"
            >
              {errors.year.message}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          data-ocid="budget.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          data-ocid="budget.submit_button"
        >
          {isPending ? "Saving…" : editBudget ? "Save Changes" : "Set Budget"}
        </Button>
      </div>
    </form>
  );
}
