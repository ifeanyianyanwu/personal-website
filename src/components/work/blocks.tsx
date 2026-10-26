import { Children } from "react";
import { Reveal } from "@/components/motion";
import { PlotPoint } from "@/components/plot-point";

/**
 * Building blocks for case studies, available in every MDX file without imports
 * (see `src/mdx-components.tsx`). All of them are optional, so a short story can
 * skip what it doesn't have.
 *
 * Plot route: the left gutter. The header owns points 1 and 2, the recipe card 3
 * and 4, each chapter 10 + its number, and the next-study band 90.
 */

/** Project facts in recipe-card form, with a slot on the right for a chart or result. */
export function Recipe({
  serves,
  prep,
  role,
  ingredients,
  children,
}: {
  serves: string;
  prep: string;
  role?: string;
  ingredients: string;
  children?: React.ReactNode;
}) {
  const rows = [
    ["Serves", serves],
    ["Prep", prep],
    ["My role", role],
    ["Ingredients", ingredients],
  ].filter((r): r is [string, string] => !!r[1]);

  return (
    <div className="container-page relative mt-16">
      <PlotPoint n={3} className="plot-l top-0" />
      <Reveal>
        <div className="grid gap-10 rounded-[2.5rem] bg-sky p-7 text-on-sky md:grid-cols-2 md:p-11">
          <dl className="grid grid-cols-[6.5rem_1fr] content-start gap-x-4 gap-y-3.5 text-[1.0625rem]">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="opacity-70">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          {children && <div className="flex flex-col justify-center">{children}</div>}
        </div>
      </Reveal>
      <PlotPoint n={4} className="plot-l bottom-0" />
    </div>
  );
}

/** A numbered section. `wide` stacks the heading above full-width content (for `Compare`). */
export function Chapter({
  n,
  title,
  intro,
  wide = false,
  children,
}: {
  n: string;
  title: React.ReactNode;
  intro?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  const heading = (
    <div>
      <p className="text-hand text-[2rem] text-accent">{n}</p>
      <h2 className="mt-2 font-serif text-[clamp(2.75rem,5vw,4rem)] leading-[0.95] [&_em]:text-accent">{title}</h2>
    </div>
  );

  return (
    <section className="container-page relative pt-28 md:pt-36">
      <PlotPoint n={10 + Number(n)} className="plot-l top-28 md:top-36" />
      {wide ? (
        <>
          <div className="flex flex-wrap items-end justify-between gap-6">
            {heading}
            {intro && <p className="max-w-[42ch] text-[1.0625rem] text-muted">{intro}</p>}
          </div>
          <Reveal className="mt-10">{children}</Reveal>
        </>
      ) : (
        <div className="grid gap-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16">
          {heading}
          <div className="flex max-w-[62ch] flex-col gap-5">{children}</div>
        </div>
      )}
    </section>
  );
}

/** Numbered method steps (i, ii, iii...). */
export function Steps({ children }: { children: React.ReactNode }) {
  const numerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
  return (
    <ol className="border-t border-line-strong">
      {Children.toArray(children).map((child, i) => (
        <li key={i} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line-strong py-6">
          <span aria-hidden className="text-hand text-[1.75rem] text-accent">
            {numerals[i] ?? i + 1}
          </span>
          {child}
        </li>
      ))}
    </ol>
  );
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <strong className="text-[1.3125rem] font-semibold">{title}</strong>
      <span className="text-[1.125rem] leading-relaxed text-muted">{children}</span>
    </div>
  );
}

/** Big numbers in a row. */
export function Results({ children }: { children: React.ReactNode }) {
  return <dl className="grid gap-x-6 border-t border-line-strong sm:grid-cols-3">{children}</dl>;
}

export function Stat({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col-reverse pt-7">
      <dt className="mt-2.5 text-muted">{children}</dt>
      <dd className="font-serif text-[clamp(3rem,4.4vw,4.25rem)] leading-[0.9] text-accent">{value}</dd>
    </div>
  );
}

/** A weighted mix, e.g. a matching formula. Values should add up to 100. */
export function Blend({ parts }: { parts: { label: string; value: number; note: string }[] }) {
  const tones = ["bg-sky-900 text-sand-100", "bg-sky-500 text-sky-900"];
  return (
    <figure className="flex flex-col gap-4 rounded-[1.625rem] bg-sand-50 px-6 py-6 text-ink">
      <figcaption className="text-eyebrow text-ink-soft">Match score</figcaption>
      <div className="flex h-16 overflow-hidden rounded-xl">
        {parts.map((p, i) => (
          <div key={p.label} className={`flex items-center px-4 font-serif text-[1.75rem] ${tones[i % 2]}`} style={{ width: `${p.value}%` }}>
            {p.value}
          </div>
        ))}
      </div>
      <dl className="grid grid-cols-2 gap-4 text-sm">
        {parts.map((p) => (
          <div key={p.label}>
            <dt className="font-medium">{p.label}</dt>
            <dd className="text-ink-soft">{p.note}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

/** A single headline result for the recipe card. */
export function BigResult({ value, note }: { value: string; note: string }) {
  return (
    <figure className="flex flex-col gap-3 rounded-[1.625rem] bg-sand-50 px-6 py-7 text-ink">
      <figcaption className="text-eyebrow text-ink-soft">Result</figcaption>
      <p className="font-serif text-[clamp(4rem,8vw,6.5rem)] leading-[0.85]">{value}</p>
      <p className="text-ink-soft">{note}</p>
    </figure>
  );
}
