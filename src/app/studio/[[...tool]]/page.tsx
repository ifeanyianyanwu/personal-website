import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";
import { Studio } from "./studio";

export { viewport } from "next-sanity/studio";

export const metadata: Metadata = { ...studioMetadata, robots: { index: false, follow: false } };

/** Embedded Sanity Studio, so plot points can be posted from a phone. */
export default function StudioPage() {
  return <Studio />;
}
