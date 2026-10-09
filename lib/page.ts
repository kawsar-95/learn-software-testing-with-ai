// The `page` export of a content file and the helpers for the meta line.
// It has no server-only imports, so client components can use it.

export type Source = { title: string; publisher: string; url: string; accessed: string };
export type PageInfo = { updated: string; sources: Source[] };

export const REPO_URL = "https://github.com/kawsar-95/learn-software-testing-with-ai";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** `2026-10-10` becomes `Oct 2026`. Throws if the date is not `YYYY-MM-DD`. */
export function formatUpdated(iso: string): string {
  const match = /^(\d{4})-(\d{2})-\d{2}$/.exec(iso);
  const month = match ? Number(match[2]) : 0;
  if (!match || month < 1 || month > 12) throw new Error(`Not a YYYY-MM-DD date: ${iso}`);
  return `${MONTHS[month - 1]} ${match[1]}`;
}

/** The GitHub link to the MDX source of a page. */
export function editUrl(group: string, slug: string): string {
  return `${REPO_URL}/blob/main/content/${group}/${slug}.mdx`;
}
