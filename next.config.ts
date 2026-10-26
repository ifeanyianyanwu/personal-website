import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Plugins are named by string so Turbopack can load them. `rehype-slug` gives `##` headings
// ids for the journal's table of contents; `rehype-pretty-code` highlights code at build time.
const withMDX = createMDX({
  options: {
    rehypePlugins: [
      "rehype-slug",
      ["rehype-pretty-code", { theme: { light: "github-light", dark: "github-dark" }, keepBackground: false }],
    ],
  },
});

export default withMDX(nextConfig);
