import type { Metadata } from "next";
import { Suspense } from "react";
import { JournalSearch, JournalSearchFallback, JournalView, JournalViewFallback } from "@/components/journal/journal-view";
import { SplitText } from "@/components/motion";
import { PlotPoint } from "@/components/plot-point";
import { stove } from "@/content/site";
import { getJournal } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "What I learn building things, written down while it's fresh.",
  alternates: { types: { "application/rss+xml": "/journal/rss.xml" } },
};

/** Plot route: header 1 and 2, posts 10 and up (see `JournalView`), drafts 50 and up, end 90. */
export default async function Journal() {
  const posts = await getJournal();

  return (
    <>
      <header className="container-page relative flex flex-wrap items-end justify-between gap-8 pt-32 pb-10 md:pt-40">
        <PlotPoint n={1} className="plot-l top-0" />
        <div>
          <p className="text-eyebrow text-muted">Journal</p>
          <SplitText as="h1" className="text-display mt-5" text="Notes from" accent="the plot." />
          <p className="text-lede mt-6 max-w-[46ch] text-muted">
            What I learn building things, written down while it&apos;s fresh. Short, practical, and only claims I can
            point to.
          </p>
        </div>
        <div className="flex w-full max-w-[22.5rem] flex-col items-start gap-3 md:items-end">
          {/* Search params are URL data, so the search box and the list render inside Suspense. */}
          <Suspense fallback={<JournalSearchFallback />}>
            <JournalSearch />
          </Suspense>
          <a href="/journal/rss.xml" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent">
            <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1.4" />
            </svg>
            RSS feed
          </a>
        </div>
        <PlotPoint n={2} className="plot-l bottom-0" />
      </header>

      <Suspense fallback={<JournalViewFallback posts={posts} />}>
        <JournalView posts={posts} />
      </Suspense>

      <div className="container-page relative pb-32 md:pb-40">
        {stove.length > 0 && (
          <section aria-labelledby="stove" className="mt-24">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2 id="stove" className="font-serif text-[clamp(2.75rem,5vw,3.5rem)] leading-none">
                On the <em className="text-accent">stove.</em>
              </h2>
              <p className="text-muted">Drafts I&apos;m working on. Not links yet.</p>
            </div>
            <ol className="border-t border-line-strong">
              {stove.map((d, i) => (
                <li
                  key={d.title}
                  className="relative grid gap-x-6 gap-y-1 border-b border-line-strong py-5 pl-3 md:grid-cols-[8rem_minmax(0,1fr)_10rem] md:items-center md:px-5"
                >
                  <span
                    aria-hidden
                    data-plot={50 + i}
                    className="plot-in-l absolute top-1/2 size-4 -translate-1/2 rounded-full border-2 border-dashed border-fg bg-bg"
                  />
                  <span className="text-hand text-[1.5rem] text-muted">Drafting</span>
                  <span className="font-serif text-[clamp(1.875rem,3.4vw,2.5rem)] leading-none">{d.title}</span>
                  <span className="text-sm text-muted md:justify-self-end">{d.tag}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
        <PlotPoint n={90} className="plot-l bottom-16" />
      </div>
    </>
  );
}
