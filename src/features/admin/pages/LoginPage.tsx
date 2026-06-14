import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Field, Input, Button } from "../components/AdminUI";
import { ApiClientError } from "@/lib/api";

export function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      nav("/admin");
    } catch (e) {
      setError(e instanceof ApiClientError ? e.message : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6">
      <div className="glass rounded-2xl p-8">
        <p className="font-mono text-[11px] uppercase tracking-wider text-cyan">Admin</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-ash">Manage blogs, albums and media.</p>

        <div className="mt-7 space-y-4">
          <Field label="Email">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              autoFocus
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            />
          </Field>
          {error && <p className="text-sm text-ember">{error}</p>}
          <Button onClick={onSubmit} disabled={busy} className="w-full">
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </div>
      </div>
    </div>
  );
}
