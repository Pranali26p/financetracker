/**
 * CategoryBadge — displays a category label with icon and color coding.
 * Supports "default" (pill) and "icon" (icon-only) variants.
 */
import { cn } from "@/lib/utils";
import { CATEGORY_META, type Category } from "../../types";

interface CategoryBadgeProps {
  category: Category;
  variant?: "default" | "icon-only" | "label-only";
  className?: string;
}

export function CategoryBadge({
  category,
  variant = "default",
  className,
}: CategoryBadgeProps) {
  const meta = CATEGORY_META[category];

  if (variant === "icon-only") {
    return (
      <span
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-lg text-base",
          meta.bgColor,
          className,
        )}
        title={meta.label}
        aria-label={meta.label}
      >
        {meta.icon}
      </span>
    );
  }

  if (variant === "label-only") {
    return (
      <span className={cn("text-sm font-medium", meta.color, className)}>
        {meta.icon} {meta.label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        meta.bgColor,
        meta.color,
        className,
      )}
    >
      <span aria-hidden="true">{meta.icon}</span>
      <span>{meta.label}</span>
    </span>
  );
}
