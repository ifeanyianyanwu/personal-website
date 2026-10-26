/** Shared with client components, so no Node imports here. */
export const kinds = ["Production", "AI & ML", "Side projects", "Hackathons"] as const;
export type Kind = (typeof kinds)[number];

/**
 * Front matter for one project. Each project is one file in `src/content/work/`
 * that exports `meta`; the file name is the slug. Adding a story means adding a file.
 */
export type WorkMeta = {
  title: string;
  /** Sorts the list (newest first) and labels the row. */
  year: number;
  /** Breaks ties within a year: higher comes first. */
  order?: number;
  /** One line for the /work list. */
  summary: string;
  tags: string[];
  kinds: Kind[];
  /** `case-study` gets a page; `notes` is listed only; `nda` is listed without screens or a page. */
  status: "case-study" | "notes" | "nda";
  /** The key result, shown in the hover preview. */
  result: string;
  /** Case studies only. */
  when?: string;
  headline?: { lead: string; accent: string };
  lede?: string;
  /** One line under the title when this is the "Next case study". */
  teaser?: string;
};

export type WorkEntry = WorkMeta & { slug: string };
