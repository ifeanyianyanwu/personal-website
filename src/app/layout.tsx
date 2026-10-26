import type { Metadata } from "next";
import { Caveat, Inter_Tight, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PlotLine } from "@/components/plot-line";
import { profile } from "@/content/site";
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

export const metadata: Metadata = {
  title: { default: profile.name, template: `%s · ${profile.name}` },
  description: profile.intro,
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
        <Providers>
          <Nav />
          <div className="relative flex flex-1 flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
            <PlotLine />
          </div>
        </Providers>
      </body>
    </html>
  );
}
