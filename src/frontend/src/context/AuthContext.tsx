/**
 * AuthContext — provides authentication state and actions to the entire app.
 * Uses authService (localStorage-based) with Zustand as the state layer.
 */
import { type ReactNode, createContext, useEffect } from "react";
import { authService } from "../services/authService";
import { useAuthStore } from "../stores/useAuthStore";
import type {
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth";

// ─── Context Shape ────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setLoading,
    setError,
    logout: storeLogout,
  } = useAuthStore();

  // Hydrate from stored session on mount
  useEffect(() => {
    authService.seedDemoUser();
    const stored = authService.getCurrentUser();
    if (stored) {
      setUser(stored);
    }
  }, [setUser]);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.login(credentials);
      setUser(user);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(message);
      throw err;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.register(credentials);
      setUser(user);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setError(message);
      throw err;
    }
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    storeLogout();
    // Clear the Zustand persist key so the session doesn't survive a page reload
    useAuthStore.persist.clearStorage();
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
