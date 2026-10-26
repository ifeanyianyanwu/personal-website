"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Point = { x: number; y: number };
type Rect = { x: number; y: number; w: number; h: number };
type Geo = { d: string; w: number; h: number; surfaces: Rect[] };

/** Smooth path through every point (Catmull-Rom converted to cubic Béziers). */
function toPath(pts: Point[]) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/**
 * The signature pen line. Joins every `PlotPoint` inside the parent element and
 * draws itself as you scroll. Over `[data-plot-surface]` (baby blue) sections it
 * switches to navy so it stays visible in both themes. Fully drawn for reduced motion.
 */
export function PlotLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const navyRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const clipId = useId();

  // Measure points and surfaces relative to the wrapper; re-measure on resize, font load and route change.
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
      setGeo(pts.length < 2 ? null : { d: toPath(pts), w: box.width, h: box.height, surfaces });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [pathname]);

  useEffect(() => {
    const path = pathRef.current;
    const navy = navyRef.current;
    const svg = svgRef.current;
    if (!geo || !path || !navy || !svg) return;

    const total = path.getTotalLength();
    // Sample the path once. `reach` is the deepest y reached so far, so loops and
    // sideways runs never un-draw; they get revealed as one stretch and eased in below.
    const lens: number[] = [];
    const reach: number[] = [];
    let deepest = -Infinity;
    for (let len = 0; len <= total; len += 6) {
      deepest = Math.max(deepest, path.getPointAtLength(len).y);
      lens.push(len);
      reach.push(deepest);
    }
    for (const p of [path, navy]) p.style.strokeDasharray = `${total}`;

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

    // Where the tip should be: starts near the top of the screen, ends just above the
    // bottom by the end of the page, so the line starts almost undrawn and finishes on the email dot.
    const goal = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 1;
      const target = window.innerHeight * (0.2 + 0.65 * progress) - svg.getBoundingClientRect().top;
      const i = reach.findIndex((y) => y > target);
      return i === -1 ? total : lens[i];
    };

    if (reduce) {
      render(total);
      return;
    }

    // Ease the drawn length toward the goal each frame so jumps become pen strokes.
    let drawn = Math.min(goal(), 1);
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const target = goal();
      const k = 1 - Math.pow(1 - 0.09, dt / 16.7);
      drawn += (target - drawn) * k;
      if (Math.abs(target - drawn) < 0.5) drawn = target;
      render(drawn);
      frame = drawn === target ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    render(drawn);
    wake();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, [geo, reduce]);

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
          <path ref={pathRef} d={geo.d} fill="none" className="stroke-plot" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          <path
            ref={navyRef}
            d={geo.d}
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
