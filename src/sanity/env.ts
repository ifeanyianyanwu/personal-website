// Set these in .env.local (and on Vercel). Until a project exists the gallery shows its empty state.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-10-01";
export const isConfigured = projectId !== "";
