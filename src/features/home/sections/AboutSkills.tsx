import { Section, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { skillGroups, clientFocus } from "@/data/content";

export function About() {
  return (
    <Section id="about" className="mt-40">
      <Reveal>
        <Eyebrow>About</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-7 max-w-[20ch] text-[clamp(28px,4.5vw,52px)] font-semibold leading-[1.05] tracking-tight">
          Six years turning <span className="text-cyan">requirements</span> into things that run.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-ash">
          I'm a full-stack engineer based in Dhaka, working across React, TypeScript, Angular and the
          .NET / Node backends behind them. I care about the unglamorous parts — concurrency, clean
          boundaries, the migration that doesn't break production. The work I'm proudest of is the work
          that shipped.
        </p>
      </Reveal>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" className="mt-32">
      <Reveal>
        <Eyebrow>Skills</Eyebrow>
      </Reveal>
      <Stagger className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g) => (
          <StaggerItem key={g.label}>
            <div className="glass h-full rounded-2xl p-6">
              <p
                className={`font-mono text-xs uppercase tracking-wider ${g.accent === "cyan" ? "text-cyan" : "text-ember"}`}
              >
                {g.label}
              </p>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="text-[15px] text-bone/90">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export function ClientFocus() {
  return (
    <Section id="client-focus" className="mt-32">
      <Reveal>
        <Eyebrow>Who I work with</Eyebrow>
      </Reveal>
      <Stagger className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-white/8 sm:grid-cols-2">
        {clientFocus.map((c) => (
          <StaggerItem key={c}>
            <div className="bg-raised/60 p-7 text-lg font-medium text-bone/90 transition-colors hover:bg-raised">
              {c}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
