# Fazle Rabbi Fahad — Portfolio (Slice 1: Home)

A handcrafted, dark-cinematic portfolio. React + TypeScript + Tailwind + Framer Motion.
This is **Slice 1 of 6** — the complete home page, runnable and deployable today.

## Design system

- **Dual-temperature accent** — the signature device. Cyan = the engineering side,
  ember (orange) = the travel/human side, electric blue = action & navigation. Color encodes
  *which mode of you* the visitor is looking at. It carries through every section.
- Tokens live in `tailwind.config.js` and `src/styles/globals.css`.
- Ambient blooms follow the cursor with eased parallax (`AmbientField.tsx`), film grain overlay,
  headline lift-in on load, scroll-reveals everywhere.
- `prefers-reduced-motion` fully respected — parallax and reveals degrade to instant.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to /dist
npm run preview    # serve the build locally
```

Node 18+ recommended.

## Deploy to Vercel (your shareable URL, today)

1. Push this folder to a GitHub repo.
2. On vercel.com → New Project → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output `dist`. Defaults are correct.
4. Deploy. `vercel.json` already handles SPA client-side routing.

Or from the CLI:

```bash
npm i -g vercel
vercel            # follow prompts
vercel --prod
```

## Structure

```
src/
  app/            App shell, router, page transitions, route stubs
  components/
    layout/       AmbientField, Nav, Footer
    motion/       Reveal / Stagger wrappers
    ui/           Eyebrow, Section primitives
  data/           content.ts  ← all copy lives here as typed data
  features/home/  HomePage + sections (hero, about, skills, work, timeline,
                  stack, testimonials, blogs, travel, contact CTA)
  lib/            usePrefersReducedMotion
  styles/         globals.css (tokens, grain, gradient signature)
```

Content is **typed data in `src/data/content.ts`**, not hardcoded JSX — so when the
backend slice lands, these arrays get swapped for API calls with no layout changes.

## What's a placeholder right now

`/projects`, `/blog`, `/gallery`, `/about`, `/contact` render labelled stub pages so
navigation works. Each becomes a real page in its slice:

| Slice | Scope |
|---|---|
| 1 ✅ | Home page + design system (this) |
| 2 | Projects case studies + About page |
| 3 | Express + MongoDB backend + Blog engine (search, tags, pagination, syntax highlighting) |
| 4 | Gallery — masonry albums, lightbox, travel timelines, cinematic transitions |
| 5 | Admin panel + JWT auth (refresh-token rotation) + blog/gallery/media CRUD |
| 6 | SEO (dynamic meta, OG, JSON-LD, sitemap, robots) + perf hardening + deploy guide |

Each slice deploys before the next begins.

## Notes

- The hero headline is editorial ("I build systems that ship — and stories worth telling"),
  not the brief's literal example. Easy to swap in `src/features/home/sections/Hero.tsx`.
- Testimonials and project links currently point at GitHub / live demos from your existing work.
  Replace the data in `content.ts` as real testimonials come in.
```
