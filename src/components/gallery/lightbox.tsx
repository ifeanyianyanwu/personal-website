"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { monthYear, type PlotPoint } from "@/sanity/types";
import { SanityImage } from "./sanity-image";

/**
 * Native modal dialog: focus trap, Escape to close and an inert page for free.
 * Arrow keys step through the current (filtered) points.
 */
export function Lightbox({ points, index, onIndex }: { points: PlotPoint[]; index: number | null; onIndex: (i: number | null) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const point = index === null ? null : points[index];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (point && !dialog.open) dialog.showModal();
    if (!point && dialog.open) dialog.close();
  }, [point]);

  const step = (by: number) => index !== null && onIndex((index + by + points.length) % points.length);

  return (
    <dialog
      ref={ref}
      data-lenis-prevent
      aria-label={point?.title}
      onClose={() => onIndex(null)}
      onClick={(e) => e.target === e.currentTarget && onIndex(null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="m-auto max-h-[92dvh] w-[min(72rem,calc(100vw-2rem))] overflow-y-auto rounded-[2rem] bg-surface p-0 text-fg backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      {point && (
        <div className="grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="bg-sand">
            <SanityImage image={point.images[0]} sizes="(min-width: 768px) 60vw, 100vw" className="max-h-[80dvh] w-full object-contain" priority />
          </div>
          <div className="flex flex-col gap-4 p-6 md:p-9">
            <p className="text-eyebrow text-muted">
              {point.category} · {monthYear(point.date)}
              {point.location && ` · ${point.location}`}
            </p>
            <h2 className="font-serif text-[clamp(2.25rem,4vw,3.25rem)] leading-[0.95]">{point.title}</h2>
            {point.caption && <p className="text-lede text-muted">{point.caption}</p>}
            {point.recipe && (
              <div className="rounded-2xl bg-sky p-5 text-on-sky">
                <p className="text-hand text-[1.5rem]">how I made it</p>
                <p className="mt-1 whitespace-pre-line">{point.recipe}</p>
              </div>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
              <button type="button" onClick={() => step(-1)} className="h-11 rounded-full px-4 text-sm ring-1 ring-line hover:ring-fg/30">
                ← Previous
              </button>
              <button type="button" onClick={() => step(1)} className="h-11 rounded-full px-4 text-sm ring-1 ring-line hover:ring-fg/30">
                Next →
              </button>
              <Link href={`/gallery/${point.slug}`} className="ml-auto text-sm font-medium text-accent underline underline-offset-4">
                Open page
              </Link>
            </div>
          </div>
          <form method="dialog" className="absolute top-3 right-3">
            <button className="grid size-11 place-items-center rounded-full bg-surface/90 text-lg ring-1 ring-line" aria-label="Close">
              ✕
            </button>
          </form>
        </div>
      )}
    </dialog>
  );
}
