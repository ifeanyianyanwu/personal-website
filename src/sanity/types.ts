// Client-safe: no Sanity imports, so the gallery UI can use these.
export const categories = ["Food", "Travel", "Drawings", "Chess", "Builds", "Life"] as const;
export type Category = (typeof categories)[number];

export type SanityImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
  lqip?: string;
};

export type Clip = {
  url: string;
  alt: string;
  mimeType?: string;
  poster?: string;
};

export type Media = ({ kind: "image" } & SanityImage) | ({ kind: "clip" } & Clip);

export type PlotPoint = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  category: Category;
  location?: string;
  tags?: string[];
  caption?: string;
  recipe?: string;
  /** Photos only: the first is the cover. */
  images: SanityImage[];
  /** Photos and clips, in order (detail page). */
  media: Media[];
  clips: number;
};

/** Sanity image URL at a given width, served as AVIF/WebP where supported. */
export function imageAt(url: string, width: number) {
  return `${url}?w=${width}&auto=format&fit=max&q=80`;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-05-03" → "May 2026", without time zones shifting the day. */
export function monthYear(date: string) {
  const [y, m] = date.split("-");
  return `${months[Number(m) - 1]} ${y}`;
}

/** Days since 1970 for a "YYYY-MM-DD" string, for placing points on a timeline. */
export function dayNumber(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / 86_400_000;
}
