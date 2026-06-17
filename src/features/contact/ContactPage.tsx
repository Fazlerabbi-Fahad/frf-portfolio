import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { Section, Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Seo } from "@/components/seo/Seo";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [serverErr, setServerErr] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Your name, please.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "A valid email helps me reply.";
    if (form.message.trim().length < 10) e.message = "A little more detail (10+ characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    setServerErr("");
    if (!validate()) return;
    setBusy(true);
    try {
      await api.post("/contact", form);
      setSent(true);
    } catch (err) {
      setServerErr(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Section className="mt-20 min-h-[70vh]">
      <Seo title="Contact" path="/contact" description="Get in touch about remote roles, freelance projects, and agency work." />
      <Reveal>
        <Eyebrow>Contact</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-7 max-w-[18ch] text-[clamp(36px,6vw,72px)] font-semibold leading-[1.02] tracking-tight">
          Let's build something <span className="grad-temp">together</span>.
        </h1>
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.3fr_1fr]">
        <Reveal>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass flex min-h-[300px] flex-col items-center justify-center rounded-2xl p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan/15 text-3xl text-cyan"
              >
                ✓
              </motion.div>
              <h2 className="mt-5 text-xl font-medium">Message sent.</h2>
              <p className="mt-2 text-sm text-ash">Thanks — I'll be in touch soon.</p>
            </motion.div>
          ) : (
            <div className="glass space-y-5 rounded-2xl p-7">
              {/* honeypot — hidden from humans */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="absolute left-[-9999px]"
                aria-hidden="true"
              />
              <label className="block">
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-ash">Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2.5 outline-none focus:border-electric"
                />
                {errors.name && <span className="mt-1 block text-xs text-ember">{errors.name}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-ash">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2.5 outline-none focus:border-electric"
                />
                {errors.email && <span className="mt-1 block text-xs text-ember">{errors.email}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-ash">Message</span>
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2.5 outline-none focus:border-electric"
                />
                {errors.message && <span className="mt-1 block text-xs text-ember">{errors.message}</span>}
              </label>
              {serverErr && <p className="text-sm text-ember">{serverErr}</p>}
              <button
                onClick={submit}
                disabled={busy}
                className="rounded-[10px] bg-electric px-6 py-3.5 text-[15px] font-medium text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_34px_-6px_rgba(61,123,255,0.6)] disabled:opacity-50"
              >
                {busy ? "Sending…" : "Send message"}
              </button>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.05}>
          <div className="space-y-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-ash">Direct</p>
              <div className="mt-3 space-y-2">
                <a href="https://github.com/Fazlerabbi-Fahad" className="block text-bone/85 hover:text-bone">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/fazle-rabbi-fahad/" className="block text-bone/85 hover:text-bone">
                  LinkedIn
                </a>
                <a href="https://www.facebook.com/fablerabbi.fahad" className="block text-bone/85 hover:text-bone">
                  Facebook
                </a>
                <a href="https://www.instagram.com/fazlerabbi_fahad/" className="block text-bone/85 hover:text-bone">
                  Instagram
                </a>
                <a href="https://api.whatsapp.com/send/?phone=8801729992254" className="block text-bone/85 hover:text-bone">
                  Whatsapp
                </a>
              </div>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-ash">Based in</p>
              <p className="mt-3 text-bone/85">Dhaka, Bangladesh · GMT+6</p>
              <p className="mt-1 text-sm text-ash">Available for remote work worldwide.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
