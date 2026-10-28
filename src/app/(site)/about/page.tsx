import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { FullPlot, FullPlotFallback } from "@/components/about/full-plot";
import { Reveal, SplitText } from "@/components/motion";
import { PlotPoint } from "@/components/plot-point";
import { ButtonLink, LinkArrow } from "@/components/ui";
import { about, links, profile } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "How a kid with a screwdriver became a full-stack engineer, plus the CV.",
};

/**
 * Plot route: header 1 and 2, the full plot 20 and up (see `FullPlot`), toolkit 60,
 * awards 70, off the clock 80, end 90.
 */
export default function About() {
  return (
    <>
      <header className="container-page relative grid items-end gap-14 pt-32 pb-20 md:pt-40 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <PlotPoint n={1} className="plot-l top-0" />
        <div className="flex flex-col gap-6">
          <p className="text-eyebrow text-muted">About</p>
          <SplitText as="h1" className="text-display" text={about.headline.lead} accent={about.headline.accent} />
          <p className="text-lede max-w-[44ch] text-muted">{about.lede}</p>
          <Reveal delay={0.3} className="flex flex-wrap gap-3">
            <ButtonLink href={links.cv}>
              <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v11" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 20h14" />
              </svg>
              Download CV (PDF)
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Work with me
            </ButtonLink>
          </Reveal>
        </div>
        <div className="relative flex flex-col items-center gap-4 lg:items-end">
          {/* The note sits on the page background above the portrait, never over it, so it reads in both themes. */}
          <p className="text-hand max-w-[14rem] -rotate-3 text-center text-[1.75rem] text-accent lg:text-right">{about.note}</p>
          <div className="relative h-[340px] w-[270px] overflow-hidden rounded-full bg-sand lg:h-[420px] lg:w-[340px]">
            <Image src={profile.portrait.src} alt={profile.portrait.alt} fill sizes="340px" className="object-cover" priority />
          </div>
        </div>
        <PlotPoint n={2} className="plot-l bottom-0" />
      </header>

      {/* The view (?view=cv) is URL data, so the timeline renders inside Suspense. */}
      <Suspense fallback={<FullPlotFallback />}>
        <FullPlot />
      </Suspense>

      <section aria-labelledby="kit-h" className="bg-sand">
        <div className="container-page relative py-28 md:py-32">
          <PlotPoint n={60} className="plot-l top-0" />
          <p className="text-eyebrow text-muted">Toolkit</p>
          <h2 id="kit-h" className="text-headline mt-4">
            Mise en <em className="text-accent">place.</em>
          </h2>
          <p className="text-lede mt-5 max-w-[52ch] text-muted">
            Everything prepped before the cooking starts. What I reach for, and what I&apos;m still learning.
          </p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.kit.map((k) => (
              <li
                key={k.label}
                {...("learning" in k ? { "data-plot-surface": "" } : {})}
                className={`rounded-[1.75rem] p-6 pb-7 ${"learning" in k ? "bg-sky text-on-sky" : "bg-surface ring-1 ring-line"}`}
              >
                <h3 className="text-hand text-[1.75rem] leading-none">{k.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {k.items.map((i) => (
                    <li key={i} className={`rounded-full px-3 py-1.5 text-sm ${"learning" in k ? "bg-white/55" : "bg-bg"}`}>
                      {i}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="record-h" className="container-page relative py-28 md:py-36">
        <PlotPoint n={70} className="plot-l top-0" />
        <p className="text-eyebrow text-muted">Education &amp; awards</p>
        <h2 id="record-h" className="text-headline mt-4 mb-12">
          On the <em className="text-accent">record.</em>
        </h2>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
          <article data-plot-surface className="flex min-h-72 flex-col justify-between gap-8 rounded-[2rem] bg-sky p-8 text-on-sky">
            <p className="text-eyebrow opacity-75">CodeSprintMT 2026 · Jul 2026</p>
            <div>
              <p className="font-serif text-[clamp(4.5rem,8vw,6.5rem)] leading-[0.85]">Top 10</p>
              <p className="mt-3 leading-normal">
                Open Category. Solo, one day: a contactless charity donation platform on the Mastercard sandbox.
              </p>
              <LinkArrow href="/work/codesprintmt" className="mt-3 min-h-11 text-current">
                Read the case study
              </LinkArrow>
            </div>
          </article>
          <Record eyebrow="BSc (Hons) Computer Science" lead="First" accent="Class.">
            University of Wolverhampton, delivered by STC Higher Education, Malta. Awarded July 2026.
          </Record>
          <Record eyebrow="Advanced Diploma, Software Engineering" accent="Distinction.">
            Aptech Computer Education, Nigeria. May 2020 to Feb 2023.
          </Record>
        </div>
      </section>

      <section className="container-page relative grid gap-12 pb-32 md:pb-40 lg:grid-cols-2 lg:gap-16">
        <PlotPoint n={80} className="plot-l top-0" />
        <div>
          <p className="text-eyebrow text-muted">Off the clock</p>
          <h2 className="mt-4 font-serif text-[clamp(3rem,5vw,4rem)] leading-[0.95]">
            For the <em className="text-accent">plot.</em>
          </h2>
          <p className="text-lede mt-5 max-w-[44ch] text-muted">
            I plan my weeks carefully, then leave room to say yes to the unexpected. Most of the good stories start there.
          </p>
          <ul className="mt-7 border-t border-line-strong">
            {about.life.map((l) => (
              <li key={l.what} className="flex items-baseline justify-between gap-4 border-b border-line-strong py-4 text-lg">
                <span>{l.what}</span>
                <span className="text-hand shrink-0 text-2xl text-accent">{l.note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-muted">{about.faith}</p>
          <dl aria-label="Mottos" className="mt-8 flex flex-col gap-5">
            {about.mottos.map((m) => (
              <div key={m.latin}>
                <dt lang="la" className="font-serif text-[2rem] leading-none text-accent italic">
                  {m.latin}
                </dt>
                <dd className="mt-1.5 text-muted">{m.meaning}</dd>
              </div>
            ))}
          </dl>
          <LinkArrow href="/gallery" className="mt-3 min-h-11">
            See the plot points
          </LinkArrow>
        </div>
        <div className="flex flex-col justify-between gap-8 rounded-[2rem] bg-cta p-9 text-cta-fg md:p-11">
          <p className="text-eyebrow opacity-80">What&apos;s next</p>
          <p className="font-serif text-[clamp(2.5rem,4vw,3.25rem)] leading-none">
            {about.next.lead} <em>{about.next.accent}</em>
          </p>
          <p className="text-[1.0625rem] leading-relaxed opacity-85">{about.next.body}</p>
          <a
            href="#contact"
            className="inline-flex h-12 items-center self-start rounded-full bg-bg px-6 text-[0.95rem] font-medium text-fg transition hover:opacity-90"
          >
            Work with me
          </a>
        </div>
        <PlotPoint n={90} className="plot-l bottom-16" />
      </section>
    </>
  );
}

function Record({ eyebrow, lead, accent, children }: { eyebrow: string; lead?: string; accent: string; children: React.ReactNode }) {
  return (
    <article className="flex min-h-72 flex-col justify-between gap-8 rounded-[2rem] bg-surface p-8 ring-1 ring-line">
      <p className="text-eyebrow text-muted">{eyebrow}</p>
      <div>
        <p className="font-serif text-[clamp(3.25rem,5vw,4rem)] leading-[0.9]">
          {lead && `${lead} `}
          <em className="text-accent">{accent}</em>
        </p>
        <p className="mt-3 leading-normal text-muted">{children}</p>
      </div>
    </article>
  );
}
