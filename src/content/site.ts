// Single source of truth for site copy, matching the approved canvas ("The Plot").
// Voice rules live in PLAN.md (no em dashes). The CV is the source of truth for facts.

export const profile = {
  name: "Ifeanyi Anyanwu",
  role: "Full-Stack Engineer",
  location: "Malta",
  headline: { lead: "I build things that work, then I make them", accent: "good." },
  glance: ["Full-stack engineer", "3+ years", "Next.js · NestJS · TypeScript", "Malta, open to remote"],
  intro:
    "Full-stack engineer in Malta. 3+ years shipping Next.js, NestJS and TypeScript. Also: pasta, chess, and a sketchbook I'm reopening.",
  note: "that's me, probably thinking about the next dish I want to cook",
  signature: "For the plot.",
  email: "anyanwuifeanyi001@gmail.com",
  portrait: { src: "/images/portrait.jpg", alt: "Portrait of Ifeanyi Anyanwu" },
};

export const links = {
  linkedin: "https://www.linkedin.com/in/ifeanyianyanwu",
  github: "https://github.com/ifeanyianyanwu",
};

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Plot points", href: "/gallery" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
] as const;

export const marquee = [
  "Ships on time",
  "Cooks on weekends",
  "Learning chess",
  "Reopening the sketchbook",
  "Says yes, for the plot",
] as const;

export const timeline = [
  { year: "2019", label: "Pharmacy wasn't it" },
  { year: "2020", label: "A mentor, then Aptech" },
  { year: "2022", label: "First production code" },
  { year: "2025", label: "Moved to Malta" },
  { year: "2026", label: "First Class · Top 10" },
] as const;

export const proof = [
  { value: "1.5s", label: "load time, down from 9 to 15s" },
  { value: "75%", label: "test coverage, built from zero" },
  { value: "Top 10", label: "CodeSprintMT 2026, solo, one day" },
  { value: "3+ yrs", label: "shipping TypeScript in production" },
] as const;

/** Project facts in recipe-card form: Serves · Prep · Ingredients · Result. */
export const recipes = [
  {
    slug: "deimr",
    name: "DEIMR",
    eyebrow: "DEIMR · Marketplace · 2023",
    headline: "Fast is a feature.",
    serves: "~1,000 users, storefront and dashboard",
    prep: "2023 · sole frontend developer",
    ingredients: "Next.js, React.lazy + Suspense, WebP, caching",
    result: { value: "1.5s", note: "page load, from 9 to 15s" },
    footnote:
      "Measured with Lighthouse before and after route-level code-splitting, WebP images and Next.js caching.",
    flagship: true,
  },
  {
    slug: "connecthub",
    name: "ConnectHub",
    eyebrow: "ConnectHub · AI matching · 2025 to 2026",
    headline: "Interests over identity.",
    serves: "People looking for others who share a hobby",
    prep: "Oct 2025 to Apr 2026",
    ingredients: "Next.js, Supabase, Gemini embeddings, Jaccard similarity",
    result: { value: "60/40", note: "hybrid matching" },
    flagship: false,
  },
  {
    slug: "codesprintmt",
    name: "CodeSprintMT 2026",
    eyebrow: "CodeSprintMT 2026 · Hackathon",
    headline: "One day. One API. Top 10.",
    serves: "Charity donors, contactless",
    prep: "One day, solo",
    ingredients: "Mastercard sandbox, OAuth 1.0a, RSA-SHA256, .p12 keystores",
    result: { value: "Top 10", note: "Open Category" },
    flagship: false,
  },
] as const;

export const chapters = [
  {
    id: "screwdrivers",
    num: "01",
    title: "Screwdrivers first.",
    body: "I took gadgets apart, fixed extension cords and built toy fans from small motors. Pharmacy was the expected path and microbiology the fallback. A mentor pointed me to software, and I chose the thing I loved.",
  },
  {
    id: "shipping",
    num: "02",
    title: "Shipping since 2022.",
    body: "Fintech, marketplaces, events and education, from the interface to the API behind it. I also waited tables, where I was the one they called for the heavy lifting. Pace and people, learned early.",
  },
  {
    id: "plot",
    num: "03",
    title: "For the plot.",
    body: "I plan my weeks carefully and still say yes to the unexpected. Pasta, the chess club, tennis, the sketchbook.",
    // TODO(Ifeanyi): add the "say yes" story (2 to 3 sentences).
  },
] as const;

export const faq = [
  { q: "Where are you based?", a: "Malta, and open to remote roles." },
  {
    q: "What is your stack?",
    a: "TypeScript end to end: Next.js and React on the front, NestJS and Node on the back, Postgres (Supabase) or MongoDB for data, and Python for machine learning.",
  },
  {
    q: "Do you design too?",
    a: "On my own projects, yes, from the first sketch to the shipped UI. On a team, I'm the engineer who cares how it feels.",
  },
  { q: "What are you looking for?", a: "Engineering roles and collaborations, especially in AI and health." },
  { q: "Do you actually cook?", a: "Yes. Mostly pasta, and anything that involves a chopping board." },
  // TODO(Ifeanyi): "What does 'for the plot' mean?" once the story is in.
] as const;

export const contact = {
  eyebrow: "Work with me",
  headline: { lead: "Building something for health or AI?", accent: "Let's talk." },
  body: "Open to engineering roles and collaborations. Or just say hi, for the plot.",
};
