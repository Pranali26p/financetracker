import { cn } from "@/lib/utils";
/**
 * Sidebar navigation component.
 * Dark navy background with active state indicators.
 * Collapsible on mobile, fixed on desktop.
 */
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  LayoutDashboard,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/app/transactions", icon: ArrowLeftRight },
  { label: "Budget", href: "/app/budget", icon: Target },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouterState();
  const pathname = router.location.pathname;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop overlay is a UX pattern, keyboard users navigate with Escape
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo area */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar px-6">
          <Link
            to="/app/dashboard"
            className="flex items-center gap-2.5"
            onClick={onClose}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <TrendingUp className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-white tracking-tight">
              Finly
            </span>
          </Link>
          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-sidebar-muted hover:text-white transition-fast lg:hidden"
            aria-label="Close sidebar"
            data-ocid="sidebar.close_button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin"
          aria-label="Main navigation"
        >
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-muted">
            Overview
          </p>
          <ul className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    data-ocid={`sidebar.nav.${item.label.toLowerCase()}`}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-fast",
                      isActive
                        ? "bg-sidebar-accent text-white shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-white",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 shrink-0 transition-fast",
                        isActive
                          ? "text-sidebar-primary"
                          : "text-sidebar-muted group-hover:text-sidebar-primary",
                      )}
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-sidebar-primary" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom accent */}
        <div className="border-t border-sidebar px-4 py-3">
          <p className="text-xs text-sidebar-muted text-center">
            Personal Finance Manager
          </p>
        </div>
      </aside>
    </>
  );
}
