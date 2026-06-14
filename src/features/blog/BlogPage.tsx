import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { Section, Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Seo } from "@/components/seo/Seo";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  readingMinutes: number;
  category?: { name: string; slug: string };
};
type Cat = { _id: string; name: string; slug: string };

export function BlogPage() {
  const [items, setItems] = useState<Blog[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get<Cat[]>("/categories").then(setCats).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "9" });
    if (q) params.set("q", q);
    if (cat) params.set("category", cat);
    api
      .get<{ items: Blog[]; pages: number }>(`/blogs?${params}`)
      .then((r) => {
        setItems(r.items);
        setPages(r.pages);
        setErr("");
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [q, cat, page]);

  return (
    <Section className="mt-20 min-h-[70vh]">
      <Seo title="Writing" path="/blog" description="Technical writing on engineering, architecture, and shipping." />
      <Reveal>
        <Eyebrow>Writing</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-7 text-[clamp(36px,6vw,72px)] font-semibold tracking-tight">
          Notes on <span className="text-cyan">building</span>.
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <input
            value={q}
            onChange={(e) => {
              setPage(1);
              setQ(e.target.value);
            }}
            placeholder="Search posts…"
            className="w-full max-w-xs rounded-lg border border-white/10 bg-ink px-4 py-2.5 text-[15px] outline-none focus:border-electric"
          />
          <button
            onClick={() => {
              setCat("");
              setPage(1);
            }}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${!cat ? "bg-white/10 text-bone" : "text-ash hover:text-bone"}`}
          >
            All
          </button>
          {cats.map((c) => (
            <button
              key={c._id}
              onClick={() => {
                setCat(c._id);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${cat === c._id ? "bg-white/10 text-bone" : "text-ash hover:text-bone"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </Reveal>

      {err && <p className="mt-8 text-sm text-ember">Couldn't load posts: {err}</p>}
      {loading && <p className="mt-8 text-sm text-ash">Loading…</p>}

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((b) => (
          <Link key={b._id} to={`/blog/${b.slug}`} className="group block">
            <div className="glass h-full overflow-hidden rounded-2xl transition-all group-hover:-translate-y-1">
              {b.coverImage && (
                <img src={b.coverImage} alt="" className="h-40 w-full object-cover" />
              )}
              <div className="p-6">
                {b.category && <span className="font-mono text-[11px] text-cyan">{b.category.name}</span>}
                <h3 className="mt-2 text-lg font-medium leading-snug">{b.title}</h3>
                {b.excerpt && <p className="mt-2 text-sm text-ash line-clamp-2">{b.excerpt}</p>}
                <span className="mt-4 block font-mono text-[11px] text-ash">{b.readingMinutes} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!loading && !items.length && !err && (
        <p className="mt-10 text-sm text-ash">No posts found.</p>
      )}

      {pages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="font-mono text-sm text-ash">
            {page} / {pages}
          </span>
          <button
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </Section>
  );
}
