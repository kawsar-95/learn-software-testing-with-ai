import { readFileSync } from "node:fs";
import { join } from "node:path";
import GithubSlugger from "github-slugger";

export type OutlineItem = { id: string; title: string; level: 2 | 3 };

const HEADING = /^\s*(#{1,6})\s+(.*)$/;
const FENCE = /^\s*(`{3,}|~{3,})/;

/** Plain text of a heading's Markdown, as the reader sees it. */
function plainTitle(markdown: string): string {
  return markdown
    .replace(/\s+#+\s*$/, "") // closing run of #
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links
    .replace(/`([^`]*)`/g, "$1") // inline code
    .replace(/<[^>]+>/g, "") // inline HTML
    .replace(/(\*\*|__|~~)(.+?)\1/g, "$2") // bold, strikethrough
    .replace(/\*(.+?)\*/g, "$1") // emphasis
    .replace(/(^|[^\w])_(.+?)_(?![\w])/g, "$1$2") // emphasis with underscores, not snake_case
    .trim();
}

/**
 * The ## and ### headings of an MDX source, in order. Every heading (levels
 * 1-6) takes a slug from one slugger, the same way rehype-slug does, so a
 * repeated title gets -1, -2. Only levels 2 and 3 are returned.
 */
export function outlineFromSource(source: string): OutlineItem[] {
  const slugger = new GithubSlugger();
  const items: OutlineItem[] = [];
  let fence: string | null = null;

  for (const line of source.split(/\r?\n/)) {
    const fenceMatch = FENCE.exec(line);
    if (fence) {
      // A closing fence uses the same character and is at least as long.
      if (fenceMatch && fenceMatch[1][0] === fence[0] && fenceMatch[1].length >= fence.length) fence = null;
      continue;
    }
    if (fenceMatch) {
      fence = fenceMatch[1];
      continue;
    }
    const heading = HEADING.exec(line);
    if (!heading) continue;
    const level = heading[1].length;
    const title = plainTitle(heading[2]);
    const id = slugger.slug(title);
    if (level === 2 || level === 3) items.push({ id, title, level });
  }
  return items;
}

/** The outline of content/<group>/<slug>.mdx. Reads the file at build time. */
export function getOutline(group: string, slug: string): OutlineItem[] {
  return outlineFromSource(readFileSync(join(process.cwd(), "content", group, `${slug}.mdx`), "utf8"));
}
