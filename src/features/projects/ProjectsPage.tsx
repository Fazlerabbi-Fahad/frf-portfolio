import { Link } from "react-router-dom";
import { Section, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Seo, personJsonLd } from "@/components/seo/Seo";
import { useProjects } from "@/lib/queries";

export function ProjectsPage() {
  const { data: projects, isLoading, error } = useProjects();

  return (
    <Section className="mt-20 min-h-[70vh]">
      <Seo title="Work" path="/projects" description="Selected full-stack engineering projects — case studies on the problems underneath the features." jsonLd={personJsonLd} />
      <Reveal>
        <Eyebrow>Selected work</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-7 max-w-[16ch] text-[clamp(40px,7vw,84px)] font-semibold leading-[1.0] tracking-tight">
          Things I <span className="text-cyan">shipped</span>.
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ash">
          A few projects where the interesting part wasn't the feature list — it was the problem
          underneath it. Each one links to the live build or the source.
        </p>
      </Reveal>

      {error && <p className="mt-10 text-sm text-ember">Couldn't load projects.</p>}
      {isLoading && <p className="mt-10 text-sm text-ash">Loading…</p>}

      <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
        {projects?.map((p) => (
          <StaggerItem key={p._id}>
            <Link to={`/projects/${p.slug}`} className="group block h-full">
              <div className="glass relative h-full overflow-hidden rounded-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/16">
                {p.coverImage && (
                  <img src={p.coverImage} alt="" className="h-44 w-full object-cover" />
                )}
                <div className="p-8">
                  <div
                    className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                    style={{ background: p.accent === "cyan" ? "#46E0D2" : "#FF7849" }}
                  />
                  <div className="relative flex items-start justify-between">
                    <h2 className="text-2xl font-semibold tracking-tight">{p.title}</h2>
                    <span className="font-mono text-[11px] text-ash">{p.year}</span>
                  </div>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-ash">{p.blurb}</p>
                  <div className="relative mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-md border border-white/8 px-2.5 py-1 font-mono text-[11px] text-ash">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="relative mt-7 flex items-center gap-2 text-sm text-bone/70 transition-colors group-hover:text-bone">
                    Read the case study
                    <span className="text-cyan transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      {!isLoading && !projects?.length && !error && (
        <p className="mt-10 text-sm text-ash">No projects yet.</p>
      )}
    </Section>
  );
}
