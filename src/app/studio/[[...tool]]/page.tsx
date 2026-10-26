import { Studio } from "./studio";

export { metadata, viewport } from "next-sanity/studio";

/** Embedded Sanity Studio, so plot points can be posted from a phone. */
export default function StudioPage() {
  return <Studio />;
}
