/**
 * App.tsx — router configuration, provider wrappers, and route tree.
 * All routes defined here. Page components are lazy-imported.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoadingSpinner } from "./components/common/LoadingSpinner";
import { Layout } from "./components/layout/Layout";
import { AuthProvider } from "./context/AuthContext";

// ─── Lazy page imports ────────────────────────────────────────────────────────
const LoginPage = lazy(() =>
  import("./pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const TransactionsPage = lazy(() =>
  import("./pages/TransactionsPage").then((m) => ({
    default: m.TransactionsPage,
  })),
);
const BudgetPage = lazy(() =>
  import("./pages/BudgetPage").then((m) => ({ default: m.BudgetPage })),
);

// ─── QueryClient ──────────────────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

// ─── Page wrapper with Layout + ProtectedRoute ────────────────────────────────
function AppShell() {
  return (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={
            <LoadingSpinner size="lg" label="Loading page…" className="py-20" />
          }
        >
          <Outlet />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  );
}

// ─── Route tree ───────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/login" />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
      <LoginPage />
    </Suspense>
  ),
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: AppShell,
});

const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const transactionsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/transactions",
  component: TransactionsPage,
});

const budgetRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/budget",
  component: BudgetPage,
});

const appIndexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/",
  component: () => <Navigate to="/app/dashboard" />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  appRoute.addChildren([
    appIndexRoute,
    dashboardRoute,
    transactionsRoute,
    budgetRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── Root Component ───────────────────────────────────────────────────────────
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" expand />
      </AuthProvider>
    </QueryClientProvider>
  );
}
