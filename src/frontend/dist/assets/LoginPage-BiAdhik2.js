import { c as createLucideIcon, r as reactExports, u as useAuth, a as useNavigate, j as jsxRuntimeExports, T as TrendingUp, b as cn, B as Button } from "./index-CS2BT5n9.js";
import { u as useForm, L as Label, I as Input } from "./index.esm-Bo9tERdO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function LoginPage() {
  const [mode, setMode] = reactExports.useState("login");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const {
    login,
    register: registerUser,
    isLoading,
    error,
    clearError
  } = useAuth();
  const navigate = useNavigate();
  const loginForm = useForm({
    defaultValues: { email: "olivia@example.com", password: "password123" }
  });
  const registerForm = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  const handleLogin = async (data) => {
    try {
      await login(data);
      navigate({ to: "/app/dashboard" });
    } catch {
    }
  };
  const handleRegister = async (data) => {
    try {
      await registerUser(data);
      navigate({ to: "/app/dashboard" });
    } catch {
    }
  };
  const switchMode = (newMode) => {
    clearError();
    setMode(newMode);
    loginForm.reset();
    registerForm.reset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex lg:w-1/2 flex-col justify-between bg-sidebar p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-white tracking-tight", children: "Finly" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl font-bold text-white leading-tight", children: [
          "Take control of your",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "financial future" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sidebar-foreground text-lg leading-relaxed opacity-80", children: "Track income, manage expenses, and build better habits — all in one place." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: [
          "Real-time balance tracking",
          "Smart budget management",
          "Visual spending insights",
          "Categorized transactions"
        ].map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-center gap-3 text-sidebar-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold", children: "✓" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: feat })
            ]
          },
          feat
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-sidebar-muted", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Finly. Built with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
            className: "text-primary hover:underline",
            target: "_blank",
            rel: "noopener noreferrer",
            children: "caffeine.ai"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center justify-center p-6 bg-background lg:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-2 lg:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold", children: "Finly" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mb-6 flex rounded-lg bg-muted p-1",
            role: "tablist",
            "data-ocid": "login.mode_tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": mode === "login",
                  onClick: () => switchMode("login"),
                  className: cn(
                    "flex-1 rounded-md py-2 text-sm font-medium transition-fast",
                    mode === "login" ? "bg-card shadow-subtle text-foreground" : "text-muted-foreground hover:text-foreground"
                  ),
                  "data-ocid": "login.tab",
                  children: "Sign In"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": mode === "register",
                  onClick: () => switchMode("register"),
                  className: cn(
                    "flex-1 rounded-md py-2 text-sm font-medium transition-fast",
                    mode === "register" ? "bg-card shadow-subtle text-foreground" : "text-muted-foreground hover:text-foreground"
                  ),
                  "data-ocid": "register.tab",
                  children: "Register"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: mode === "login" ? "Welcome back" : "Create account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: mode === "login" ? "Sign in to your Finly account to continue." : "Start tracking your finances today." })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mb-4 flex items-start gap-3 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive",
            "data-ocid": "login.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
            ]
          }
        ),
        mode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 rounded-lg bg-primary/5 border border-primary/10 px-4 py-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Demo credentials:" }),
          " ",
          "olivia@example.com / password123"
        ] }),
        mode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: loginForm.handleSubmit(handleLogin),
            className: "space-y-4",
            noValidate: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-email", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "login-email",
                      type: "email",
                      autoComplete: "email",
                      placeholder: "you@example.com",
                      className: "pl-9",
                      "data-ocid": "login.email.input",
                      ...loginForm.register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email address."
                        }
                      })
                    }
                  )
                ] }),
                loginForm.formState.errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "login.email.field_error",
                    children: loginForm.formState.errors.email.message
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-password", children: "Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "login-password",
                      type: showPassword ? "text" : "password",
                      autoComplete: "current-password",
                      placeholder: "••••••••",
                      className: "pl-9 pr-9",
                      "data-ocid": "login.password.input",
                      ...loginForm.register("password", {
                        required: "Password is required.",
                        minLength: { value: 6, message: "Minimum 6 characters." }
                      })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowPassword((p) => !p),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-fast",
                      "aria-label": showPassword ? "Hide password" : "Show password",
                      children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                loginForm.formState.errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "login.password.field_error",
                    children: loginForm.formState.errors.password.message
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full",
                  disabled: isLoading,
                  "data-ocid": "login.submit_button",
                  children: isLoading ? "Signing in…" : "Sign In"
                }
              )
            ]
          }
        ),
        mode === "register" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: registerForm.handleSubmit(handleRegister),
            className: "space-y-4",
            noValidate: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-name", children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "reg-name",
                      type: "text",
                      autoComplete: "name",
                      placeholder: "Olivia Chen",
                      className: "pl-9",
                      "data-ocid": "register.username.input",
                      ...registerForm.register("username", {
                        required: "Full name is required."
                      })
                    }
                  )
                ] }),
                registerForm.formState.errors.username && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "register.username.field_error",
                    children: registerForm.formState.errors.username.message
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-email", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "reg-email",
                      type: "email",
                      autoComplete: "email",
                      placeholder: "you@example.com",
                      className: "pl-9",
                      "data-ocid": "register.email.input",
                      ...registerForm.register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email."
                        }
                      })
                    }
                  )
                ] }),
                registerForm.formState.errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "register.email.field_error",
                    children: registerForm.formState.errors.email.message
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-password", children: "Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "reg-password",
                      type: showPassword ? "text" : "password",
                      autoComplete: "new-password",
                      placeholder: "Min 6 characters",
                      className: "pl-9 pr-9",
                      "data-ocid": "register.password.input",
                      ...registerForm.register("password", {
                        required: "Password is required.",
                        minLength: { value: 6, message: "Minimum 6 characters." }
                      })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowPassword((p) => !p),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-fast",
                      "aria-label": showPassword ? "Hide password" : "Show password",
                      children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                registerForm.formState.errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "register.password.field_error",
                    children: registerForm.formState.errors.password.message
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-confirm", children: "Confirm Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "reg-confirm",
                      type: showPassword ? "text" : "password",
                      autoComplete: "new-password",
                      placeholder: "Repeat password",
                      className: "pl-9",
                      "data-ocid": "register.confirm_password.input",
                      ...registerForm.register("confirmPassword", {
                        required: "Please confirm your password.",
                        validate: (value) => value === registerForm.getValues("password") || "Passwords do not match."
                      })
                    }
                  )
                ] }),
                registerForm.formState.errors.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "register.confirm_password.field_error",
                    children: registerForm.formState.errors.confirmPassword.message
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full",
                  disabled: isLoading,
                  "data-ocid": "register.submit_button",
                  children: isLoading ? "Creating account…" : "Create Account"
                }
              )
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  LoginPage
};
