import { profile } from "@/content/site";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${profile.name}, ${profile.role}`;
export const size = ogSize;
export const contentType = "image/png";

/** The default share card, used by every page without its own. */
export default function Image() {
  const [first, ...rest] = profile.name.split(" ");
  return ogImage({
    eyebrow: `${profile.glance[0]} · ${profile.glance[3]}`,
    lead: first,
    accent: rest.join(" "),
    sub: `${profile.headline.lead} ${profile.headline.accent}`,
  });
}
