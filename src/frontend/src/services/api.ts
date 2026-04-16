/**
 * API client configuration — fetch-based, ready for real backend swap.
 * Uses the browser Fetch API to avoid external dependencies.
 * All service modules import from this file.
 */

const BASE_URL =
  (import.meta.env as Record<string, string>)?.VITE_API_BASE_URL ?? "/api";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiResponse<T> {
  data: T;
  status: number;
}

/** Retrieve auth token from persisted store. */
function getAuthToken(): string | null {
  return localStorage.getItem("finly-token");
}

/** Generic fetch wrapper with typed response and error handling. */
async function request<T>(
  path: string,
  method: RequestMethod = "GET",
  body?: unknown,
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Redirect to login on 401
  if (response.status === 401) {
    localStorage.removeItem("finly-auth");
    localStorage.removeItem("finly-token");
    window.location.href = "/login";
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "Unknown error");
    throw new Error(`API error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as T;
  return { data, status: response.status };
}

/**
 * apiClient — thin wrapper exposing REST-style methods.
 * Swap the implementation here to switch to a real backend.
 */
export const apiClient = {
  get: <T>(path: string) => request<T>(path, "GET"),
  post: <T>(path: string, body: unknown) => request<T>(path, "POST", body),
  put: <T>(path: string, body: unknown) => request<T>(path, "PUT", body),
  patch: <T>(path: string, body: unknown) => request<T>(path, "PATCH", body),
  delete: <T>(path: string) => request<T>(path, "DELETE"),
};

export default apiClient;
