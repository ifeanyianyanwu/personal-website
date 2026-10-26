"use client";

import { useRef, useState } from "react";

/**
 * Wraps a code block from `rehype-pretty-code` (the figure around the title and `<pre>`)
 * and adds a copy button. Highlighting is done at build time; this only copies text.
 */
export function CodeFigure(props: React.ComponentProps<"figure">) {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = ref.current?.querySelector("pre")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (permissions, insecure origin); the code is still selectable.
    }
  };

  return (
    <figure ref={ref} {...props} className="relative">
      {props.children}
      <button
        type="button"
        onClick={copy}
        className="absolute top-1.5 right-2.5 inline-flex h-9 items-center rounded-full px-3.5 text-[0.8125rem] text-fg ring-1 ring-line-strong transition hover:ring-fg/40"
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </figure>
  );
}
