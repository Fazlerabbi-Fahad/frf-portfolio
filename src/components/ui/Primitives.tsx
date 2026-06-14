import type { ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "cyan",
}: {
  children: ReactNode;
  tone?: "cyan" | "ember";
}) {
  const dot = tone === "cyan" ? "bg-cyan shadow-[0_0_12px_#46E0D2]" : "bg-ember shadow-[0_0_12px_#FF7849]";
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ash">
      <span className={`h-[7px] w-[7px] rounded-full ${dot}`} />
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-[72px] ${className}`}>
      {children}
    </section>
  );
}
