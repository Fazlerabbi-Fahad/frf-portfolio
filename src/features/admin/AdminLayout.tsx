import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Button } from "./components/AdminUI";

const navItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/blogs", label: "Blogs" },
  { to: "/admin/albums", label: "Gallery" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/media", label: "Media" },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    nav("/admin/login");
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] gap-8 px-6 py-10 sm:px-10 lg:px-[72px]">
      <aside className="hidden w-52 shrink-0 md:block">
        <div className="sticky top-10">
          <Link to="/" className="text-base font-semibold tracking-tight">
            FRF<span className="text-electric">.</span>
            <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-ash">admin</span>
          </Link>
          <nav className="mt-8 flex flex-col gap-1">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive ? "bg-white/8 text-bone" : "text-ash hover:text-bone"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-8 border-t border-white/8 pt-6">
            <p className="truncate font-mono text-[11px] text-ash">{user?.email}</p>
            <button onClick={onLogout} className="mt-2 text-sm text-ember hover:underline">
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        {/* mobile top bar */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <div className="flex gap-3 overflow-x-auto">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `whitespace-nowrap text-sm ${isActive ? "text-bone" : "text-ash"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </div>
          <Button variant="ghost" onClick={onLogout} className="ml-3 shrink-0 px-3 py-1.5">
            Out
          </Button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
