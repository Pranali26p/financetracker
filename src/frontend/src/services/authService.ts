/**
 * Auth service — localStorage-based dummy authentication.
 * Drop-in replaceable with a real backend call (ICP / .NET).
 */
import type {
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth";

const USERS_KEY = "finly-users";
const SESSION_KEY = "finly-session";

/** Retrieve all registered users from localStorage (mock "database"). */
function getStoredUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as User[];
  } catch {
    return [];
  }
}

/** Seed a default demo user if none exist. */
function seedDemoUser(): void {
  const users = getStoredUsers();
  if (users.length === 0) {
    const demo: User = {
      id: "demo-001",
      username: "Olivia Chen",
      email: "olivia@example.com",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([demo]));
    // store hashed-equivalent (plain for demo)
    localStorage.setItem(`finly-pwd-${demo.email}`, "password123");
  }
}

/** Simulate network latency for realistic UX. */
function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Auth Service API ─────────────────────────────────────────────────────────

export const authService = {
  /** Register a new user (mock). */
  async register(credentials: RegisterCredentials): Promise<User> {
    await delay();

    const users = getStoredUsers();
    const existing = users.find((u) => u.email === credentials.email);
    if (existing) {
      throw new Error("An account with this email already exists.");
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      username: credentials.username,
      email: credentials.email,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    localStorage.setItem(`finly-pwd-${newUser.email}`, credentials.password);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));

    return newUser;
  },

  /** Log in with email/password (mock). */
  async login(credentials: LoginCredentials): Promise<User> {
    await delay();
    seedDemoUser();

    const users = getStoredUsers();
    const user = users.find((u) => u.email === credentials.email);

    if (!user) {
      throw new Error("No account found with this email address.");
    }

    const storedPwd = localStorage.getItem(`finly-pwd-${user.email}`);
    if (storedPwd !== credentials.password) {
      throw new Error("Incorrect password. Please try again.");
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  /** Log out the current user. */
  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem(SESSION_KEY);
  },

  /** Get the currently authenticated user from session. */
  getCurrentUser(): User | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  },

  /** Update user profile. */
  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    await delay(300);

    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error("User not found.");

    const updated = { ...users[idx], ...updates };
    users[idx] = updated;

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));

    return updated;
  },

  /** Seed demo user on first load. */
  seedDemoUser,
};
