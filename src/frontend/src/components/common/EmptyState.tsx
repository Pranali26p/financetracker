import { Button } from "@/components/ui/button";
/**
 * EmptyState — shown when a list or page has no data.
 * Provides a headline, description, optional CTA.
 */
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  /** data-ocid prefix */
  ocid?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
  ocid,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-16 text-center",
        className,
      )}
      data-ocid={ocid ? `${ocid}.empty_state` : undefined}
    >
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Icon className="h-7 w-7 text-muted-foreground" />
        </div>
      )}

      <div className="max-w-sm">
        <h3 className="font-display text-base font-semibold text-foreground">
          {title}
        </h3>
        {description && (
          <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          variant="default"
          size="sm"
          className="mt-2"
          data-ocid={ocid ? `${ocid}.empty_state.primary_button` : undefined}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
