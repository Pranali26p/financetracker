/**
 * TransactionRow — a single table row for a transaction.
 * Shows: date, description, category badge, type pill, amount (color-coded), edit/delete actions.
 */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";
import type { Transaction } from "../../types";
import { CategoryBadge } from "../common/CategoryBadge";

interface TransactionRowProps {
  transaction: Transaction;
  index: number;
  onEdit: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
}

/** Format USD currency */
function formatAmount(amount: number, type: Transaction["type"]): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
  return type === "income" ? `+${formatted}` : `-${formatted}`;
}

export function TransactionRow({
  transaction: tx,
  index,
  onEdit,
  onDelete,
}: TransactionRowProps) {
  return (
    <tr
      className="border-b border-border last:border-0 hover:bg-muted/30 transition-fast group"
      data-ocid={`transactions.item.${index}`}
    >
      {/* Date */}
      <td className="py-3.5 pl-5 pr-4 text-sm text-muted-foreground whitespace-nowrap">
        {format(parseISO(tx.date), "MMM d, yyyy")}
      </td>

      {/* Description */}
      <td className="py-3.5 pr-4 min-w-0">
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
            {tx.description}
          </span>
          {tx.notes && (
            <span className="text-xs text-muted-foreground truncate max-w-[200px] mt-0.5">
              {tx.notes}
            </span>
          )}
        </div>
      </td>

      {/* Category */}
      <td className="py-3.5 pr-4">
        <CategoryBadge category={tx.category} />
      </td>

      {/* Type */}
      <td className="py-3.5 pr-4 hidden sm:table-cell">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
            tx.type === "income"
              ? "bg-income text-income"
              : "bg-expense text-expense",
          )}
        >
          {tx.type}
        </span>
      </td>

      {/* Amount — color-coded */}
      <td
        className={cn(
          "py-3.5 pr-4 text-right text-sm font-semibold tabular-nums whitespace-nowrap",
          tx.type === "income" ? "text-income" : "text-expense",
        )}
      >
        {formatAmount(tx.amount, tx.type)}
      </td>

      {/* Actions */}
      <td className="py-3.5 pr-5 text-right">
        <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-fast">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(tx)}
            aria-label={`Edit ${tx.description}`}
            data-ocid={`transactions.edit_button.${index}`}
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(tx)}
            aria-label={`Delete ${tx.description}`}
            data-ocid={`transactions.delete_button.${index}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
