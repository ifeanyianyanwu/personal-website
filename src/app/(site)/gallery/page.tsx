import type { Metadata } from "next";
import { Suspense } from "react";
import { GalleryView } from "@/components/gallery/gallery-view";
import { SplitText } from "@/components/motion";
import { PlotPoint } from "@/components/plot-point";
import { getPlotPoints } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Plot points",
  description: "Things I cook, draw, play and build, plotted by when they happened.",
};

export default async function Gallery() {
  const points = await getPlotPoints();

  return (
    <>
      <header className="container-page relative pt-32 pb-10 md:pt-40">
        <PlotPoint n={1} className="plot-l top-0" />
        <p className="text-eyebrow text-muted">Gallery</p>
        <SplitText as="h1" className="text-display mt-5" text="Plot" accent="points." />
        <p className="text-lede mt-6 max-w-[44ch] text-muted">Things I cook, draw, play and build, plotted by when they happened.</p>
        <PlotPoint n={2} className="plot-l bottom-0" />
      </header>
      {/* Search params are URL data, so the filtered view renders inside Suspense. */}
      <Suspense>
        <GalleryView points={points} />
      </Suspense>
    </>
  );
}
