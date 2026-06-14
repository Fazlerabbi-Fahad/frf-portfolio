import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes } from "react";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-ash">{label}</span>
      {children}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2.5 text-[15px] text-bone outline-none transition-colors focus:border-electric"
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2.5 text-[15px] text-bone outline-none transition-colors focus:border-electric"
    />
  );
}

export function Button({
  variant = "primary",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const styles = {
    primary: "bg-electric text-white hover:-translate-y-px hover:shadow-[0_8px_24px_-6px_rgba(61,123,255,0.6)]",
    ghost: "border border-white/15 text-bone hover:border-white/30",
    danger: "border border-ember/40 text-ember hover:bg-ember/10",
  }[variant];
  return (
    <button
      {...props}
      className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-50 ${styles} ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl p-6 ${className}`}>{children}</div>;
}
