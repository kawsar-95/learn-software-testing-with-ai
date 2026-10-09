// Both env vars are optional. Without them the build has no canonical URLs,
// sitemap entries, or analytics.
export const SITE_URL: string | null = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;
export const GA_ID: string | null = process.env.NEXT_PUBLIC_GA_ID || null;
// next.config.ts sets it from PAGES_BASE_PATH: "/<repo-name>" on GitHub Pages, "" locally.
export const BASE_PATH: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_NAME = "Software Testing with AI";
/** The name under the icon of the installed app. */
export const SITE_SHORT_NAME = "Testing AI";
export const SITE_DESCRIPTION =
  "A tutorial for QA engineers and SDETs on software testing with Claude Code: getting started, foundations, configuration, extensions, and automation.";
export const OWNER = { name: "kawsar-95", url: "https://github.com/kawsar-95" };
