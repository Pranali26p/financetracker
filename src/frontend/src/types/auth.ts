/**
 * Authentication types for the Personal Finance Manager.
 * Uses local dummy auth (localStorage-based) with a shape
 * compatible with a real backend swap in the future.
 */

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UpsertUserInput {
  username: string;
  email: string;
  avatarUrl?: string;
}
