import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Primitives";

const lines = [
  <>
    I build <span className="grad-temp">systems</span>
  </>,
  <>that ship —</>,
  <>
    and <span className="text-ember">stories</span> worth telling.
  </>,
];

export function Hero() {
  return (
    <header className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] w-full max-w-[1200px] flex-col justify-center px-6 pb-12 sm:px-10 lg:px-[72px]">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}>
        <Eyebrow>Full-stack engineer · Dhaka → Remote</Eyebrow>
      </motion.div>

      <h1 className="mt-7 max-w-[14ch] text-[clamp(40px,8.2vw,118px)] font-semibold leading-[0.98] tracking-tightest">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.18 + i * 0.12, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        className="mt-9 max-w-[52ch] text-[clamp(15px,1.6vw,19px)] leading-relaxed text-ash"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Scalable web applications with{" "}
        <span className="font-medium text-bone">React, TypeScript, Node & MongoDB</span> — engineered to
        solve real problems, not just demos. Off the clock, I document the places I travel.
      </motion.p>

      <motion.div
        className="mt-11 flex flex-wrap items-center gap-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.8 }}
      >
        <Link
          to="/projects"
          className="rounded-[10px] bg-electric px-6 py-3.5 text-[15px] font-medium text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_34px_-6px_rgba(61,123,255,0.6)]"
        >
          View selected work
        </Link>
        <Link to="/blog" className="group flex items-center gap-2 px-1 py-3.5 text-[15px]">
          Read the field notes{" "}
          <span className="text-ember transition-transform group-hover:translate-x-1.5">→</span>
        </Link>
      </motion.div>

      <motion.div
        className="mt-auto flex flex-wrap gap-x-[clamp(20px,4vw,56px)] gap-y-6 border-t border-white/8 pt-7"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.8 }}
      >
        <Stat k="Shipped projects" v="12" unit="repos" tone="cyan" />
        <Stat k="Core stack" v="React · .NET · Node" tone="cyan" />
        <Stat k="Last field note" v="Bandarban" unit="22.19°N" tone="ember" />
        <Stat k="Available" v="Remote · GMT+6" tone="ember" />
      </motion.div>
    </header>
  );
}

function Stat({ k, v, unit, tone }: { k: string; v: string; unit?: string; tone: "cyan" | "ember" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ash">{k}</span>
      <span className={`text-[clamp(18px,2.2vw,24px)] font-medium tracking-tight ${tone === "cyan" ? "text-cyan" : "text-ember"}`}>
        {v}
        {unit && <small className="ml-1.5 font-mono text-[0.55em] font-normal text-ash">{unit}</small>}
      </span>
    </div>
  );
}
