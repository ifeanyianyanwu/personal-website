import Link from "next/link";
import { ClipMark } from "@/components/gallery/clip";
import { SanityImage } from "@/components/gallery/sanity-image";
import { PlotPoint } from "@/components/plot-point";
import { LinkArrow } from "@/components/ui";
import { getPlotPoints } from "@/sanity/queries";
import { monthYear } from "@/sanity/types";

/** The six newest plot points. Renders nothing until the gallery has items. Plot route: left gutter (17.5). */
export async function Latest() {
  const points = (await getPlotPoints()).slice(0, 6);
  if (points.length === 0) return null;

  return (
    <section aria-labelledby="latest-title" className="container-page relative pt-28 md:pt-36">
      <PlotPoint n={17.5} className="plot-l top-14" />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-eyebrow text-muted">Plot points · latest</p>
          <h2 id="latest-title" className="text-headline mt-4">
            Lately, off <em className="text-accent">the clock.</em>
          </h2>
        </div>
        <LinkArrow href="/gallery">All plot points</LinkArrow>
      </div>
      <ul className="-mx-[var(--page-pad)] mt-12 flex snap-x gap-4 overflow-x-auto px-[var(--page-pad)] pb-2 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0">
        {points.map((p, i) => (
          <li key={p._id} className="w-[44vw] shrink-0 snap-start md:w-auto">
            <Link href={`/gallery/${p.slug}`} className="group flex flex-col gap-2.5">
              <span className={`relative block aspect-square overflow-hidden rounded-[1.25rem] ${i % 2 ? "bg-sky" : "bg-sand"}`}>
                <SanityImage
                  image={p.images[0]}
                  sizes="(min-width: 768px) 200px, 44vw"
                  className="size-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                />
                {p.clips > 0 && <ClipMark small />}
              </span>
              <span className="text-[0.875rem]">
                <span className="font-medium">{p.title}</span>
                <span className="block text-muted">
                  {p.category} · {monthYear(p.date)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
