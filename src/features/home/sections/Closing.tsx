import { Link } from "react-router-dom";
import { Section, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { blogTeasers, travelTeasers } from "@/data/content";
import { useTestimonials } from "@/lib/queries";

export function Testimonials() {
  const { data: testimonials } = useTestimonials();
  const items = testimonials ?? [];

  return (
    <Section id="testimonials" className="mt-40">
      <Reveal>
        <Eyebrow>What clients say</Eyebrow>
      </Reveal>
      {items.length > 0 ? (
        <Stagger className="mt-9 grid gap-5 md:grid-cols-2">
          {items.map((t) => (
            <StaggerItem key={t._id}>
              <div className="glass h-full rounded-2xl p-7">
                <div className="flex gap-1 text-ember">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="mt-4 text-lg leading-relaxed text-bone/85">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  {t.avatar && <img src={t.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />}
                  <div>
                    <p className="text-sm font-medium">{t.author}</p>
                    {t.title && <p className="font-mono text-[11px] text-ash">{t.title}</p>}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <Reveal delay={0.05}>
          <div className="glass mt-9 rounded-2xl p-10 text-center">
            <p className="mx-auto max-w-[44ch] text-xl font-medium leading-relaxed text-bone/80">
              "Reserved for the words of people I've shipped with."
            </p>
            <p className="mt-4 font-mono text-xs text-ash">Freelancer.com — 5.0 rating · 100% completion</p>
          </div>
        </Reveal>
      )}
    </Section>
  );
}

export function LatestBlogs() {
  return (
    <Section id="writing" className="mt-40">
      <Reveal>
        <div className="flex items-end justify-between">
          <Eyebrow>Latest writing</Eyebrow>
          <Link to="/blog" className="font-mono text-xs text-ash transition-colors hover:text-bone">
            All posts →
          </Link>
        </div>
      </Reveal>
      <Stagger className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-white/8 sm:grid-cols-3">
        {blogTeasers.map((b) => (
          <StaggerItem key={b.title}>
            <Link to="/blog" className="block h-full bg-raised/50 p-7 transition-colors hover:bg-raised">
              <span className="font-mono text-[11px] text-cyan">{b.cat}</span>
              <h3 className="mt-3 text-lg font-medium leading-snug">{b.title}</h3>
              <span className="mt-6 block font-mono text-[11px] text-ash">{b.read} read</span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export function TravelPreview() {
  return (
    <Section id="field-notes" className="mt-40">
      <Reveal>
        <div className="flex items-end justify-between">
          <Eyebrow tone="ember">Field notes</Eyebrow>
          <Link to="/gallery" className="font-mono text-xs text-ash transition-colors hover:text-bone">
            Open the gallery →
          </Link>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-7 max-w-[24ch] text-[clamp(24px,3.5vw,40px)] font-semibold leading-[1.08] tracking-tight">
          The other half of the story.
        </p>
      </Reveal>
      <Stagger className="mt-9 grid gap-5 md:grid-cols-3">
        {travelTeasers.map((t) => (
          <StaggerItem key={t.album}>
            <Link
              to="/gallery"
              className="group block aspect-[4/5] overflow-hidden rounded-2xl border border-white/8"
            >
              <div className="relative flex h-full flex-col justify-end p-6 transition-transform duration-500 group-hover:scale-[1.02]"
                   style={{ background: "linear-gradient(180deg,#12141B,rgba(255,120,73,0.12))" }}>
                <span className="font-mono text-[11px] text-ember">{t.coords}</span>
                <h3 className="mt-2 text-2xl font-semibold">{t.album}</h3>
                <p className="mt-1 text-sm text-ash">{t.tone}</p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export function ContactCTA() {
  return (
    <Section id="contact" className="mt-40">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-10 sm:p-16">
          <div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "#3D7BFF" }}
          />
          <div className="relative">
            <h2 className="max-w-[18ch] text-[clamp(32px,5vw,64px)] font-semibold leading-[1.02] tracking-tight">
              Have something worth <span className="grad-temp">building</span>?
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg text-ash">
              Open to remote roles, freelance projects, and agency work. Tell me what you're trying to
              ship.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex rounded-[10px] bg-electric px-7 py-4 text-[15px] font-medium text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_34px_-6px_rgba(61,123,255,0.6)]"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
