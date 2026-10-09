// The Markdown scan shared by the outline and the search index. It has no
// server-only imports, so client components can load files that use it.
import GithubSlugger from "github-slugger";

export type Heading = { id: string; title: string; level: number; line: number };

/** `fence` is an opening or closing fence line, `code` a line inside one. */
export type SourceLine = { text: string; index: number; kind: "text" | "fence" | "code" };

const HEADING = /^\s*(#{1,6})\s+(.*)$/;
const FENCE = /^\s*(`{3,}|~{3,})/;

/** Plain text of a heading's Markdown, as the reader sees it. */
export function plainTitle(markdown: string): string {
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

/** The lines of an MDX source, each marked as text, a fence line, or code. */
export function sourceLines(source: string): SourceLine[] {
  const lines: SourceLine[] = [];
  let fence: string | null = null;

  source.split(/\r?\n/).forEach((text, index) => {
    const match = FENCE.exec(text);
    if (fence) {
      // A closing fence uses the same character and is at least as long.
      const closes = match !== null && match[1][0] === fence[0] && match[1].length >= fence.length;
      if (closes) fence = null;
      lines.push({ text, index, kind: closes ? "fence" : "code" });
    } else if (match) {
      fence = match[1];
      lines.push({ text, index, kind: "fence" });
    } else {
      lines.push({ text, index, kind: "text" });
    }
  });
  return lines;
}

/**
 * Every heading (levels 1-6) of an MDX source, in order, outside code
 * fences. All take a slug from one slugger, the same way rehype-slug does,
 * so a repeated title gets -1, -2.
 */
export function headingsFromSource(source: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  for (const { text, index, kind } of sourceLines(source)) {
    if (kind !== "text") continue;
    const match = HEADING.exec(text);
    if (!match) continue;
    const title = plainTitle(match[2]);
    headings.push({ id: slugger.slug(title), title, level: match[1].length, line: index });
  }
  return headings;
}
