import { Section, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { timeline } from "@/data/content";
import { Seo, personJsonLd } from "@/components/seo/Seo";

const philosophy = [
  {
    t: "Shipped beats perfect",
    d: "A clean architecture nobody can use is a worse outcome than a rough thing in production. I optimize for the work reaching real people.",
    tone: "cyan",
  },
  {
    t: "The unglamorous parts matter most",
    d: "Concurrency, migrations, error states. The reliability of a system lives in the parts no one demos.",
    tone: "cyan",
  },
  {
    t: "Stories are systems too",
    d: "A trip, like a codebase, is structure plus the moments that don't fit it. I document both for the same reason.",
    tone: "ember",
  },
];

const process = [
  { n: "01", t: "Understand the real problem", d: "The brief is rarely the problem. I dig until I find what actually hurts." },
  { n: "02", t: "Draw the boundaries", d: "Where does responsibility live? Clear seams now save rewrites later." },
  { n: "03", t: "Build the smallest shippable slice", d: "Something real and deployed beats a big plan. Then iterate against feedback." },
  { n: "04", t: "Harden and hand off", d: "Tests, docs, deploy. Work isn't done until someone else can run it." },
];

const interests = ["Anime", "Travel & photography", "Learner"];

export function AboutPage() {
  return (
    <Section className="mt-20 min-h-[70vh]">
      <Seo title="About" path="/about" description="Full-stack engineer in Dhaka. Six years building web applications, plus travel and photography." jsonLd={personJsonLd} />
      <Reveal>
        <Eyebrow>About</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-7 max-w-[18ch] text-[clamp(36px,6vw,76px)] font-semibold leading-[1.02] tracking-tight">
          Engineer in Dhaka. <span className="text-ember">Traveler</span> when I can be.
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-ash">
          I've spent about six years building full-stack web applications — currently at PriyoShop,
          working on distribution and inventory systems with Angular and ASP.NET Core. Before that,
          Kompass Technologies. Computer Science at AIUB is where the systems thinking started. On the
          side I run Qismah Tees, a print-on-demand brand, and a travel community — both taught me as
          much about shipping as any codebase.
        </p>
      </Reveal>

      <div className="mt-20">
        <Reveal>
          <Eyebrow>The journey</Eyebrow>
        </Reveal>
        <div className="mt-8">
          {timeline.map((t, i) => (
            <Reveal key={t.role} delay={i * 0.05}>
              <div className="grid grid-cols-[88px_1fr] gap-6 border-t border-white/8 py-7 sm:grid-cols-[120px_1fr]">
                <span className="font-mono text-xs text-cyan">{t.period}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="text-xl font-medium">{t.role}</h3>
                    <span className="text-sm text-ash">{t.org}</span>
                  </div>
                  <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ash">{t.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-white/8" />
        </div>
      </div>

      <div className="mt-24">
        <Reveal>
          <Eyebrow>Philosophy</Eyebrow>
        </Reveal>
        <Stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {philosophy.map((p) => (
            <StaggerItem key={p.t}>
              <div className="glass h-full rounded-2xl p-7">
                <h3 className={`text-lg font-medium ${p.tone === "ember" ? "text-ember" : "text-cyan"}`}>{p.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ash">{p.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className="mt-24">
        <Reveal>
          <Eyebrow>How I work</Eyebrow>
        </Reveal>
        <div className="mt-8">
          {process.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="grid grid-cols-[56px_1fr] gap-6 border-t border-white/8 py-6">
                <span className="font-mono text-sm text-ash">{s.n}</span>
                <div>
                  <h3 className="text-lg font-medium">{s.t}</h3>
                  <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-ash">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-white/8" />
        </div>
      </div>

      <div className="mt-24">
        <Reveal>
          <Eyebrow tone="ember">Off the clock</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-3">
            {interests.map((it) => (
              <span key={it} className="rounded-full border border-white/8 bg-raised/40 px-5 py-2.5 text-[15px] text-bone/80">
                {it}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
