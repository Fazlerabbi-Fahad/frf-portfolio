import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/projects", label: "Work" },
  { to: "/blog", label: "Writing" },
  { to: "/gallery", label: "Field notes" },
  { to: "/about", label: "About" },
];

export function Nav() {
  const { pathname } = useLocation();
  return (
    <nav className="relative z-50 mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-7 sm:px-10 lg:px-[72px]">
      <Link to="/" className="text-base font-semibold tracking-tight">
        FRF<span className="text-electric">.</span>
      </Link>
      <div className="hidden items-center gap-8 text-sm text-ash md:flex">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`transition-colors hover:text-bone ${pathname.startsWith(l.to) ? "text-bone" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link
        to="/contact"
        className="rounded-lg border border-white/15 px-4 py-2 font-mono text-xs transition-colors hover:border-electric hover:bg-electric/10"
      >
        Start a project
      </Link>
    </nav>
  );
}
