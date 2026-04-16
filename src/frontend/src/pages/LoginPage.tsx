import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  TrendingUp,
  User,
} from "lucide-react";
/**
 * LoginPage — dummy auth login/register with Space Grotesk + fintech styling.
 * Uses react-hook-form for validation. Redirects to /app/dashboard on success.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import type { LoginCredentials, RegisterCredentials } from "../types/auth";

type Mode = "login" | "register";

export function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const {
    login,
    register: registerUser,
    isLoading,
    error,
    clearError,
  } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<LoginCredentials>({
    defaultValues: { email: "olivia@example.com", password: "password123" },
  });

  const registerForm = useForm<RegisterCredentials>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: LoginCredentials) => {
    try {
      await login(data);
      navigate({ to: "/app/dashboard" });
    } catch {
      // error shown via context
    }
  };

  const handleRegister = async (data: RegisterCredentials) => {
    try {
      await registerUser(data);
      navigate({ to: "/app/dashboard" });
    } catch {
      // error shown via context
    }
  };

  const switchMode = (newMode: Mode) => {
    clearError();
    setMode(newMode);
    loginForm.reset();
    registerForm.reset();
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-sidebar p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-white tracking-tight">
            Finly
          </span>
        </div>

        <div className="space-y-6">
          <h2 className="font-display text-4xl font-bold text-white leading-tight">
            Take control of your{" "}
            <span className="text-accent">financial future</span>
          </h2>
          <p className="text-sidebar-foreground text-lg leading-relaxed opacity-80">
            Track income, manage expenses, and build better habits — all in one
            place.
          </p>

          {/* Feature list */}
          <ul className="space-y-3">
            {[
              "Real-time balance tracking",
              "Smart budget management",
              "Visual spending insights",
              "Categorized transactions",
            ].map((feat) => (
              <li
                key={feat}
                className="flex items-center gap-3 text-sidebar-foreground"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-sidebar-muted">
          © {new Date().getFullYear()} Finly. Built with{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 bg-background lg:p-12">
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold">Finly</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Mode tabs */}
          <div
            className="mb-6 flex rounded-lg bg-muted p-1"
            role="tablist"
            data-ocid="login.mode_tab"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              onClick={() => switchMode("login")}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-medium transition-fast",
                mode === "login"
                  ? "bg-card shadow-subtle text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              data-ocid="login.tab"
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "register"}
              onClick={() => switchMode("register")}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-medium transition-fast",
                mode === "register"
                  ? "bg-card shadow-subtle text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              data-ocid="register.tab"
            >
              Register
            </button>
          </div>

          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-foreground">
              {mode === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login"
                ? "Sign in to your Finly account to continue."
                : "Start tracking your finances today."}
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div
              className="mb-4 flex items-start gap-3 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive"
              data-ocid="login.error_state"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Demo hint */}
          {mode === "login" && (
            <div className="mb-4 rounded-lg bg-primary/5 border border-primary/10 px-4 py-3 text-xs text-muted-foreground">
              <strong className="text-foreground">Demo credentials:</strong>{" "}
              olivia@example.com / password123
            </div>
          )}

          {/* Login form */}
          {mode === "login" && (
            <form
              onSubmit={loginForm.handleSubmit(handleLogin)}
              className="space-y-4"
              noValidate
            >
              <div className="space-y-1.5">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="pl-9"
                    data-ocid="login.email.input"
                    {...loginForm.register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Enter a valid email address.",
                      },
                    })}
                  />
                </div>
                {loginForm.formState.errors.email && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="login.email.field_error"
                  >
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="pl-9 pr-9"
                    data-ocid="login.password.input"
                    {...loginForm.register("password", {
                      required: "Password is required.",
                      minLength: { value: 6, message: "Minimum 6 characters." },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-fast"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="login.password.field_error"
                  >
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-ocid="login.submit_button"
              >
                {isLoading ? "Signing in…" : "Sign In"}
              </Button>
            </form>
          )}

          {/* Register form */}
          {mode === "register" && (
            <form
              onSubmit={registerForm.handleSubmit(handleRegister)}
              className="space-y-4"
              noValidate
            >
              <div className="space-y-1.5">
                <Label htmlFor="reg-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="reg-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Olivia Chen"
                    className="pl-9"
                    data-ocid="register.username.input"
                    {...registerForm.register("username", {
                      required: "Full name is required.",
                    })}
                  />
                </div>
                {registerForm.formState.errors.username && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="register.username.field_error"
                  >
                    {registerForm.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="pl-9"
                    data-ocid="register.email.input"
                    {...registerForm.register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Enter a valid email.",
                      },
                    })}
                  />
                </div>
                {registerForm.formState.errors.email && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="register.email.field_error"
                  >
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Min 6 characters"
                    className="pl-9 pr-9"
                    data-ocid="register.password.input"
                    {...registerForm.register("password", {
                      required: "Password is required.",
                      minLength: { value: 6, message: "Minimum 6 characters." },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-fast"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="register.password.field_error"
                  >
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-confirm">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="reg-confirm"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repeat password"
                    className="pl-9"
                    data-ocid="register.confirm_password.input"
                    {...registerForm.register("confirmPassword", {
                      required: "Please confirm your password.",
                      validate: (value) =>
                        value === registerForm.getValues("password") ||
                        "Passwords do not match.",
                    })}
                  />
                </div>
                {registerForm.formState.errors.confirmPassword && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="register.confirm_password.field_error"
                  >
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-ocid="register.submit_button"
              >
                {isLoading ? "Creating account…" : "Create Account"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
