"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Chip } from "@/components/ui";
import { formatDate, plainTitle, type JournalEntry } from "@/lib/journal-meta";

// Next.js syncs useSearchParams with the native History API, so no server round trip.
function useParam(key: string, fallback: string) {
  const params = useSearchParams();
  const value = params.get(key) ?? fallback;
  const set = (next: string) => {
    const p = new URLSearchParams(window.location.search);
    if (next === fallback) p.delete(key);
    else p.set(key, next);
    const s = p.toString();
    window.history.replaceState(null, "", s ? `?${s}` : window.location.pathname);
  };
  return [value, set] as const;
}

/** Search box for the header. Shares `?q=` with `JournalView`. */
export function JournalSearch() {
  const [q, setQ] = useParam("q", "");
  // Local text so typing stays instant; follows the URL when something else changes it (Clear filters).
  const [text, setText] = useState(q);
  const [synced, setSynced] = useState(q);
  if (q !== synced) {
    setSynced(q);
    setText(q);
  }
  return (
    <SearchField
      value={text}
      onChange={(v) => {
        setText(v);
        setQ(v);
      }}
    />
  );
}

/** The empty search box in the prerendered HTML, so the header keeps its height on hydration. */
export function JournalSearchFallback() {
  return <SearchField value="" />;
}

function SearchField({ value, onChange }: { value: string; onChange?: (value: string) => void }) {
  return (
    <label className="flex w-full flex-col gap-2 text-[0.8125rem] text-muted">
      Search the journal
      <input
        type="search"
        value={value}
        readOnly={!onChange}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={'Try "docs" or "hackathon"'}
        className="h-12 rounded-full bg-surface px-[1.125rem] text-[0.9375rem] text-fg ring-1 ring-line-strong outline-none placeholder:text-muted focus:ring-2 focus:ring-accent"
      />
    </label>
  );
}

/**
 * Tag filter and the post list. The newest match gets the baby blue card; the rest
 * are rows on the pen line. Filters live in the URL (?q=&tag=) so a view can be shared.
 * Plot route: the card 10, rows 11 and up.
 */
export function JournalView({ posts }: { posts: JournalEntry[] }) {
  const [q, setQ] = useParam("q", "");
  const [tag, setTag] = useParam("tag", "All");
  return <PostList posts={posts} q={q} tag={tag} setQ={setQ} setTag={setTag} />;
}

/** The unfiltered list in the prerendered HTML, so the page doesn't shift when the URL is read on hydration. */
export function JournalViewFallback({ posts }: { posts: JournalEntry[] }) {
  return <PostList posts={posts} q="" tag="All" />;
}

function PostList({
  posts,
  q,
  tag,
  setQ = () => {},
  setTag = () => {},
}: {
  posts: JournalEntry[];
  q: string;
  tag: string;
  setQ?: (q: string) => void;
  setTag?: (tag: string) => void;
}) {
  const tags = ["All", ...new Set(posts.flatMap((p) => p.tags))];
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (tag !== "All" && !p.tags.includes(tag)) return false;
      if (!needle) return true;
      const hay = [plainTitle(p), p.summary, ...p.tags, ...p.toc.map((t) => t.title)].join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [posts, q, tag]);
  const [first, ...rest] = shown;

  return (
    <div className="container-page relative">
      {tags.length > 2 && (
        <div role="group" aria-label="Filter by tag" className="flex flex-wrap gap-2 pb-12">
          {tags.map((t) => (
            <Chip key={t} active={tag === t} onClick={() => setTag(t)}>
              {t}
            </Chip>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {shown.length === posts.length ? "" : `${shown.length} of ${posts.length} posts shown`}
      </p>

      {!first && (
        <div className="rounded-[2rem] bg-surface px-8 py-14 text-center ring-1 ring-line">
          <p className="font-serif text-[2.5rem] leading-none">Nothing on that yet.</p>
          <p className="mt-3 text-muted">Try another word, or clear the filters.</p>
          <button
            type="button"
            onClick={() => {
              setQ("");
              setTag("All");
            }}
            className="mt-6 inline-flex h-11 items-center font-medium text-accent"
          >
            Clear filters
          </button>
        </div>
      )}

      {first && (
        <article data-plot-surface className="relative rounded-[2rem] bg-sky text-on-sky">
          <span aria-hidden data-plot={10} className="plot-in-l absolute top-[4.5rem] size-0" />
          <Link
            href={`/journal/${first.slug}`}
            className="group grid gap-10 p-7 md:p-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12 lg:p-14"
          >
            <span className="flex flex-col gap-4">
              <span className="flex flex-wrap items-baseline gap-4">
                <time dateTime={first.date} className="text-hand text-[2rem]">
                  {formatDate(first.date)}
                </time>
                {first === posts[0] && <span className="text-eyebrow font-semibold">Latest</span>}
              </span>
              <span className="font-serif text-[clamp(3.25rem,7vw,6rem)] leading-[0.9] tracking-[-0.02em]">
                {first.title.lead} <em>{first.title.accent}</em>
              </span>
              <span className="max-w-[52ch] text-[1.1875rem] leading-normal">{first.summary}</span>
            </span>
            <span className="flex flex-col justify-between gap-6 border-on-sky/25 lg:border-l lg:pl-8">
              <dl className="flex flex-col gap-3.5 text-[0.9375rem]">
                {first.serves && <Fact k="Serves" v={first.serves} />}
                <Fact k="Prep" v={`${first.minutes} min read`} />
                <Fact k="Filed under" v={first.tags.join(" · ")} />
              </dl>
              <span className="font-semibold">
                Read the post{" "}
                <span aria-hidden className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                  →
                </span>
              </span>
            </span>
          </Link>
        </article>
      )}

      {rest.length > 0 && (
        <ol className="mt-16 border-t border-line-strong">
          {rest.map((p, i) => (
            <li key={p.slug} className="relative border-b border-line-strong">
              <span
                aria-hidden
                data-plot={11 + i}
                className="plot-in-l absolute top-1/2 size-4 -translate-1/2 rounded-full border-4 border-fg bg-plot"
              />
              <Link
                href={`/journal/${p.slug}`}
                className="grid gap-x-6 gap-y-2 rounded-[1.25rem] py-6 pl-3 transition-colors duration-300 hover:bg-sky hover:text-on-sky focus-visible:bg-sky focus-visible:text-on-sky md:grid-cols-[8rem_minmax(0,1fr)_10rem] md:items-center md:px-5"
              >
                <time dateTime={p.date} className="text-hand text-[1.625rem]">
                  {formatDate(p.date)}
                </time>
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[0.95]">{plainTitle(p)}</span>
                  <span className="opacity-75">{p.summary}</span>
                </span>
                <span className="text-sm opacity-75 md:justify-self-end">{p.minutes} min read</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-eyebrow opacity-75">{k}</dt>
      <dd className="mt-1">{v}</dd>
    </div>
  );
}
