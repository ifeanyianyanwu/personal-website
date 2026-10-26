"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Point = { x: number; y: number };
type Rect = { x: number; y: number; w: number; h: number };
type Geo = { pts: Point[]; segs: string[]; w: number; h: number; surfaces: Rect[] };

/** Smooth path through every point (Catmull-Rom as cubic Béziers), one segment per gap. */
function toSegments(pts: Point[]) {
  const segs: string[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    segs.push(`C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`);
  }
  return segs;
}

/** Scroll distance (px) spent per px of line that doesn't move down the page (loops, sideways runs). */
const SIDEWAYS_COST = 0.3;

/**
 * The signature pen line. Joins every `PlotPoint` inside the parent element and
 * draws itself in step with the scroll. Over `[data-plot-surface]` (baby blue)
 * sections it switches to navy so it stays visible in both themes. Fully drawn
 * for reduced motion.
 */
export function PlotLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const navyRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const reduce = useReducedMotion();
  const clipId = useId();

  // Measure points and surfaces relative to the wrapper; re-measure on resize, font load and content change (route change).
  useEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;
    const measure = () => {
      const box = host.getBoundingClientRect();
      const rel = (el: Element) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height };
      };
      const pts = [...host.querySelectorAll<HTMLElement>("[data-plot]")]
        .filter((el) => el.getClientRects().length > 0) // skip points hidden at this breakpoint
        .map((el) => {
          const r = rel(el);
          return { n: Number(el.dataset.plot), x: r.x + r.w / 2, y: r.y + r.h / 2 };
        })
        .sort((a, b) => a.n - b.n);
      const surfaces = [...host.querySelectorAll("[data-plot-surface]")].map(rel);
      setGeo(pts.length < 2 ? null : { pts, segs: toSegments(pts), w: box.width, h: box.height, surfaces });
    };
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), measure()));
    };
    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(host);
    // Reading the pathname would need Suspense here, so watch the page content instead.
    // Ignore the line's own SVG (its probe path would otherwise re-trigger this forever).
    const mo = new MutationObserver((records) => {
      if (records.some((r) => !svgRef.current?.contains(r.target))) schedule();
    });
    mo.observe(host, { childList: true, subtree: true });
    document.fonts?.ready.then(measure);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const navy = navyRef.current;
    const svg = svgRef.current;
    if (!geo || !path || !navy || !svg) return;

    const total = path.getTotalLength();
    for (const p of [path, navy]) p.style.strokeDasharray = `${total}`;

    // Schedule each waypoint: it is reached when the target line passes its y, but never
    // sooner than the previous waypoint plus a share of scroll for the line in between.
    // Loops and sideways runs therefore draw progressively instead of all at once.
    const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.appendChild(probe);
    const lens = [0];
    const at = [geo.pts[0].y];
    geo.segs.forEach((seg, i) => {
      const a = geo.pts[i];
      probe.setAttribute("d", `M ${a.x} ${a.y} ${seg}`);
      const segLen = probe.getTotalLength();
      lens.push(lens[i] + segLen);
      at.push(Math.max(geo.pts[i + 1].y, at[i] + segLen * SIDEWAYS_COST));
    });
    probe.remove();

    const inSurface = (x: number, y: number) =>
      geo.surfaces.some((r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h);

    const render = (len: number) => {
      for (const p of [path, navy]) p.style.strokeDashoffset = `${total - len}`;
      const tip = path.getPointAtLength(len);
      const t = tipRef.current;
      if (!t) return;
      t.setAttribute("cx", `${tip.x}`);
      t.setAttribute("cy", `${tip.y}`);
      t.setAttribute("class", inSurface(tip.x, tip.y) ? "fill-on-sky" : "fill-plot");
    };

    // The target line starts near the top of the screen and ends near the bottom by
    // the end of the page, so the line starts almost undrawn and finishes on the last point.
    const lengthForScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 1;
      if (progress >= 0.999) return total;
      const target = window.innerHeight * (0.45 + 0.4 * progress) - svg.getBoundingClientRect().top;
      if (target <= at[0]) return 0;
      for (let i = 1; i < at.length; i++) {
        if (target < at[i]) {
          const f = (target - at[i - 1]) / Math.max(at[i] - at[i - 1], 1);
          return lens[i - 1] + f * (lens[i] - lens[i - 1]);
        }
      }
      return total;
    };

    if (reduce) {
      render(total);
      return;
    }

    // Lenis already smooths the scroll, so the line follows it directly (no second easing).
    let frame = 0;
    const update = () => {
      frame = 0;
      render(lengthForScroll());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [geo, reduce]);

  const d = geo ? `M ${geo.pts[0].x} ${geo.pts[0].y} ${geo.segs.join(" ")}` : "";

  return (
    <svg
      ref={svgRef}
      aria-hidden
      width={geo?.w ?? 0}
      height={geo?.h ?? 0}
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
    >
      {geo && (
        <>
          <defs>
            <clipPath id={clipId}>
              {geo.surfaces.map((r, i) => (
                <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} />
              ))}
            </clipPath>
          </defs>
          <path ref={pathRef} d={d} fill="none" className="stroke-plot" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          <path
            ref={navyRef}
            d={d}
            fill="none"
            className="stroke-on-sky"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath={`url(#${clipId})`}
          />
          <circle ref={tipRef} r={6} className="fill-plot" />
        </>
      )}
    </svg>
  );
}
