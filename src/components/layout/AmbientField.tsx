import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

export function AmbientField() {
  const cyan = useRef<HTMLDivElement>(null);
  const ember = useRef<HTMLDivElement>(null);
  const electric = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const set = (el: HTMLDivElement | null, d: number) => {
        if (el) el.style.transform = `translate(${cx * d}px, ${cy * d}px)`;
      };
      set(cyan.current, 22);
      set(ember.current, 34);
      set(electric.current, 14);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden blur-[60px]">
      <div
        ref={cyan}
        className="absolute -left-[6vw] -top-[8vw] h-[48vw] w-[48vw] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle,#46E0D2,transparent 62%)" }}
      />
      <div
        ref={ember}
        className="absolute -bottom-[12vw] -right-[8vw] h-[48vw] w-[48vw] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle,#FF7849,transparent 62%)" }}
      />
      <div
        ref={electric}
        className="absolute left-[38%] top-[30%] h-[40vw] w-[40vw] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle,#3D7BFF,transparent 60%)" }}
      />
    </div>
  );
}
