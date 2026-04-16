/**
 * TransactionForm — react-hook-form based form for creating/editing transactions.
 * Fields: type (radio), amount, description, category (filtered by type), date, notes.
 * Validation: amount > 0 required, type required, category required, date required.
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import {
  CATEGORY_META,
  type Category,
  type CreateTransactionInput,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  type Transaction,
  type TransactionType,
} from "../../types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TransactionFormData {
  type: TransactionType;
  category: Category;
  amount: string;
  description: string;
  date: string;
  notes: string;
}

interface TransactionFormProps {
  /** Pre-fill for edit mode. */
  editTx?: Transaction;
  isPending: boolean;
  onSubmit: (input: CreateTransactionInput) => Promise<void>;
  onCancel: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TransactionForm({
  editTx,
  isPending,
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<TransactionFormData>({
    defaultValues: {
      type: editTx?.type ?? "expense",
      category: editTx?.category ?? "food",
      amount: editTx ? String(editTx.amount) : "",
      description: editTx?.description ?? "",
      date: editTx?.date ?? format(new Date(), "yyyy-MM-dd"),
      notes: editTx?.notes ?? "",
    },
  });

  const txType = watch("type");
  // Filter categories based on transaction type
  const categories =
    txType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleFormSubmit = async (data: TransactionFormData) => {
    const input: CreateTransactionInput = {
      type: data.type,
      category: data.category,
      amount: Number.parseFloat(data.amount),
      description: data.description.trim(),
      date: data.date,
      notes: data.notes?.trim() || undefined,
    };
    await onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Transaction Type — pill radio buttons */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Transaction Type</Label>
        <div
          className="grid grid-cols-2 gap-2"
          role="radiogroup"
          aria-label="Transaction type"
        >
          {(["income", "expense"] as TransactionType[]).map((t) => (
            <label
              key={t}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold cursor-pointer transition-fast select-none",
                txType === t
                  ? t === "income"
                    ? "border-income bg-income text-income"
                    : "border-expense bg-expense text-expense"
                  : "border-border bg-card text-muted-foreground hover:bg-muted/60",
              )}
            >
              <input
                type="radio"
                value={t}
                className="sr-only"
                {...register("type", { required: "Type is required." })}
              />
              <span aria-hidden="true">{t === "income" ? "💰" : "💸"}</span>
              <span className="capitalize">{t}</span>
            </label>
          ))}
        </div>
        {errors.type && (
          <p
            className="text-xs text-destructive"
            data-ocid="transaction.type.field_error"
          >
            {errors.type.message}
          </p>
        )}
      </div>

      {/* Amount */}
      <div className="space-y-1.5">
        <Label htmlFor="tx-amount" className="text-sm font-medium">
          Amount ($)
        </Label>
        <Input
          id="tx-amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          className="text-base"
          data-ocid="transaction.amount.input"
          {...register("amount", {
            required: "Amount is required.",
            min: { value: 0.01, message: "Must be greater than 0." },
            validate: (v) =>
              !Number.isNaN(Number.parseFloat(v)) || "Enter a valid number.",
          })}
        />
        {errors.amount && (
          <p
            className="text-xs text-destructive"
            data-ocid="transaction.amount.field_error"
          >
            {errors.amount.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="tx-desc" className="text-sm font-medium">
          Description
        </Label>
        <Input
          id="tx-desc"
          placeholder="e.g. Whole Foods Market"
          data-ocid="transaction.description.input"
          {...register("description", {
            required: "Description is required.",
            minLength: { value: 2, message: "Description is too short." },
          })}
        />
        {errors.description && (
          <p
            className="text-xs text-destructive"
            data-ocid="transaction.description.field_error"
          >
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Category — filtered by type */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Category</Label>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required." }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(v) => field.onChange(v as Category)}
            >
              <SelectTrigger data-ocid="transaction.category.select">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true">{CATEGORY_META[cat].icon}</span>
                      {CATEGORY_META[cat].label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p
            className="text-xs text-destructive"
            data-ocid="transaction.category.field_error"
          >
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Date */}
      <div className="space-y-1.5">
        <Label htmlFor="tx-date" className="text-sm font-medium">
          Date
        </Label>
        <Input
          id="tx-date"
          type="date"
          data-ocid="transaction.date.input"
          {...register("date", { required: "Date is required." })}
        />
        {errors.date && (
          <p
            className="text-xs text-destructive"
            data-ocid="transaction.date.field_error"
          >
            {errors.date.message}
          </p>
        )}
      </div>

      {/* Notes (optional) */}
      <div className="space-y-1.5">
        <Label htmlFor="tx-notes" className="text-sm font-medium">
          Notes{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="tx-notes"
          placeholder="Any additional notes…"
          rows={2}
          className="resize-none"
          data-ocid="transaction.notes.textarea"
          {...register("notes")}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          data-ocid="transaction.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          data-ocid="transaction.submit_button"
          className="min-w-[130px]"
        >
          {isPending ? "Saving…" : editTx ? "Save Changes" : "Add Transaction"}
        </Button>
      </div>
    </form>
  );
}
