const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

let accessToken: string | null = null;
export const setAccessToken = (t: string | null) => {
  accessToken = t;
};
export const getAccessToken = () => accessToken;

type Options = RequestInit & { auth?: boolean; retry?: boolean };

async function request<T>(path: string, opts: Options = {}): Promise<T> {
  const { auth, retry, headers, ...rest } = opts;
  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(auth && accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  });

  // transparently refresh once on a 401 for authed calls
  if (res.status === 401 && auth && !retry) {
    const refreshed = await tryRefresh();
    if (refreshed) return request<T>(path, { ...opts, retry: true });
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiClientError(res.status, body?.error || res.statusText, body?.details);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export class ApiClientError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function tryRefresh(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return false;
    const data = await res.json();
    accessToken = data.accessToken;
    return true;
  } catch {
    return false;
  }
}

export const api = {
  get: <T>(p: string, auth = false) => request<T>(p, { method: "GET", auth }),
  post: <T>(p: string, body?: unknown, auth = false) =>
    request<T>(p, { method: "POST", body: JSON.stringify(body), auth }),
  put: <T>(p: string, body?: unknown, auth = false) =>
    request<T>(p, { method: "PUT", body: JSON.stringify(body), auth }),
  patch: <T>(p: string, body?: unknown, auth = false) =>
    request<T>(p, { method: "PATCH", body: JSON.stringify(body), auth }),
  del: <T>(p: string, auth = false) => request<T>(p, { method: "DELETE", auth }),
  refresh: tryRefresh,
};
