import { cacheLife } from "next/cache";

// Cached so the prerendered shell has no uncached `new Date()` (Cache Components rule).
export async function Year() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
