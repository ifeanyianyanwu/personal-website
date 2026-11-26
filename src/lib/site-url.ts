/** Absolute canonical site URL (no trailing slash): SITE_URL if set (e.g. a custom domain), else production. */
export const siteUrl = (process.env.SITE_URL || "https://ifeanyianyanwu.vercel.app").replace(/\/$/, "");
