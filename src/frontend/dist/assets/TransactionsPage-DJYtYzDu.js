import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, X, b as cn, f as format, h as LoadingSpinner } from "./index-CS2BT5n9.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, P as Pen, T as Trash2, E as EmptyState, D as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle, h as Plus, C as ConfirmDialog } from "./dialog-Bp6ALiKv.js";
import { I as INCOME_CATEGORIES, E as EXPENSE_CATEGORIES, C as CATEGORY_META, p as parseISO, P as PageHeader } from "./PageHeader-Drc5o7X6.js";
import { I as Input, u as useForm, L as Label, C as Controller } from "./index.esm-Bo9tERdO.js";
import { C as CategoryBadge, a as useCreateTransaction, b as useUpdateTransaction, c as useTransactions, d as useTransactionStore, e as useDeleteTransaction, t as transactionService } from "./useTransactions-B5pdmf53.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
function TransactionFiltersBar({
  filters,
  onFiltersChange,
  onClearFilters
}) {
  const [showAdvanced, setShowAdvanced] = reactExports.useState(false);
  const hasActiveFilters = filters.search && filters.search.length > 0 || filters.type !== "all" || filters.category !== "all" || !!filters.dateFrom || !!filters.dateTo;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card border border-border p-4 shadow-card space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search transactions…",
            className: "pl-9",
            value: filters.search ?? "",
            onChange: (e) => onFiltersChange({ search: e.target.value }),
            "data-ocid": "transactions.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: showAdvanced ? "default" : "outline",
          size: "icon",
          onClick: () => setShowAdvanced((p) => !p),
          "aria-label": "Toggle advanced filters",
          "aria-expanded": showAdvanced,
          "data-ocid": "transactions.filter.toggle",
          className: "shrink-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4" })
        }
      ),
      hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: onClearFilters,
          "data-ocid": "transactions.clear_filters.button",
          className: "text-muted-foreground hover:text-foreground shrink-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mr-1.5 h-3.5 w-3.5" }),
            "Clear filters"
          ]
        }
      )
    ] }),
    showAdvanced && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 pt-3 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "flex items-center gap-1 border-0 p-0 m-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Filter by type" }),
        ["all", "income", "expense"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onFiltersChange({ type: t }),
            className: cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-fast capitalize",
              filters.type === t ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/70"
            ),
            "data-ocid": `transactions.type_filter.${t}`,
            children: t === "all" ? "All Types" : t
          },
          t
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: filters.category ?? "all",
          onValueChange: (v) => onFiltersChange({ category: v }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 w-44 text-xs",
                "data-ocid": "transactions.category_filter.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Categories" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
              ALL_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: CATEGORY_META[cat].icon }),
                CATEGORY_META[cat].label
              ] }) }, cat))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            className: "h-8 w-36 text-xs",
            value: filters.dateFrom ?? "",
            onChange: (e) => onFiltersChange({ dateFrom: e.target.value || void 0 }),
            "aria-label": "From date",
            "data-ocid": "transactions.date_from.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "to" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            className: "h-8 w-36 text-xs",
            value: filters.dateTo ?? "",
            onChange: (e) => onFiltersChange({ dateTo: e.target.value || void 0 }),
            "aria-label": "To date",
            "data-ocid": "transactions.date_to.input"
          }
        )
      ] })
    ] }),
    hasActiveFilters && !showAdvanced && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 pt-1", children: [
      filters.type && filters.type !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterChip,
        {
          label: `Type: ${filters.type}`,
          onRemove: () => onFiltersChange({ type: "all" })
        }
      ),
      filters.category && filters.category !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterChip,
        {
          label: `${CATEGORY_META[filters.category].icon} ${CATEGORY_META[filters.category].label}`,
          onRemove: () => onFiltersChange({ category: "all" })
        }
      ),
      filters.dateFrom && /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterChip,
        {
          label: `From: ${filters.dateFrom}`,
          onRemove: () => onFiltersChange({ dateFrom: void 0 })
        }
      ),
      filters.dateTo && /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterChip,
        {
          label: `To: ${filters.dateTo}`,
          onRemove: () => onFiltersChange({ dateTo: void 0 })
        }
      )
    ] })
  ] });
}
function FilterChip({ label, onRemove }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary", children: [
    label,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onRemove,
        className: "ml-0.5 rounded-full hover:bg-primary/20 transition-fast",
        "aria-label": `Remove ${label} filter`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
      }
    )
  ] });
}
function formatAmount(amount, type) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(amount);
  return type === "income" ? `+${formatted}` : `-${formatted}`;
}
function TransactionRow({
  transaction: tx,
  index,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border last:border-0 hover:bg-muted/30 transition-fast group",
      "data-ocid": `transactions.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pl-5 pr-4 text-sm text-muted-foreground whitespace-nowrap", children: format(parseISO(tx.date), "MMM d, yyyy") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate max-w-[200px]", children: tx.description }),
          tx.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[200px] mt-0.5", children: tx.notes })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: tx.category }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
              tx.type === "income" ? "bg-income text-income" : "bg-expense text-expense"
            ),
            children: tx.type
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            className: cn(
              "py-3.5 pr-4 text-right text-sm font-semibold tabular-nums whitespace-nowrap",
              tx.type === "income" ? "text-income" : "text-expense"
            ),
            children: formatAmount(tx.amount, tx.type)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-fast", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8 text-muted-foreground hover:text-foreground",
              onClick: () => onEdit(tx),
              "aria-label": `Edit ${tx.description}`,
              "data-ocid": `transactions.edit_button.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
              onClick: () => onDelete(tx),
              "aria-label": `Delete ${tx.description}`,
              "data-ocid": `transactions.delete_button.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
            }
          )
        ] }) })
      ]
    }
  );
}
function TransactionList({
  transactions,
  isLoading,
  filters,
  onEdit,
  onDelete,
  onAddNew
}) {
  const hasActiveFilters = filters.search && filters.search.length > 0 || filters.type !== "all" || filters.category !== "all" || !!filters.dateFrom || !!filters.dateTo;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoadingSpinner,
      {
        size: "md",
        label: "Loading transactions…",
        className: "py-16",
        "data-ocid": "transactions.loading_state"
      }
    );
  }
  if (transactions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: hasActiveFilters ? "No transactions match your filters" : "No transactions yet",
        description: hasActiveFilters ? "Try adjusting or clearing your filters to see more results." : "Add your first transaction to start tracking your finances.",
        actionLabel: hasActiveFilters ? void 0 : "Add Transaction",
        onAction: hasActiveFilters ? void 0 : onAddNew,
        ocid: "transactions",
        className: "m-4 border-dashed"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pl-5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell", children: "Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pr-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Amount" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pr-5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: transactions.map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TransactionRow,
      {
        transaction: tx,
        index: i + 1,
        onEdit,
        onDelete
      },
      tx.id
    )) })
  ] }) });
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function TransactionForm({
  editTx,
  isPending,
  onSubmit,
  onCancel
}) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      type: (editTx == null ? void 0 : editTx.type) ?? "expense",
      category: (editTx == null ? void 0 : editTx.category) ?? "food",
      amount: editTx ? String(editTx.amount) : "",
      description: (editTx == null ? void 0 : editTx.description) ?? "",
      date: (editTx == null ? void 0 : editTx.date) ?? format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      notes: (editTx == null ? void 0 : editTx.notes) ?? ""
    }
  });
  const txType = watch("type");
  const categories = txType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const handleFormSubmit = async (data) => {
    var _a;
    const input = {
      type: data.type,
      category: data.category,
      amount: Number.parseFloat(data.amount),
      description: data.description.trim(),
      date: data.date,
      notes: ((_a = data.notes) == null ? void 0 : _a.trim()) || void 0
    };
    await onSubmit(input);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(handleFormSubmit), className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Transaction Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 gap-2",
          role: "radiogroup",
          "aria-label": "Transaction type",
          children: ["income", "expense"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: cn(
                "flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold cursor-pointer transition-fast select-none",
                txType === t ? t === "income" ? "border-income bg-income text-income" : "border-expense bg-expense text-expense" : "border-border bg-card text-muted-foreground hover:bg-muted/60"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    value: t,
                    className: "sr-only",
                    ...register("type", { required: "Type is required." })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: t === "income" ? "💰" : "💸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: t })
              ]
            },
            t
          ))
        }
      ),
      errors.type && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "transaction.type.field_error",
          children: errors.type.message
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tx-amount", className: "text-sm font-medium", children: "Amount ($)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "tx-amount",
          type: "number",
          step: "0.01",
          min: "0.01",
          placeholder: "0.00",
          className: "text-base",
          "data-ocid": "transaction.amount.input",
          ...register("amount", {
            required: "Amount is required.",
            min: { value: 0.01, message: "Must be greater than 0." },
            validate: (v) => !Number.isNaN(Number.parseFloat(v)) || "Enter a valid number."
          })
        }
      ),
      errors.amount && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "transaction.amount.field_error",
          children: errors.amount.message
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tx-desc", className: "text-sm font-medium", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "tx-desc",
          placeholder: "e.g. Whole Foods Market",
          "data-ocid": "transaction.description.input",
          ...register("description", {
            required: "Description is required.",
            minLength: { value: 2, message: "Description is too short." }
          })
        }
      ),
      errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "transaction.description.field_error",
          children: errors.description.message
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Controller,
        {
          name: "category",
          control,
          rules: { required: "Category is required." },
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: field.value,
              onValueChange: (v) => field.onChange(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "transaction.category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a category" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: CATEGORY_META[cat].icon }),
                  CATEGORY_META[cat].label
                ] }) }, cat)) })
              ]
            }
          )
        }
      ),
      errors.category && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "transaction.category.field_error",
          children: errors.category.message
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tx-date", className: "text-sm font-medium", children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "tx-date",
          type: "date",
          "data-ocid": "transaction.date.input",
          ...register("date", { required: "Date is required." })
        }
      ),
      errors.date && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "transaction.date.field_error",
          children: errors.date.message
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "tx-notes", className: "text-sm font-medium", children: [
        "Notes",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "tx-notes",
          placeholder: "Any additional notes…",
          rows: 2,
          className: "resize-none",
          "data-ocid": "transaction.notes.textarea",
          ...register("notes")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onCancel,
          disabled: isPending,
          "data-ocid": "transaction.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: isPending,
          "data-ocid": "transaction.submit_button",
          className: "min-w-[130px]",
          children: isPending ? "Saving…" : editTx ? "Save Changes" : "Add Transaction"
        }
      )
    ] })
  ] });
}
function TransactionModal({
  open,
  onClose,
  editTx
}) {
  const create = useCreateTransaction();
  const update = useUpdateTransaction();
  const isPending = create.isPending || update.isPending;
  const handleSubmit = async (input) => {
    if (editTx) {
      await update.mutateAsync({ ...input, id: editTx.id });
    } else {
      await create.mutateAsync(input);
    }
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (isOpen) => {
        if (!isOpen) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogContent,
        {
          className: "sm:max-w-[480px] max-h-[90vh] overflow-y-auto",
          "data-ocid": "transaction.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg font-semibold", children: editTx ? "Edit Transaction" : "Add Transaction" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TransactionForm,
              {
                editTx,
                isPending,
                onSubmit: handleSubmit,
                onCancel: onClose
              }
            )
          ]
        }
      )
    }
  );
}
function formatCurrency(v) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(v);
}
function TransactionsPage() {
  const { data: allTransactions = [], isLoading } = useTransactions();
  const { filters, setFilters, clearFilters } = useTransactionStore();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editTx, setEditTx] = reactExports.useState();
  const [deleteTx, setDeleteTx] = reactExports.useState();
  const deleteMutation = useDeleteTransaction();
  const filtered = reactExports.useMemo(
    () => transactionService.applyFilters(allTransactions, filters),
    [allTransactions, filters]
  );
  const totalIncome = reactExports.useMemo(
    () => filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [filtered]
  );
  const totalExpenses = reactExports.useMemo(
    () => filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    [filtered]
  );
  const netBalance = totalIncome - totalExpenses;
  const handleOpenAdd = () => {
    setEditTx(void 0);
    setModalOpen(true);
  };
  const handleEdit = (tx) => {
    setEditTx(tx);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditTx(void 0);
  };
  const handleDeleteRequest = (tx) => {
    setDeleteTx(tx);
  };
  const handleDeleteConfirm = async () => {
    if (!deleteTx) return;
    await deleteMutation.mutateAsync(deleteTx.id);
    setDeleteTx(void 0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "transactions.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Transactions",
        subtitle: "Track all your income and expense transactions",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleOpenAdd, "data-ocid": "transactions.add_button", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Add Transaction"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TransactionFiltersBar,
      {
        filters,
        onFiltersChange: setFilters,
        onClearFilters: clearFilters
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-card border border-border shadow-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TransactionList,
      {
        transactions: filtered,
        isLoading,
        filters,
        onEdit: handleEdit,
        onDelete: handleDeleteRequest,
        onAddNew: handleOpenAdd
      }
    ) }),
    !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 items-center rounded-xl bg-card border border-border px-5 py-3.5 shadow-card text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground mr-auto", children: [
        filtered.length,
        " transaction",
        filtered.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-income font-semibold", children: [
        "Income: ",
        formatCurrency(totalIncome)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-expense font-semibold", children: [
        "Expenses: ",
        formatCurrency(totalExpenses)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: netBalance >= 0 ? "text-income font-semibold" : "text-expense font-semibold",
          children: [
            "Net: ",
            netBalance >= 0 ? "+" : "",
            formatCurrency(netBalance)
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TransactionModal,
      {
        open: modalOpen,
        onClose: handleCloseModal,
        editTx
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!deleteTx,
        onOpenChange: (open) => {
          if (!open) setDeleteTx(void 0);
        },
        title: "Delete Transaction",
        description: deleteTx ? `Are you sure you want to delete "${deleteTx.description}"? This cannot be undone.` : void 0,
        confirmLabel: "Delete",
        onConfirm: handleDeleteConfirm,
        isLoading: deleteMutation.isPending,
        ocid: "transactions.delete"
      }
    )
  ] });
}
export {
  TransactionsPage
};
