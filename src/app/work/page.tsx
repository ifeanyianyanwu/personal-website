import type { Metadata } from "next";
import { PlotPoint } from "@/components/plot-point";
import { SplitText } from "@/components/motion";
import { WorkList } from "@/components/work/work-list";
import { getWork } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Products I've shipped, built and learned from, with case studies.",
};

export default async function WorkIndex() {
  const work = await getWork();
  const first = Math.min(...work.map((w) => w.year));
  const studies = work.filter((w) => w.status === "case-study").length;
  const count = ["No", "One", "Two", "Three", "Four", "Five", "Six"][studies] ?? studies;

  return (
    <>
      <header className="container-page relative pt-32 pb-12 md:pt-40">
        <PlotPoint n={1} className="plot-l top-0" />
        <p className="text-eyebrow text-muted">Work · {first} to now</p>
        <SplitText as="h1" className="text-display mt-5" text="The plot" accent="so far." />
        <p className="text-lede mt-6 max-w-[46ch] text-muted">
          Products I&apos;ve shipped, built and learned from. {count} have full case studies. More stories land here as I
          write them.
        </p>
      </header>
      <WorkList work={work} />
    </>
  );
}
