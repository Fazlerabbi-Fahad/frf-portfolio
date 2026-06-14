import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, setAccessToken } from "@/lib/api";

type AdminUser = { id: string; email: string; name: string };
type AuthState = {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // on mount, try to restore a session via the refresh cookie
  useEffect(() => {
    (async () => {
      const ok = await api.refresh();
      if (ok) {
        try {
          const me = await api.get<AdminUser>("/auth/me", true);
          setUser(me);
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.post<{ accessToken: string; user: AdminUser }>("/auth/login", {
      email,
      password,
    });
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    await api.post("/auth/logout").catch(() => {});
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
