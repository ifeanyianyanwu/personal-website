import type { Metadata } from "next";
import { Caveat, Inter_Tight, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/providers";
import { profile } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "700",
});

// Pages set title and description; Open Graph and the card fall back to them, and the image comes from `opengraph-image`.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name}, ${profile.role}`, template: `%s · ${profile.name}` },
  description: profile.intro,
  openGraph: { type: "website", siteName: profile.name, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${instrumentSerif.variable} ${caveat.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: extensions like Grammarly add attributes to <body> before React loads */}
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-bg text-fg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
