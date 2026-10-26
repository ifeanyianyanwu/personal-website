/**
 * An invisible waypoint for the plot line. `PlotLine` joins every point on the
 * page in ascending `n` order, so numbering (not DOM order) sets the route.
 * Place points in gutters and gaps so the line never crosses text.
 */
export function PlotPoint({ n, className = "" }: { n: number; className?: string }) {
  return <span aria-hidden data-plot={n} className={`pointer-events-none absolute size-0 ${className}`} />;
}
