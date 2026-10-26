import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { CodeFigure } from "./code-figure";

/**
 * Journal posts read as long-form text, so they swap the case-study defaults
 * (muted lede paragraphs) for body copy. Passed to each post as `components`,
 * which take precedence over `src/mdx-components.tsx`.
 */
export const proseComponents: MDXComponents = {
  p: (props) => <p className="mb-6 text-[1.1875rem] leading-[1.7]" {...props} />,
  h2: (props) => (
    <h2
      className="mt-20 mb-6 scroll-mt-28 font-serif text-[clamp(2.25rem,4vw,3rem)] leading-none tracking-[-0.01em] first:mt-0 [&_em]:text-accent"
      {...props}
    />
  ),
  a: ({ href = "", ...props }) => (
    <Link
      href={href}
      className="text-accent underline decoration-current/30 underline-offset-4 hover:decoration-current"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold" {...props} />,
  ul: (props) => <ul className="mb-6 list-disc space-y-2 pl-6 text-[1.1875rem] leading-[1.7]" {...props} />,
  ol: (props) => <ol className="mb-6 list-decimal space-y-2 pl-6 text-[1.1875rem] leading-[1.7]" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-10 [&_p]:font-serif [&_p]:text-[clamp(2rem,3.4vw,2.75rem)] [&_p]:leading-[1.05] [&_p]:text-accent" {...props} />
  ),
  figure: (props: React.ComponentProps<"figure"> & { "data-rehype-pretty-code-figure"?: string }) =>
    "data-rehype-pretty-code-figure" in props ? <CodeFigure {...props} /> : <figure {...props} />,
  Note,
  Caption,
};

/** A handwritten margin note. Sits in the right margin on wide screens, inline above. */
function Note({ children }: { children: React.ReactNode }) {
  return (
    <aside className="text-hand mb-4 -rotate-2 text-[1.625rem] text-accent xl:absolute xl:left-full xl:mb-0 xl:ml-14 xl:w-52">
      <span className="sr-only">Margin note: </span>
      {children}
    </aside>
  );
}

/** Small print under a figure or code block. */
function Caption({ children }: { children: React.ReactNode }) {
  return <p className="-mt-3 mb-8 text-sm text-muted">{children}</p>;
}
