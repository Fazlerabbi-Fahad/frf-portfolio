import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Panel } from "../components/AdminUI";
import { useEventStats } from "@/lib/queries";

type Stats = {
  blogs: number;
  albums: number;
  photos: number;
  published: number;
  projects: number;
  testimonials: number;
  recent: {
    _id: string;
    title: string;
    updatedAt: string;
    published: boolean;
  }[];
};

export function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const { data: events } = useEventStats();

  useEffect(() => {
    api
      .get<Stats>("/stats", true)
      .then(setStats)
      .catch((e) => setError(e.message));
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
            <p className="font-mono text-[11px] uppercase tracking-wider text-ash">
              {c.label}
            </p>
            <p
              className={`mt-3 text-3xl font-semibold ${c.tone === "cyan" ? "text-cyan" : "text-ember"}`}
            >
              {c.value ?? "—"}
            </p>
          </Panel>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ash">
          Engagement
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-4">
          <Panel>
            <p className="font-mono text-[11px] uppercase tracking-wider text-ash">
              Shares
            </p>
            <p className="mt-3 text-3xl font-semibold text-ember">
              {events?.total?.share ?? 0}
            </p>
            <p className="mt-1 font-mono text-[11px] text-ash">
              {events?.last30?.share ?? 0} in 30 days
            </p>
          </Panel>
          <Panel>
            <p className="font-mono text-[11px] uppercase tracking-wider text-ash">
              Demo clicks
            </p>
            <p className="mt-3 text-3xl font-semibold text-cyan">
              {events?.total?.click ?? 0}
            </p>
            <p className="mt-1 font-mono text-[11px] text-ash">
              {events?.last30?.click ?? 0} in 30 days
            </p>
          </Panel>
          <Panel>
            <p className="font-mono text-[11px] uppercase tracking-wider text-ash">
              Downloads
            </p>
            <p className="mt-3 text-3xl font-semibold text-cyan">
              {events?.total?.download ?? 0}
            </p>
            <p className="mt-1 font-mono text-[11px] text-ash">
              {events?.last30?.download ?? 0} in 30 days
            </p>
          </Panel>
        </div>

        {events?.topTargets && events.topTargets.length > 0 && (
          <div className="mt-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-ash">
              Most clicked
            </h3>
            <Panel className="mt-3">
              <ul className="divide-y divide-white/6">
                {events.topTargets.map((t) => (
                  <li
                    key={t._id}
                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                  >
                    <span className="text-[15px]">{t._id}</span>
                    <span className="font-mono text-sm text-cyan">
                      {t.count}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        )}
      </div>
      <div className="mt-8">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ash">
          Recent activity
        </h2>
        <Panel className="mt-3">
          {stats?.recent?.length ? (
            <ul className="divide-y divide-white/6">
              {stats.recent.map((r) => (
                <li
                  key={r._id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
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
