import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SanityImage } from "@/components/gallery/sanity-image";
import { PlotPoint } from "@/components/plot-point";
import { getPlotPoint } from "@/sanity/queries";
import { monthYear } from "@/sanity/types";

export async function generateMetadata({ params }: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const point = await getPlotPoint((await params).slug);
  return point ? { title: point.title, description: point.caption } : {};
}

// No generateStaticParams: the feed changes from the Studio, so items render on first visit and stay cached.
export default function Page({ params }: PageProps<"/gallery/[slug]">) {
  return (
    <Suspense>
      <Item params={params} />
    </Suspense>
  );
}

async function Item({ params }: { params: Promise<{ slug: string }> }) {
  const point = await getPlotPoint((await params).slug);
  if (!point) notFound();

  return (
    <article className="container-page relative pt-32 pb-32 md:pt-40">
      <PlotPoint n={1} className="plot-l top-0" />
      <Link href="/gallery" className="font-medium text-accent">
        ← All plot points
      </Link>
      <p className="text-eyebrow mt-10 text-muted">
        {point.category} · {monthYear(point.date)}
        {point.location && ` · ${point.location}`}
      </p>
      <h1 className="text-display mt-5">{point.title}</h1>
      {point.caption && <p className="text-lede mt-6 max-w-[52ch] text-muted">{point.caption}</p>}
      {point.recipe && (
        <div className="mt-8 max-w-[52ch] rounded-[1.75rem] bg-sky p-7 text-on-sky">
          <p className="text-hand text-[1.75rem]">how I made it</p>
          <p className="mt-2 whitespace-pre-line">{point.recipe}</p>
        </div>
      )}
      <div className="mt-14 flex flex-col gap-6">
        {point.images.map((image, i) => (
          <SanityImage key={image.url} image={image} sizes="(min-width: 1280px) 1184px, 100vw" priority={i === 0} className="h-auto w-full rounded-[2rem]" />
        ))}
      </div>
      {point.tags?.length ? <p className="mt-8 text-sm text-muted">{point.tags.map((t) => `#${t}`).join("  ")}</p> : null}
      <PlotPoint n={90} className="plot-l bottom-16" />
    </article>
  );
}
