import { Link, useParams } from "react-router-dom";
import { Section, Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Seo, BASE_URL } from "@/components/seo/Seo";
import { useProject } from "@/lib/queries";
import { trackEvent } from "@/lib/track";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const { data: p, isLoading, error } = useProject(slug);

  if (isLoading) {
    return (
      <Section className="mt-24 min-h-[60vh]">
        <p className="text-sm text-ash">Loading…</p>
      </Section>
    );
  }
  if (error || !p) {
    return (
      <Section className="mt-24 min-h-[60vh]">
        <h1 className="text-3xl font-semibold">Project not found.</h1>
        <Link
          to="/projects"
          className="mt-6 inline-block text-sm text-bone/70 hover:text-bone"
        >
          ← Back to work
        </Link>
      </Section>
    );
  }

  const tone = p.accent === "cyan" ? "text-cyan" : "text-ember";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.blurb,
    url: `${BASE_URL}/projects/${p.slug}`,
    keywords: p.stack.join(", "),
  };

  return (
    <Section className="mt-20 min-h-[70vh]">
      <Seo
        title={p.title}
        path={`/projects/${p.slug}`}
        description={p.blurb}
        image={p.coverImage || undefined}
        type="article"
        jsonLd={jsonLd}
      />
      <Reveal>
        <Link
          to="/projects"
          className="text-sm text-ash transition-colors hover:text-bone"
        >
          ← All work
        </Link>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="text-[clamp(36px,6vw,72px)] font-semibold tracking-tight">
            {p.title}
          </h1>
          {p.year && (
            <span className="font-mono text-sm text-ash">{p.year}</span>
          )}
        </div>
      </Reveal>
      {p.role && (
        <Reveal delay={0.1}>
          <p
            className={`mt-2 font-mono text-xs uppercase tracking-wider ${tone}`}
          >
            {p.role}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.12}>
        <p className="mt-6 max-w-[58ch] text-xl leading-relaxed text-bone/85">
          {p.blurb}
        </p>
      </Reveal>

      {p.coverImage && (
        <Reveal delay={0.14}>
          <img
            src={p.coverImage}
            alt=""
            className="mt-10 max-h-[420px] w-full rounded-2xl object-cover"
          />
        </Reveal>
      )}

      {p.stack.length > 0 && (
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/8 bg-raised/40 px-4 py-2 text-sm text-bone/80"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      )}

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        {p.challenge && (
          <Reveal>
            <div>
              <Eyebrow tone="ember">The challenge</Eyebrow>
              <p className="mt-5 text-lg leading-relaxed text-ash">
                {p.challenge}
              </p>
            </div>
          </Reveal>
        )}
        {p.solution && (
          <Reveal delay={0.05}>
            <div>
              <Eyebrow>The solution</Eyebrow>
              <p className="mt-5 text-lg leading-relaxed text-ash">
                {p.solution}
              </p>
            </div>
          </Reveal>
        )}
      </div>

      {p.highlights.length > 0 && (
        <Reveal>
          <div className="mt-16">
            <Eyebrow>What it took</Eyebrow>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li
                  key={h}
                  className="glass flex items-start gap-3 rounded-xl p-5 text-[15px] text-bone/85"
                >
                  <span className={`mt-0.5 ${tone}`}>—</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {(p.liveUrl || p.repoUrl) && (
        <Reveal>
          <div className="mt-14 flex flex-wrap gap-4">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                onClick={() => trackEvent("click", p.slug, "live-demo")}
                className="rounded-[10px] bg-electric px-6 py-3.5 text-[15px] font-medium text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_34px_-6px_rgba(61,123,255,0.6)]"
              >
                Live demo →
              </a>
            )}
            {p.repoUrl && (
              <a
                href={p.repoUrl}
                className="rounded-[10px] border border-white/15 px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-white/30"
              >
                View source →
              </a>
            )}
          </div>
        </Reveal>
      )}
    </Section>
  );
}
