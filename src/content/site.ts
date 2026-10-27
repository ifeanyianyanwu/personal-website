import type { ComponentProps } from "react";
import type { Compare } from "@/components/work/compare";

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
  /** Built from the CV without phone, location or placeholders. Re-export when the CV changes. */
  cv: "/cv/ifeanyi-anyanwu-cv.pdf",
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

export type Recipe = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  serves: string;
  prep: string;
  ingredients: string;
  result: { value: string; note: string };
  footnote?: string;
  flagship?: boolean;
  /** Flagship only: a before/after diagram wipe (see `components/work/diagrams.tsx`). */
  compare?: ComponentProps<typeof Compare>;
  /** Flagship only: the plotted result. `down` = lower is better. */
  chart?: { label: string; from: string; to: string; trend: "down" | "up" };
};

/** Project facts in recipe-card form: Serves · Prep · Ingredients · Result. */
export const recipes: Recipe[] = [
  {
    slug: "deimr",
    name: "DEIMR",
    eyebrow: "DEIMR · Marketplace · 2023",
    headline: "Fast is a feature.",
    serves: "~1,000 users, storefront and dashboard",
    prep: "2023 · sole storefront engineer",
    ingredients: "Next.js, React.lazy + Suspense, WebP, caching",
    result: { value: "1.5s", note: "page load, from 9 to 15s" },
    footnote:
      "Measured with Lighthouse before and after route-level code-splitting, WebP images and Next.js caching.",
    flagship: true,
    compare: {
      label: "Compare DEIMR's architecture before and after the move to Next.js",
      before: { label: "Before · React", note: "9 to 15s", diagram: "deimr-before" },
      after: { label: "After · Next.js", note: "~1.5s", diagram: "deimr-after" },
    },
    chart: { label: "Load time", from: "9 to 15s", to: "~1.5s", trend: "down" },
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
  },
];

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

/** Journal drafts in progress ("On the stove"). Listed on /journal, not linked. Remove one when its post ships. */
export const stove = [
  { title: "One day, one hackathon, one API", tag: "Hackathons" },
  { title: "Small beats perfect", tag: "Craft" },
  { title: "Why interest beats identity in networking", tag: "Research" },
  { title: "From microbiology to machine learning", tag: "Career" },
] as const;

/** /about. Roles, titles and dates come from the CV; story from the profile. */
export const about = {
  headline: { lead: "The longer", accent: "version." },
  lede: "Full-stack engineer in Malta, building toward AI for health in Nigeria. Here's how I got here, and the CV if you'd rather skim.",
  note: "screwdrivers first, code second",
  short:
    "3+ years shipping production TypeScript. Frontend-strong, with NestJS, Node and Express on the back. First Class BSc, top 10 at CodeSprintMT 2026.",
  story: [
    { year: "Early", kind: "Life", title: "Screwdrivers first.", body: "Growing up in Nigeria, I took gadgets apart, fixed extension cords and built toy fans from small motors." },
    { year: "2019", kind: "Study", title: "Not pharmacy.", body: "Pharmacy was the expected path. When it didn't happen, I started microbiology instead." },
    { year: "2020", kind: "Study", title: "A mentor, then Aptech.", body: "Covid closed everything. A senior engineer pointed me to software, and I chose the thing I loved. Advanced Diploma, Distinction." },
    { year: "2022", kind: "Work", title: "First production code.", body: "Meksoft: straight into a live React codebase, learning on the fly. The transcript system I helped build is still used by a university today.", href: "/work/meksoft" },
    { year: "2023", kind: "Work", title: "Fast is a feature.", body: "DEIMR: moved a live marketplace from React to Next.js and took page loads from 9 to 15s down to about 1.5s. Mentored two interns.", href: "/work/deimr" },
    { year: "2024", kind: "Work", title: "Cards, wallets, tests.", body: "MoneyPigeon: built a pre-launch crypto lending platform with virtual debit cards from scratch, helped shape its product and design, and took tests from 0% to 75%.", href: "/work/moneypigeon" },
    { year: "Along the way", kind: "Life", title: "Pace and people.", body: "I also waited tables. I was usually the one they called for the heavy lifting." },
    { year: "2025", kind: "Life", title: "Malta.", body: "Moved to finish my degree and started ConnectHub, my final-year project. Screen Guide and BabaPlug went live the same year.", href: "/work/connecthub" },
    { year: "2026", kind: "Award", title: "First Class. Top 10.", body: "Graduated with First Class Honours, placed top 10 solo at CodeSprintMT, joined the chess club, and started full time at LetsDap.", href: "/work/codesprintmt" },
  ],
  roles: [
    {
      when: "Oct 2026 to now",
      title: "Full-Stack Engineer",
      org: "LetsDap",
      meta: "Malta, remote · full-time · events platform",
      points: ["Build and maintain NestJS APIs in TypeScript, with Docker for local development.", "Ship features end to end, from API integration to the frontend UI."],
      stack: "NestJS · TypeScript · Docker · Jira",
    },
    {
      when: "Mar 2024 to Oct 2025",
      title: "Software Engineer",
      org: "MoneyPigeon",
      meta: "Remote · contract · pre-launch crypto lending, team of 7",
      points: ["Built the product from scratch in Next.js: wallet sign-in, lending and borrowing flows.", "Integrated APIs for authentication and virtual debit card issuance.", "Shaped product and design direction with the CEO and designer.", "Wrote the test suite from scratch: 0% to 75% coverage, with CI on every pull request."],
      stack: "Next.js · TypeScript · Jest · React Testing Library · GitHub Actions",
    },
    {
      when: "Feb 2023 to Jan 2024",
      title: "Frontend Engineer",
      org: "DEIMR",
      meta: "Cyprus, remote · full-time · electronics marketplace",
      points: ["Page load from 9 to 15s down to ~1.5s (Lighthouse).", "Migrated React to Next.js; sole developer of the storefront and dashboard (~1,000 users).", "Interviewed, onboarded and mentored 2 frontend interns."],
      stack: "Next.js · React · WebP · code-splitting",
    },
    {
      when: "May 2022 to Dec 2022",
      title: "Frontend Engineer",
      org: "Meksoft",
      meta: "Enugu, Nigeria · contract · transcript management",
      points: ["Student and admin dashboards in React and TypeScript, live at 1 university.", "Replaced a weeks-long manual transcript process; Credo payments."],
      stack: "React · TypeScript · REST · Credo",
    },
  ],
  education: [
    { title: "BSc (Hons) Computer Science, First Class", where: "University of Wolverhampton, via STC Malta · 2026" },
    { title: "Advanced Diploma in Software Engineering, Distinction", where: "Aptech, Nigeria · 2020 to 2023" },
  ],
  kit: [
    { label: "Languages", items: ["TypeScript", "JavaScript", "HTML", "CSS", "Python"] },
    { label: "Frontend", items: ["React", "Next.js", "Redux", "Tailwind", "Lighthouse"] },
    { label: "Backend & data", items: ["Node.js", "NestJS", "Express", "REST", "MongoDB", "Supabase", "Sanity"] },
    { label: "Testing & delivery", items: ["Jest", "React Testing Library", "GitHub Actions", "Vercel", "Docker"] },
    { label: "Integrations", items: ["Mastercard API", "OAuth 1.0a", "Credo", "Web3 wallets", "Google Analytics API"] },
    { label: "Learning now", items: ["Machine learning", "scikit-learn", "XGBoost", "Robotics", "Docker, deeper"], learning: true },
  ],
  life: [
    { what: "Pasta, and anything with a chopping board", note: "cooking" },
    { what: "Chess club", note: "learning" },
    { what: "Lawn tennis", note: "learning" },
    { what: "The sketchbook", note: "reopening" },
    { what: "Music, all over the place", note: "always on" },
  ],
  faith: "Jesus is King, and I've made it this far because of Him.",
  next: {
    lead: "AI that helps people eat, heal and live better,",
    accent: "starting in Nigeria.",
    body: "Going deeper into machine learning and robotics for healthcare, one small improvement at a time. If you're building in health or AI, I'd love to hear about it.",
  },
};
