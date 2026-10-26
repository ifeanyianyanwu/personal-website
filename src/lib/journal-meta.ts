/** Shared with client components, so no Node imports here. */

/**
 * Front matter for one post. Each post is one file in `src/content/journal/` that
 * exports `meta`; the file name is the slug. Reading time and the table of contents
 * are worked out from the file, so they never drift from the text.
 */
export type JournalMeta = {
  /** Rendered as "lead *accent*". */
  title: { lead: string; accent: string };
  /** ISO date, `YYYY-MM-DD`. Sorts the journal, newest first. */
  date: string;
  /** The lede under the title, and the excerpt in lists and RSS. */
  summary: string;
  tags: string[];
  /** Recipe card, optional: who the post is for and what went into it. */
  serves?: string;
  ingredients?: string;
  /** Shown in the footer band while there's no previous post. */
  related?: { label: string; title: string; href: string };
};

export type TocItem = { id: string; title: string };

export type JournalEntry = JournalMeta & { slug: string; minutes: number; toc: TocItem[] };

export const plainTitle = (m: Pick<JournalMeta, "title">) => `${m.title.lead} ${m.title.accent}`;

/** "26 Oct 2026". Parsed as UTC so the day never shifts with the server's time zone. */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
