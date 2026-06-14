import { Section, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { timeline } from "@/data/content";
import { useProjects } from "@/lib/queries";

export function FeaturedProjects() {
  const { data: projects } = useProjects(true);
  const featured = (projects ?? []).slice(0, 4);

  return (
    <Section id="work" className="mt-40">
      <Reveal>
        <div className="flex items-end justify-between">
          <Eyebrow>Selected work</Eyebrow>
        </div>
      </Reveal>
      <Stagger className="mt-9 grid gap-5 md:grid-cols-2">
        {featured.map((p) => (
          <StaggerItem key={p._id}>
            <a
              href={p.liveUrl || p.repoUrl || `/projects/${p.slug}`}
              className="group block h-full"
            >
              <div className="glass relative h-full overflow-hidden rounded-2xl p-7 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/16">
                <div
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: p.accent === "cyan" ? "#46E0D2" : "#FF7849" }}
                />
                <div className="relative flex items-start justify-between">
                  <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
                  <span
                    className={`font-mono text-[11px] ${p.accent === "cyan" ? "text-cyan" : "text-ember"}`}
                  >
                    {p.metric}
                  </span>
                </div>
                <p className="relative mt-3 text-[15px] leading-relaxed text-ash">{p.blurb}</p>
                <div className="relative mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/8 px-2.5 py-1 font-mono text-[11px] text-ash"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span className="relative mt-6 flex items-center gap-2 text-sm text-bone/70 transition-colors group-hover:text-bone">
                  {p.liveUrl ? "Live demo" : "View project"}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export function Timeline() {
  return (
    <Section id="experience" className="mt-40">
      <Reveal>
        <Eyebrow>Experience</Eyebrow>
      </Reveal>
      <div className="mt-10">
        {timeline.map((t, i) => (
          <Reveal key={t.role} delay={i * 0.05}>
            <div className="group grid grid-cols-[88px_1fr] gap-6 border-t border-white/8 py-7 transition-colors hover:bg-white/[0.015] sm:grid-cols-[120px_1fr]">
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
    </Section>
  );
}

const stack = [
  "React", "TypeScript", "Angular", "Node", "Express", "ASP.NET Core",
  "C#", "MongoDB", "SQL Server", "EF Core", "TailwindCSS", "Framer Motion", "JWT", "Vercel",
];

export function TechStack() {
  return (
    <Section id="stack" className="mt-40">
      <Reveal>
        <Eyebrow>Tech stack</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="mt-9 flex flex-wrap gap-3">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/8 bg-raised/40 px-4 py-2 text-sm text-bone/80 transition-colors hover:border-cyan/40 hover:text-bone"
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
