@AGENTS.md

# Project context

Personal brand site for Ifeanyi Anyanwu (full-stack engineer, cook, chess learner, returning sketcher): story-led home, work, Sanity-backed gallery, MDX journal. Goal: get hired or collaborate. Roadmap, story, voice and privacy rules live in `PLAN.md`; work one milestone per session and tick items off there.

- Package manager: pnpm. Dev: `pnpm dev`. Check: `pnpm lint && pnpm build`.
- `cacheComponents` is on: no uncached `new Date()`/`Math.random()` in prerendered code (see `src/components/year.tsx`).
- Theme defaults to the device (`system`); the toggle flips light/dark and returns to `system` when it lands on the device setting.
- Use semantic color tokens so dark mode works: `bg-bg`, `bg-surface`, `bg-sand`, `text-fg`, `text-muted`, `border-line(-strong)`, `bg-sky` + `text-on-sky` (baby blue surfaces, same in both themes), `text-accent`, `bg-cta` + `text-cta-fg` (primary buttons), `bg-mist` + `text-mist-fg`, `plot` (the pen line). Raw palette (`sand-*`, `sky-*`) only when a color must not flip.
- Approved design lives on the canvas: https://claude.ai/artifact/5DG3XqY1jfmQCXgqAncrtu (creative direction "The Plot", see PLAN.md).
- Type utilities: `text-display` and `text-headline` (Instrument Serif), `text-title`, `text-lede`, `text-eyebrow` (Inter Tight), `text-hand` (Caveat, notes only); layout: `container-page`.
- Work: one MDX file per project in `src/content/work/` exporting `meta` (shape in `src/lib/work-meta.ts`); `/work`, filters and case study pages read from it. Case study blocks (`Recipe`, `Chapter`, `Steps`, `Compare`, `Results`, `Blend`, `BigResult`) are global in MDX via `src/mdx-components.tsx`, and all are optional.
- Journal: one MDX file per post in `src/content/journal/` exporting `meta` (shape in `src/lib/journal-meta.ts`); `##` headings become the TOC (ids from `rehype-slug`). Posts render with `proseComponents` (`src/components/journal/prose.tsx`), which adds `<Note>` (margin note) and `<Caption>`. Drafts listed as "On the stove" live in `stove` in site.ts. RSS at `/journal/rss.xml` uses `SITE_URL`.
- About: copy in `about` in site.ts; the story/CV toggle (`src/components/about/full-plot.tsx`) keeps its view in `?view=cv`. The CV PDF lives at `public/cv/` (`links.cv`); it is built from Ifeanyi's export with no phone, location, permit or placeholders. `ButtonLink`/`LinkArrow` render file paths as plain `<a>`.
- Gallery: Sanity (`src/sanity/`, Studio at `/studio`, config in `sanity.config.ts`). Env vars in `.env.example`; with no project ID the gallery shows its empty state. Data via `getPlotPoints()` (`"use cache"`, tag `plot-points`). Client components import types from `src/sanity/types.ts`, never `queries.ts`.
- SEO: `siteUrl` (`src/lib/site-url.ts`) feeds `metadataBase`, sitemap, robots and RSS. Pages set only `title` and `description`; Open Graph and the card fall back to them. Share cards come from `ogImage()` in `src/lib/og.tsx` (fonts as TTF in `assets/og`): `src/app/opengraph-image.tsx` plus one per case study and journal post.
- Deploy: Vercel project `ifeanyianyanwu` (https://ifeanyianyanwu.vercel.app); `vercel.json` pins the framework to Next.js. Env: `NEXT_PUBLIC_SANITY_PROJECT_ID` (production and preview). Pushes to `main` deploy to production; other branches get previews. Analytics: Vercel Web Analytics (cookieless, page views only), mounted in `SiteChrome` so the Studio is not tracked.
- Layout: `src/app/layout.tsx` is bare (fonts, theme); site pages live in `src/app/(site)/` and get nav, footer, Lenis and the pen line from `SiteChrome`. URL data (`usePathname`, `params`, `searchParams`) must be read inside `<Suspense>`.
- Primitives: `src/components/motion.tsx` (`Reveal`, `SplitText`), `src/components/ui.tsx` (`ButtonLink`, `LinkArrow`, `Section`, `Chip`, `Marquee`). Copy lives in `src/content/site.ts`.
- All animation must respect `prefers-reduced-motion`. Motion uses `LazyMotion` (`domAnimation`, strict): import `m` from `motion/react-m`, never `motion.*`. Drawn `m.path`s get the `draw` class so they show finished for reduced motion.
- Focus rings take `--ring`, set per surface in `globals.css` (accent on page surfaces, navy on `bg-sky`, `cta-fg` on `bg-cta`). Custom focus styles use `ring-(--ring)`, not `ring-accent`, which vanishes on baby blue in dark mode.
- A `<Suspense>` around URL data needs a `fallback` that renders the default view (see `FullPlotFallback`, `JournalViewFallback`), or the page shifts on hydration.
- Copy: no em dashes; avoid "comprehensive, paradigm, landscape, leverage, robust, nuanced".
- `_private/` holds source material (CV, portrait, about-me.md) and is gitignored. Follow the privacy rules in PLAN.md.

# Personal notes

Personal working preferences live in `CLAUDE.private.md` (gitignored, so they stay out of this public repo):

@CLAUDE.private.md
