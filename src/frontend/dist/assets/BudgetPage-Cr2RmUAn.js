import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, B as Button, T as TrendingUp, r as reactExports, f as format, h as LoadingSpinner, n as Target } from "./index-CS2BT5n9.js";
import { C as CATEGORY_META, E as EXPENSE_CATEGORIES, P as PageHeader } from "./PageHeader-Drc5o7X6.js";
import { P as Pen, T as Trash2, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, D as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle, h as Plus, E as EmptyState, C as ConfirmDialog } from "./dialog-Bp6ALiKv.js";
import { u as useForm, L as Label, C as Controller, I as Input } from "./index.esm-Bo9tERdO.js";
import { a as useSetBudget, u as useBudgets, b as useDeleteBudget, W as Wallet, T as TrendingDown } from "./useBudgets-8H6J8Fc3.js";
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function getProgressColor(pct) {
  if (pct >= 90) return "bg-expense";
  if (pct >= 70) return "bg-accent";
  return "bg-income";
}
function BudgetProgress({
  percentage,
  heightClass = "h-2.5",
  className,
  ariaLabel
}) {
  const barColor = getProgressColor(percentage);
  const visualWidth = Math.min(100, percentage);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "w-full rounded-full bg-muted overflow-hidden",
        heightClass,
        className
      ),
      "aria-label": ariaLabel,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn("h-full rounded-full transition-smooth", barColor),
          style: { width: `${visualWidth}%` }
        }
      )
    }
  );
}
function formatCurrency$1(v) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(v);
}
function StatusBadge({ pct }) {
  if (pct >= 90) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-expense", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }),
      pct >= 100 ? "Over budget" : "Near limit"
    ] });
  }
  if (pct >= 70) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-accent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5" }),
      "Approaching limit"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-income", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
    "On track"
  ] });
}
function BudgetCard({
  budget,
  index,
  onEdit,
  onDelete
}) {
  const meta = CATEGORY_META[budget.category];
  const pct = budget.percentage;
  const isOver = pct >= 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl bg-card border border-border p-5 shadow-card hover:shadow-elevated transition-smooth group",
      "data-ocid": `budget.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl",
                  meta.bgColor
                ),
                children: meta.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground truncate capitalize", children: meta.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { pct })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-fast", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-muted-foreground hover:text-foreground",
                onClick: () => onEdit(budget),
                "aria-label": `Edit ${meta.label} budget`,
                "data-ocid": `budget.edit_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10",
                onClick: () => onDelete(budget),
                "aria-label": `Delete ${meta.label} budget`,
                "data-ocid": `budget.delete_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              formatCurrency$1(budget.spent),
              " spent"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              pct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BudgetProgress,
            {
              percentage: pct,
              ariaLabel: `${meta.label} budget: ${pct}% spent`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "font-semibold",
                  isOver ? "text-expense" : "text-income"
                ),
                children: isOver ? `${formatCurrency$1(Math.abs(budget.remaining))} over` : `${formatCurrency$1(budget.remaining)} left`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "of ",
              formatCurrency$1(budget.amount)
            ] })
          ] })
        ] }),
        isOver && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-1.5 rounded-lg bg-expense/10 px-3 py-1.5 text-xs font-medium text-expense", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 shrink-0" }),
          "You've exceeded this budget by",
          " ",
          formatCurrency$1(Math.abs(budget.remaining))
        ] })
      ]
    }
  );
}
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
  { value: "12", label: "December" }
];
function getYearOptions() {
  const current = (/* @__PURE__ */ new Date()).getFullYear();
  return [-1, 0, 1, 2].map((offset) => {
    const y = current + offset;
    return { value: String(y), label: String(y) };
  });
}
function BudgetForm({
  editBudget,
  onSuccess,
  onCancel
}) {
  const { mutateAsync, isPending } = useSetBudget();
  const now = /* @__PURE__ */ new Date();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      category: (editBudget == null ? void 0 : editBudget.category) ?? "groceries",
      amount: editBudget ? String(editBudget.amount) : "",
      month: editBudget ? String(editBudget.month) : String(now.getMonth() + 1),
      year: editBudget ? String(editBudget.year) : String(now.getFullYear())
    }
  });
  const onSubmit = async (data) => {
    const input = {
      category: data.category,
      amount: Number.parseFloat(data.amount),
      month: Number.parseInt(data.month, 10),
      year: Number.parseInt(data.year, 10)
    };
    await mutateAsync(input);
    onSuccess();
  };
  const yearOptions = getYearOptions();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4 mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "budget-category", children: "Category" }),
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
              disabled: !!editBudget,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "budget-category",
                    "data-ocid": "budget.category.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EXPENSE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: cat, children: [
                  CATEGORY_META[cat].icon,
                  " ",
                  CATEGORY_META[cat].label
                ] }, cat)) })
              ]
            }
          )
        }
      ),
      errors.category && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "budget.category.field_error",
          children: errors.category.message
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "budget-amount", children: "Monthly Budget Limit ($)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "budget-amount",
          type: "number",
          step: "1",
          min: "1",
          placeholder: "e.g. 500",
          "data-ocid": "budget.amount.input",
          ...register("amount", {
            required: "Amount is required.",
            min: { value: 1, message: "Must be at least $1." },
            validate: (v) => !Number.isNaN(Number.parseFloat(v)) || "Enter a valid number."
          })
        }
      ),
      errors.amount && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "budget.amount.field_error",
          children: errors.amount.message
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "budget-month", children: "Month" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Controller,
          {
            name: "month",
            control,
            rules: { required: "Month is required." },
            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "budget-month",
                  "data-ocid": "budget.month.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Month" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MONTH_OPTIONS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m.value, children: m.label }, m.value)) })
            ] })
          }
        ),
        errors.month && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "budget.month.field_error",
            children: errors.month.message
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "budget-year", children: "Year" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Controller,
          {
            name: "year",
            control,
            rules: { required: "Year is required." },
            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "budget-year", "data-ocid": "budget.year.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Year" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: yearOptions.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: y.value, children: y.label }, y.value)) })
            ] })
          }
        ),
        errors.year && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "budget.year.field_error",
            children: errors.year.message
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onCancel,
          disabled: isPending,
          "data-ocid": "budget.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: isPending,
          "data-ocid": "budget.submit_button",
          children: isPending ? "Saving…" : editBudget ? "Save Changes" : "Set Budget"
        }
      )
    ] })
  ] });
}
function BudgetModal({ open, onClose, editBudget }) {
  const handleSuccess = () => {
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (isOpen) => {
        if (!isOpen) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "budget.dialog", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg", children: editBudget ? "Edit Budget" : "Set New Budget" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BudgetForm,
          {
            editBudget,
            onSuccess: handleSuccess,
            onCancel: onClose
          }
        )
      ] })
    }
  );
}
function formatCurrency(v) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(v);
}
function OverallBudgetCard({
  totalBudgeted,
  totalSpent,
  overBudgetCount,
  month
}) {
  const pct = totalBudgeted > 0 ? Math.round(totalSpent / totalBudgeted * 100) : 0;
  const isOver = totalSpent > totalBudgeted;
  const remaining = totalBudgeted - totalSpent;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border bg-card p-6 shadow-card",
      "data-ocid": "budget.overall.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Overall Budget" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: month })
            ] })
          ] }),
          overBudgetCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-lg bg-expense/10 px-3 py-1.5 text-xs font-semibold text-expense", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }),
            overBudgetCount,
            " over budget"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              formatCurrency(totalSpent),
              " spent"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
              pct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BudgetProgress,
            {
              percentage: pct,
              heightClass: "h-3",
              ariaLabel: `Overall budget: ${pct}% spent`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "font-medium",
                  isOver ? "text-expense" : "text-income"
                ),
                children: isOver ? `${formatCurrency(Math.abs(remaining))} over limit` : `${formatCurrency(remaining)} remaining`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Budget: ",
              formatCurrency(totalBudgeted)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
          {
            label: "Budgeted",
            value: formatCurrency(totalBudgeted),
            icon: Wallet,
            color: "text-primary"
          },
          {
            label: "Spent",
            value: formatCurrency(totalSpent),
            icon: TrendingDown,
            color: isOver ? "text-expense" : "text-foreground"
          },
          {
            label: "Remaining",
            value: formatCurrency(Math.abs(remaining)),
            icon: TrendingUp,
            color: isOver ? "text-expense" : "text-income"
          }
        ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg bg-muted/50 border border-border/50 p-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: stat.label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: cn(
                    "font-display text-base font-bold tabular-nums",
                    stat.color
                  ),
                  children: stat.value
                }
              )
            ]
          },
          stat.label
        )) })
      ]
    }
  );
}
function BudgetPage() {
  const { data: budgets = [], isLoading } = useBudgets();
  const deleteMutation = useDeleteBudget();
  const now = /* @__PURE__ */ new Date();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editBudget, setEditBudget] = reactExports.useState();
  const [budgetToDelete, setBudgetToDelete] = reactExports.useState();
  const totalBudgeted = reactExports.useMemo(
    () => budgets.reduce((s, b) => s + b.amount, 0),
    [budgets]
  );
  const totalSpent = reactExports.useMemo(
    () => budgets.reduce((s, b) => s + b.spent, 0),
    [budgets]
  );
  const overBudgetCount = reactExports.useMemo(
    () => budgets.filter((b) => b.percentage >= 100).length,
    [budgets]
  );
  const openAddModal = () => {
    setEditBudget(void 0);
    setModalOpen(true);
  };
  const openEditModal = (b) => {
    setEditBudget(b);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditBudget(void 0);
  };
  const handleDeleteConfirm = async () => {
    if (!budgetToDelete) return;
    await deleteMutation.mutateAsync(budgetToDelete.id);
    setBudgetToDelete(void 0);
  };
  const monthLabel = format(now, "MMMM yyyy");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "budget.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Budget Management",
        subtitle: `Monthly spending limits for ${monthLabel}`,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAddModal, "data-ocid": "budget.add_button", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Set Budget"
        ] })
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading budgets…", className: "py-16" }),
    !isLoading && budgets.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Target,
        title: "No budgets set yet",
        description: "Set monthly spending limits per category to track your financial goals and stay on target.",
        actionLabel: "Set Your First Budget",
        onAction: openAddModal,
        ocid: "budget",
        className: "py-24"
      }
    ),
    !isLoading && budgets.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OverallBudgetCard,
        {
          totalBudgeted,
          totalSpent,
          overBudgetCount,
          month: monthLabel
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: "Category Budgets" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          budgets.length,
          " budget",
          budgets.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3", children: budgets.map((budget, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        BudgetCard,
        {
          budget,
          index: i + 1,
          onEdit: openEditModal,
          onDelete: setBudgetToDelete
        },
        budget.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BudgetModal,
      {
        open: modalOpen,
        onClose: closeModal,
        editBudget
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!budgetToDelete,
        onOpenChange: (isOpen) => {
          if (!isOpen) setBudgetToDelete(void 0);
        },
        title: "Remove Budget",
        description: budgetToDelete ? `Remove the ${budgetToDelete.category} budget? This will not affect existing transactions.` : void 0,
        confirmLabel: "Remove",
        onConfirm: handleDeleteConfirm,
        isLoading: deleteMutation.isPending,
        ocid: "budget.delete"
      }
    )
  ] });
}
export {
  BudgetPage
};
