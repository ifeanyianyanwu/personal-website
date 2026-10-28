import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export const ogSize = { width: 1200, height: 630 };

// Satori can't read woff2, so the brand fonts live in assets/og as TTF.
const font = (file: string) => readFile(join(process.cwd(), "assets/og", file));
const fonts = Promise.all([
  font("InstrumentSerif-Regular.ttf"),
  font("InstrumentSerif-Italic.ttf"),
  font("InterTight-Medium.ttf"),
]);

// Raw palette: the card is always the light theme.
const c = { bg: "#f4eee4", ink: "#1d1b18", muted: "#5b554c", sky: "#b3d4ee", sky5: "#7fb2dc", accent: "#2f5f8a", navy: "#1f3a56" };

/**
 * The share card: eyebrow, a serif "lead *accent*" title and a baby blue band with the
 * pen line running into it. One template for the site, case studies and journal posts.
 */
export async function ogImage({ eyebrow, lead, accent, sub }: { eyebrow: string; lead: string; accent: string; sub?: string }) {
  const [serif, serifItalic, sans] = await fonts;
  const length = `${lead.trim()} ${accent.trim()}`.length;
  const titleSize = length <= 18 ? 164 : length <= 34 ? 124 : 92;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: c.bg, color: c.ink, fontFamily: "Inter Tight" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "64px 72px 0" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: c.muted }}>{eyebrow}</div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, paddingBottom: 24 }}>
            <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Instrument Serif", fontSize: titleSize, lineHeight: 0.95, letterSpacing: -1 }}>
              <span style={{ marginRight: titleSize * 0.22 }}>{lead.trim()}</span>
              <span style={{ fontStyle: "italic", color: c.accent }}>{accent.trim()}</span>
            </div>
            {sub && <div style={{ display: "flex", marginTop: 32, maxWidth: 940, fontSize: 32, lineHeight: 1.3, color: c.muted }}>{sub}</div>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 116, padding: "0 72px", background: c.sky, color: c.navy, fontSize: 26, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* The diced monogram from the nav. */}
            <div style={{ display: "flex", flexWrap: "wrap", width: 46, gap: 4 }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: 3, background: i % 2 ? c.navy : c.sky5 }} />
              ))}
            </div>
            {profile.name} · {profile.role}
          </div>
          <div style={{ display: "flex" }}>{siteUrl.replace(/^https?:\/\//, "")}</div>
        </div>
        {/* The pen line drops down the gutter into the band, navy where it crosses the blue. */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          <path d="M 36 0 L 36 514" fill="none" stroke={c.sky5} strokeWidth="5" />
          <path d="M 36 514 L 36 572" fill="none" stroke={c.navy} strokeWidth="5" />
          <circle cx="36" cy="572" r="9" fill={c.navy} />
        </svg>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Inter Tight", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
