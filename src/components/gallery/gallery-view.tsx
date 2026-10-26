"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Chip } from "@/components/ui";
import { categories, dayNumber, monthYear, type PlotPoint } from "@/sanity/types";
import { Lightbox } from "./lightbox";
import { SanityImage } from "./sanity-image";

const tones = ["bg-sky-300 text-sky-900", "bg-sand-200 text-ink", "bg-sky-200 text-sky-900", "bg-sky-900 text-sand-100"];

/**
 * "Plot points": search and category filters plus a scatter ⇄ grid toggle, all kept in
 * the URL (?q=&cat=&view=) so a filtered view can be shared. Filtering runs in the
 * browser; the whole feed is small and already cached.
 */
export function GalleryView({ points }: { points: PlotPoint[] }) {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const cat = params.get("cat") ?? "All";
  const view = params.get("view") === "grid" ? "grid" : "scatter";
  const [open, setOpen] = useState<number | null>(null);

  // Next.js syncs useSearchParams with the native History API, so no server round trip.
  const setParam = (key: string, value: string, fallback: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === fallback) next.delete(key);
    else next.set(key, value);
    const s = next.toString();
    window.history.replaceState(null, "", s ? `?${s}` : window.location.pathname);
  };

  const used = categories.filter((c) => points.some((p) => p.category === c));
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return points.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (!needle) return true;
      const hay = [p.title, p.category, p.location, p.caption, monthYear(p.date), ...(p.tags ?? [])].join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [points, q, cat]);

  return (
    <>
      <div className="z-30 border-y border-line bg-bg/90 backdrop-blur-xl md:sticky md:top-16">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3.5">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <label className="flex h-11 w-[18.75rem] max-w-full items-center gap-2.5 rounded-full bg-surface px-4 text-muted ring-1 ring-line focus-within:ring-2 focus-within:ring-accent">
              <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <span className="sr-only">Search plot points</span>
              <input
                type="search"
                defaultValue={q}
                onChange={(e) => setParam("q", e.target.value, "")}
                placeholder="Search dishes, sketches, places..."
                className="min-w-0 flex-1 bg-transparent text-[0.95rem] text-fg outline-none placeholder:text-muted"
              />
            </label>
            <div role="group" aria-label="Filter by category" className="-mx-[var(--page-pad)] flex gap-1.5 overflow-x-auto px-[var(--page-pad)] md:mx-0 md:flex-wrap md:px-0">
              {["All", ...used].map((c) => (
                <Chip key={c} active={cat === c} onClick={() => setParam("cat", c, "All")}>
                  {c}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p aria-live="polite" className="text-sm text-muted">
              {shown.length} {shown.length === 1 ? "point" : "points"}
            </p>
            <div role="group" aria-label="View" className="hidden rounded-full bg-surface p-1 ring-1 ring-line md:inline-flex">
              {(["scatter", "grid"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setParam("view", v, "scatter")}
                  className="h-9 rounded-full px-4 text-sm font-medium capitalize transition aria-pressed:bg-cta aria-pressed:text-cta-fg"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-page pt-10 pb-32 md:pb-40">
        {shown.length === 0 ? (
          <p className="font-serif text-[2rem] text-muted">
            {points.length === 0 ? "The first plot points are on their way." : "Nothing plotted here yet. Try another word or category."}
          </p>
        ) : (
          <>
            {view === "scatter" && <Scatter points={shown} rows={used} onOpen={setOpen} />}
            <Grid points={shown} onOpen={setOpen} className={view === "scatter" ? "md:hidden" : ""} />
          </>
        )}
      </div>

      <Lightbox points={shown} index={open} onIndex={setOpen} />
    </>
  );
}

/** Points placed by date (x) and category (row), joined in date order by the pen line. Desktop only. */
function Scatter({ points, rows, onOpen }: { points: PlotPoint[]; rows: readonly string[]; onOpen: (i: number) => void }) {
  // The line is drawn in pixels (not a stretched viewBox) so its draw-on animation stays one clean stroke.
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const days = points.map((p) => dayNumber(p.date));
  const min = Math.min(...days);
  const max = Math.max(...days);
  const span = Math.max(max - min, 1);
  const rowH = 76 / Math.max(rows.length, 1);

  const placed = points
    .map((p, i) => ({
      p,
      i,
      x: points.length === 1 ? 55 : 16 + ((days[i] - min) / span) * 76,
      y: 14 + rows.indexOf(p.category) * rowH + rowH / 2 + ((i % 3) - 1) * rowH * 0.18,
    }))
    .sort((a, b) => a.x - b.x);
  const d = placed.map((s, i) => `${i ? "L" : "M"} ${((s.x * size.w) / 100).toFixed(1)} ${((s.y * size.h) / 100).toFixed(1)}`).join(" ");

  return (
    <div ref={box} className="relative hidden h-[47.5rem] overflow-hidden rounded-[2rem] bg-surface ring-1 ring-line md:block">
      {rows.map((r, i) => (
        <div key={r} className="absolute inset-x-0 border-t border-dashed border-line" style={{ top: `${14 + i * rowH}%` }}>
          <span className="text-eyebrow absolute top-2 left-5 text-muted">{r}</span>
        </div>
      ))}
      <svg aria-hidden width={size.w} height={size.h} className="absolute inset-0">
        {size.w > 0 && (
          <motion.path
            key={placed.map((s) => s.p._id).join()} // redraw when the filter changes, not on resize
            d={d}
            fill="none"
            className="stroke-plot"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </svg>
      {placed.map(({ p, i, x, y }) => (
        <a
          key={p._id}
          href={`/gallery/${p.slug}`}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey) return;
            e.preventDefault();
            onOpen(i);
          }}
          className="group absolute size-[6.5rem] overflow-hidden rounded-[1.125rem] shadow-[0_8px_24px_rgba(31,58,86,0.12)] transition-transform duration-300 ease-out-expo hover:z-10 hover:scale-110 focus-visible:z-10 focus-visible:scale-110"
          style={{ left: `calc(${x}% - 3.25rem)`, top: `calc(${y}% - 3.25rem)`, rotate: `${((i * 37) % 11) - 5}deg` }}
        >
          <SanityImage image={p.images[0]} sizes="104px" className="size-full object-cover" />
          <span className="sr-only">
            {p.title}, {p.category}, {monthYear(p.date)}
          </span>
        </a>
      ))}
      <span className="absolute bottom-3.5 left-5 text-[0.8125rem] text-muted">{monthYear(placed[0].p.date)}</span>
      {max > min && (
        <span className="absolute right-5 bottom-3.5 text-[0.8125rem] text-muted">{monthYear(placed[placed.length - 1].p.date)}</span>
      )}
    </div>
  );
}

/** Masonry columns, newest first. */
function Grid({ points, onOpen, className = "" }: { points: PlotPoint[]; onOpen: (i: number) => void; className?: string }) {
  return (
    <div className={`columns-[16rem] gap-5 ${className}`}>
      {points.map((p, i) => (
        <figure key={p._id} className="mb-5 flex break-inside-avoid flex-col gap-2.5">
          <a
            href={`/gallery/${p.slug}`}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey) return;
              e.preventDefault();
              onOpen(i);
            }}
            className={`block overflow-hidden rounded-3xl ${tones[i % tones.length]}`}
          >
            <SanityImage
              image={p.images[0]}
              sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 100vw"
              className="h-auto w-full transition-transform duration-500 ease-out-expo hover:scale-[1.03]"
            />
          </a>
          <figcaption className="flex justify-between gap-3 px-1 text-[0.8125rem] text-muted">
            <span>
              <span className="font-medium text-fg">{p.title}</span> · {p.category}
              {p.location && ` · ${p.location}`}
            </span>
            <span className="shrink-0">{monthYear(p.date)}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
