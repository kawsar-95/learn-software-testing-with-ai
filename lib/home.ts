import { PAGES } from "./nav.ts";
import type { NavPage } from "./nav.ts";

/** The label of a group on the home page: `GETTING STARTED · 3 PARTS`. */
export function groupLabel(title: string, count: number): string {
  return `${title.toUpperCase()} · ${count} ${count === 1 ? "PART" : "PARTS"}`;
}

const START_HREFS = [
  "/getting-started/setup/",
  "/getting-started/permission-modes/",
  "/foundations/how-claude-code-works/",
];

/** The three pages to read first, in order. The part numbers come from `PAGES`. */
export const START_STEPS: NavPage[] = START_HREFS.map((href) => {
  const page = PAGES.find((p) => p.href === href);
  if (!page) throw new Error(`START_HREFS has an unknown page: ${href}`);
  return page;
});
