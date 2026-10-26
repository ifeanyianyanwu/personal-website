"use client";

import Link from "next/link";
import { useState } from "react";
import { PlotPoint } from "@/components/plot-point";
import { Chip } from "@/components/ui";
import { kinds, type WorkEntry } from "@/lib/work-meta";

const tones = ["bg-sky-300", "bg-sky-200", "bg-sand-200"];

/**
 * The project list: one row per project, each a dot on the plot line (filled when
 * it has a case study). Hovering or focusing a row slides a preview card beside it
 * on wide screens. Plot route: the dots (10 + row), then 90 at the end of the list.
 */
export function WorkList({ work }: { work: WorkEntry[] }) {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState(0);
  const [top, setTop] = useState<number | null>(null);

  const filters = ["All", ...kinds.filter((k) => work.some((w) => w.kinds.includes(k)))];
  const shown = work.filter((w) => filter === "All" || w.kinds.includes(filter as WorkEntry["kinds"][number]));
  const current = shown[Math.min(active, shown.length - 1)];

  // Rows are positioned relative to the wrapper, so offsetTop is already in its coordinates.
  const show = (i: number, row: HTMLElement) => {
    setActive(i);
    setTop(row.offsetTop + row.offsetHeight);
  };

  return (
    <div className="container-page relative pb-32 md:pb-40">
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Chip
            key={f}
            active={filter === f}
            onClick={() => {
              setFilter(f);
              setActive(0);
              setTop(null);
            }}
          >
            {f}
          </Chip>
        ))}
      </div>

      <ol className="mt-10 border-t border-line-strong" onMouseLeave={() => setTop(null)}>
        {shown.map((w, i) => {
          const isStudy = w.status === "case-study";
          const row = (
            <>
              <span className="text-hand text-[1.75rem] text-accent group-hover:text-on-sky group-focus-visible:text-on-sky md:text-[1.875rem]">
                {w.year}
              </span>
              <span className="flex min-w-0 flex-col gap-1.5">
                <span className="font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[0.95]">{w.title}</span>
                <span className="opacity-75">{w.summary}</span>
              </span>
              <span className="text-sm opacity-75">{w.tags.join(" · ")}</span>
              <span className="text-[0.95rem] font-medium md:justify-self-end">
                {isStudy ? "Case study →" : w.status === "nda" ? "Under NDA" : "Notes soon"}
              </span>
            </>
          );
          const rowClass =
            "group grid gap-x-6 gap-y-2 rounded-[1.25rem] py-6 pl-3 transition-colors duration-300 md:grid-cols-[6rem_minmax(0,1fr)_13rem_8.5rem] md:items-center md:px-5 md:py-7";
          return (
            <li
              key={w.slug}
              className="relative border-b border-line-strong"
              onMouseEnter={(e) => show(i, e.currentTarget)}
              onFocus={(e) => show(i, e.currentTarget)}
            >
              <span
                aria-hidden
                data-plot={10 + i}
                className={`plot-in-l absolute top-1/2 size-4 -translate-1/2 rounded-full border-4 border-fg ${isStudy ? "bg-plot" : "bg-bg"}`}
              />
              {isStudy ? (
                <Link href={`/work/${w.slug}`} className={`${rowClass} hover:bg-sky hover:text-on-sky focus-visible:bg-sky focus-visible:text-on-sky`}>
                  {row}
                </Link>
              ) : (
                <div className={rowClass}>{row}</div>
              )}
            </li>
          );
        })}
      </ol>
      <PlotPoint n={90} className="plot-l bottom-16" />

      {current && (
        <aside
          aria-hidden
          className={`pointer-events-none absolute right-[calc(var(--page-pad)+2rem)] hidden w-[22rem] -rotate-2 rounded-[1.75rem] bg-surface p-3.5 shadow-[0_24px_60px_rgba(18,23,29,0.25)] transition-[top,opacity] duration-500 ease-out-expo lg:block ${
            top === null ? "opacity-0" : "opacity-100"
          }`}
          style={{ top: (top ?? 0) - 12 }}
        >
          <div className={`flex h-52 flex-col justify-end gap-2 rounded-[1.125rem] p-5 text-sky-900 ${tones[active % tones.length]}`}>
            <span className="text-eyebrow opacity-70">{current.status === "nda" ? "Under NDA" : current.title}</span>
            <span className="font-serif text-[2rem] leading-[1.05]">{current.result}</span>
          </div>
          <p className="mx-1.5 mt-3 mb-1 text-[0.8125rem] text-muted">{current.summary}</p>
        </aside>
      )}
    </div>
  );
}
