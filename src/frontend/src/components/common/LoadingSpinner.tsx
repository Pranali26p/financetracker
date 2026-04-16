/**
 * LoadingSpinner — animated spinner with optional label.
 * Used for full-page loading states and inline indicators.
 */
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
  fullPage?: boolean;
}

const SIZE_MAP = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

export function LoadingSpinner({
  size = "md",
  label,
  className,
  fullPage = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Loader2
        className={cn("animate-spin text-primary", SIZE_MAP[size])}
        aria-hidden="true"
      />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );

  if (fullPage) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        aria-label={label ?? "Loading"}
      >
        {spinner}
      </div>
    );
  }

  return <p aria-label={label ?? "Loading"}>{spinner}</p>;
}
