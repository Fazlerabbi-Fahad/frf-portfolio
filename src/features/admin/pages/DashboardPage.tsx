import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Panel } from "../components/AdminUI";

type Stats = {
  blogs: number;
  albums: number;
  photos: number;
  published: number;
  projects: number;
  testimonials: number;
  recent: { _id: string; title: string; updatedAt: string; published: boolean }[];
};

export function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get<Stats>("/stats", true).then(setStats).catch((e) => setError(e.message));
  }, []);

  const cards = [
    { label: "Projects", value: stats?.projects, tone: "cyan" },
    { label: "Total blogs", value: stats?.blogs, tone: "cyan" },
    { label: "Published", value: stats?.published, tone: "cyan" },
    { label: "Albums", value: stats?.albums, tone: "ember" },
    { label: "Photos", value: stats?.photos, tone: "ember" },
    { label: "Testimonials", value: stats?.testimonials, tone: "ember" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      {error && <p className="mt-4 text-sm text-ember">{error}</p>}

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {cards.map((c) => (
          <Panel key={c.label}>
            <p className="font-mono text-[11px] uppercase tracking-wider text-ash">{c.label}</p>
            <p className={`mt-3 text-3xl font-semibold ${c.tone === "cyan" ? "text-cyan" : "text-ember"}`}>
              {c.value ?? "—"}
            </p>
          </Panel>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ash">Recent activity</h2>
        <Panel className="mt-3">
          {stats?.recent?.length ? (
            <ul className="divide-y divide-white/6">
              {stats.recent.map((r) => (
                <li key={r._id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <span className="text-[15px]">{r.title}</span>
                  <span
                    className={`font-mono text-[11px] ${r.published ? "text-cyan" : "text-ash"}`}
                  >
                    {r.published ? "published" : "draft"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ash">No activity yet.</p>
          )}
        </Panel>
      </div>
    </div>
  );
}
