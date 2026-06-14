export function Footer() {
  return (
    <footer className="relative z-10 mx-auto mt-32 w-full max-w-[1200px] border-t border-white/8 px-6 py-12 sm:px-10 lg:px-[72px]">
      <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
        <div>
          <p className="text-base font-semibold">
            Fazle Rabbi Fahad<span className="text-electric">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-ash">
            Full-stack engineer. <span className="text-cyan">Systems</span> by day,{" "}
            <span className="text-ember">stories</span> on the road.
          </p>
        </div>
        <div className="flex gap-10 font-mono text-xs text-ash">
          <div className="flex flex-col gap-2">
            <a href="https://github.com/Fazlerabbi-Fahad" className="transition-colors hover:text-bone">
              GitHub
            </a>
            <a href="https://www.linkedin.com" className="transition-colors hover:text-bone">
              LinkedIn
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span>Dhaka · GMT+6</span>
            <span>Available remote</span>
          </div>
        </div>
      </div>
      <p className="mt-10 font-mono text-[11px] text-ash/60">
        © {new Date().getFullYear()} — built from scratch, not a template.
      </p>
    </footer>
  );
}
