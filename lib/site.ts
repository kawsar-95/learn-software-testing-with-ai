// Both env vars are optional. Without them the build has no canonical URLs,
// sitemap entries, or analytics.
export const SITE_URL: string | null = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;
export const GA_ID: string | null = process.env.NEXT_PUBLIC_GA_ID || null;

export const SITE_NAME = "Software Testing with AI";
export const OWNER = { name: "kawsar-95", url: "https://github.com/kawsar-95" };
