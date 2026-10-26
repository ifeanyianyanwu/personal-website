import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { proseComponents } from "@/components/journal/prose";
import { Toc } from "@/components/journal/toc";
import { PlotPoint } from "@/components/plot-point";
import { SplitText } from "@/components/motion";
import { stove } from "@/content/site";
import { formatDate, getJournal, getPost, plainTitle } from "@/lib/journal";

export async function generateStaticParams() {
  return (await getJournal()).map(({ slug }) => ({ slug }));
}

async function find(slug: string) {
  const found = await getPost(slug);
  if (!found) notFound();
  return found;
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { post } = await find((await params).slug);
  return {
    title: plainTitle(post),
    description: post.summary,
    alternates: { types: { "application/rss+xml": "/journal/rss.xml" } },
  };
}

// The slug is URL data, so it's read inside Suspense (Partial Prefetching); known slugs still prerender.
export default function Page({ params }: PageProps<"/journal/[slug]">) {
  return (
    <Suspense>
      <Post params={params} />
    </Suspense>
  );
}

/**
 * Plot route: the header owns points 1 and 2, the body 3 (a straight run down the
 * gutter, which the table of contents dots sit on), and the footer band 90.
 */
async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post, newer, older } = await find(slug);
  const { default: Body } = await import(`@/content/journal/${slug}.mdx`);

  const recipe = [
    ["Serves", post.serves],
    ["Prep", `${post.minutes} min read`],
    ["Ingredients", post.ingredients],
  ].filter((r): r is [string, string] => !!r[1]);

  const back = older
    ? { label: "Previous post", title: `← ${plainTitle(older)}`, href: `/journal/${older.slug}` }
    : post.related && { ...post.related, title: `${post.related.title} →` };
  const forward = newer
    ? { label: "Next post", title: `${plainTitle(newer)} →`, href: `/journal/${newer.slug}` }
    : { label: stove.length ? "More on the stove" : "Journal", title: "All notes →", href: "/journal" };

  return (
    <article>
      <header className="container-page relative pt-32 md:pt-40">
        <PlotPoint n={1} className="plot-l top-0" />
        <Link href="/journal" className="font-medium text-accent">
          ← Journal
        </Link>
        <p className="text-eyebrow mt-10 text-muted">
          Journal · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min read
        </p>
        <SplitText as="h1" className="text-display mt-5 max-w-[12ch]" text={post.title.lead} accent={post.title.accent} />
        <p className="text-lede mt-8 max-w-[44ch] text-muted">{post.summary}</p>
        {post.serves && (
          <dl className="mt-12 grid overflow-hidden rounded-[1.75rem] bg-sand md:grid-cols-3">
            {recipe.map(([k, v]) => (
              <div key={k} className="border-line-strong px-7 py-6 not-last:border-b md:not-last:border-r md:not-last:border-b-0">
                <dt className="text-eyebrow text-muted">{k}</dt>
                <dd className="mt-2.5 text-[1.0625rem]">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        <PlotPoint n={2} className="plot-l bottom-0" />
      </header>

      <div className="container-page relative grid grid-cols-[minmax(0,1fr)] gap-12 pt-14 pb-28 lg:grid-cols-[13rem_minmax(0,42.5rem)] lg:gap-14 xl:grid-cols-[15rem_minmax(0,42.5rem)_minmax(0,1fr)]">
        <div>
          <Toc items={post.toc} />
        </div>
        <div className="relative">
          <Body components={proseComponents} />
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-line-strong pt-6">
            <span className="mr-2 text-sm text-muted">Filed under</span>
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/journal?tag=${encodeURIComponent(t)}`}
                className="inline-flex h-11 items-center rounded-full px-4 text-sm ring-1 ring-line-strong transition hover:ring-fg/40"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
        <PlotPoint n={3} className="plot-l bottom-0" />
      </div>

      <nav aria-label="More from the journal" data-plot-surface className="border-b border-on-sky/20 bg-sky text-on-sky">
        <div className="container-page relative grid gap-12 py-20 md:grid-cols-2 md:py-24">
          <PlotPoint n={90} className="plot-l top-0" />
          {back ? <Band {...back} /> : <span />}
          <Band {...forward} className="md:text-right" />
        </div>
      </nav>
    </article>
  );
}

function Band({ label, title, href, className = "" }: { label: string; title: string; href: string; className?: string }) {
  return (
    <Link href={href} className={`group flex flex-col gap-3 ${className}`}>
      <span className="text-eyebrow opacity-70">{label}</span>
      <span className="font-serif text-[clamp(2.75rem,5vw,4rem)] leading-[0.92] transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
        {title}
      </span>
    </Link>
  );
}
