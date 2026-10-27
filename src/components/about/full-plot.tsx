"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { about, links } from "@/content/site";

const tags: Record<string, string> = {
  Work: "bg-sky text-on-sky",
  Award: "bg-cta text-cta-fg",
  Study: "bg-sand text-fg",
  Life: "bg-surface text-fg ring-1 ring-line",
};

/**
 * "The full plot": one timeline, read as a story or as a CV. The view lives in the
 * URL (?view=cv) so the CV view can be linked to directly. Each entry is a dot on the
 * pen line. Plot route: entries 20 and up.
 */
export function FullPlot() {
  const params = useSearchParams();
  const cv = params.get("view") === "cv";

  // Next.js syncs useSearchParams with the native History API, so no server round trip.
  const setView = (view: "story" | "cv") => {
    const next = new URLSearchParams(params.toString());
    if (view === "cv") next.set("view", "cv");
    else next.delete("view");
    const s = next.toString();
    window.history.replaceState(null, "", s ? `?${s}` : window.location.pathname);
  };

  return (
    <section aria-labelledby="plot-h" className="container-page relative pb-28 md:pb-36">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-eyebrow text-muted">2019 to now</p>
          <h2 id="plot-h" className="text-headline mt-4">
            The full <em className="text-accent">plot.</em>
          </h2>
        </div>
        <div role="group" aria-label="Read it as" className="inline-flex rounded-full bg-surface p-1 ring-1 ring-line">
          {(["story", "cv"] as const).map((v) => {
            const on = (v === "cv") === cv;
            return (
              <button
                key={v}
                type="button"
                aria-pressed={on}
                onClick={() => setView(v)}
                className={`h-11 rounded-full px-5 text-[0.95rem] font-medium transition-colors ${on ? "bg-cta text-cta-fg" : "text-fg hover:bg-sand"}`}
              >
                Read it as a {v === "cv" ? "CV" : "story"}
              </button>
            );
          })}
        </div>
      </div>

      {cv ? (
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-16">
          <div>
            <h3 className="text-eyebrow mb-2 text-muted">Experience</h3>
            <ol className="border-t border-line-strong">
              {about.roles.map((r, i) => (
                <li key={r.org} className="relative grid gap-x-6 gap-y-2 border-b border-line-strong py-7 pl-3 md:grid-cols-[10.5rem_minmax(0,1fr)] md:pl-0">
                  <span aria-hidden data-plot={20 + i} className="plot-in-l absolute top-9 size-4 -translate-1/2 rounded-full border-4 border-fg bg-plot" />
                  <span className="pt-1 text-sm text-muted">{r.when}</span>
                  <div>
                    <p className="text-[1.375rem] font-semibold">
                      {r.title} · <span className="text-accent">{r.org}</span>
                    </p>
                    <p className="mt-1 text-sm text-muted">{r.meta}</p>
                    <ul className="mt-3.5 list-disc space-y-1 pl-5 leading-relaxed">
                      {r.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[0.8125rem] text-muted">{r.stack}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="flex flex-col gap-8 lg:sticky lg:top-28">
            <div data-plot-surface className="rounded-[1.75rem] bg-sky p-7 text-on-sky">
              <p className="text-eyebrow opacity-75">The short version</p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed">{about.short}</p>
              {/* Navy on baby blue in both themes, so not the theme-flipping primary button. */}
              <a href={links.cv} className="mt-5 inline-flex h-12 items-center rounded-full bg-sky-900 px-6 text-[0.95rem] font-medium text-sand-100 transition hover:opacity-90">
                Download CV (PDF)
              </a>
            </div>
            <div>
              <h3 className="text-eyebrow mb-3 text-muted">Education</h3>
              {about.education.map((e) => (
                <p key={e.title} className="mb-3.5 leading-normal">
                  <strong className="font-semibold">{e.title}</strong>
                  <br />
                  <span className="text-muted">{e.where}</span>
                </p>
              ))}
            </div>
          </aside>
        </div>
      ) : (
        <ol>
          {about.story.map((s, i) => (
            <li key={s.title} className="relative grid gap-x-6 gap-y-2 pb-12 pl-3 md:grid-cols-[8.5rem_minmax(0,40rem)_auto] md:pl-0">
              <span
                aria-hidden
                data-plot={20 + i}
                className={`plot-in-l absolute top-3 size-4 -translate-1/2 rounded-full border-4 border-fg ${s.kind === "Work" || s.kind === "Award" ? "bg-plot" : "bg-bg"}`}
              />
              <span className="text-hand text-[2rem] leading-none text-accent">{s.year}</span>
              <div>
                <h3 className="font-serif text-[clamp(2rem,3.4vw,2.5rem)] leading-none">{s.title}</h3>
                <p className="mt-2.5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-muted">{s.body}</p>
                {"href" in s && s.href && (
                  <Link href={s.href} className="mt-2 inline-flex min-h-11 items-center font-medium text-accent">
                    Case study →
                  </Link>
                )}
              </div>
              <span className={`self-start justify-self-start rounded-full px-3 py-1.5 text-[0.8125rem] md:mt-1 ${tags[s.kind]}`}>{s.kind}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
