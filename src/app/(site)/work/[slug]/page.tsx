import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PlotPoint } from "@/components/plot-point";
import { SplitText } from "@/components/motion";
import { getCaseStudies } from "@/lib/work";

export async function generateStaticParams() {
  return (await getCaseStudies()).map(({ slug }) => ({ slug }));
}

async function find(slug: string) {
  const studies = await getCaseStudies();
  const i = studies.findIndex((s) => s.slug === slug);
  if (i === -1) notFound();
  return { study: studies[i], next: studies[(i + 1) % studies.length] };
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { study } = await find((await params).slug);
  return { title: `${study.title} case study`, description: study.lede };
}

// The slug is URL data, so it's read inside Suspense (Partial Prefetching); known slugs still prerender.
// The fallback holds a screen of space, so the footer never paints at the top and then jumps.
export default function Page({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-svh" />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { study, next } = await find(slug);
  const { default: Body } = await import(`@/content/work/${slug}.mdx`);

  return (
    <article>
      <header className="container-page relative pt-32 md:pt-40">
        <PlotPoint n={1} className="plot-l top-0" />
        <Link href="/work" className="font-medium text-accent">
          ← All work
        </Link>
        <p className="text-eyebrow mt-10 text-muted">
          Case study · {study.title}
          {study.when && ` · ${study.when}`}
        </p>
        {study.headline && (
          <SplitText as="h1" className="text-display mt-5" text={study.headline.lead} accent={study.headline.accent} />
        )}
        {study.lede && <p className="text-lede mt-8 max-w-[44ch] text-muted">{study.lede}</p>}
        <PlotPoint n={2} className="plot-l bottom-0" />
      </header>

      <Body />

      {next.slug !== study.slug && (
        <section data-plot-surface className="mt-32 border-b border-on-sky/20 bg-sky text-on-sky md:mt-40">
          <Link href={`/work/${next.slug}`} className="container-page group relative block py-24 md:py-28">
            <PlotPoint n={90} className="plot-l top-0" />
            <p className="text-eyebrow opacity-70">Next case study</p>
            <p className="mt-4 font-serif text-[clamp(4rem,9vw,8.75rem)] leading-[0.88]">
              {next.title}{" "}
              <em className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-3">→</em>
            </p>
            {next.teaser && <p className="text-lede mt-5 max-w-[44ch] opacity-80">{next.teaser}</p>}
          </Link>
        </section>
      )}
    </article>
  );
}
