// Search index helpers. The route (server) and the palette (client) both
// import this file, and `node --test` loads it directly. Do not import
// node:fs or lib/outline.ts here.

import MiniSearch from "minisearch";
import { headingsFromSource, plainTitle, sourceLines } from "./headings.ts";
import type { SourceLine } from "./headings.ts";
import type { NavPage } from "./nav.ts";

export type SearchDoc = {
  id: string;
  href: string;
  part: number;
  group: string;
  page: string;
  title: string;
  text: string;
};

/** A search result: the stored fields of a doc, without the body text. */
export type SearchHit = Pick<SearchDoc, "id" | "href" | "part" | "page" | "title">;

const TAG = /<\/?[A-Za-z][^>]*>/g;
const ATTRIBUTE = /\b(?:title|subtitle)="([^"]*)"/g;
const INLINE_CODE = /`([^`]*)`/g;
const TABLE_RULE = /^\s*\|?(\s*:?-+:?\s*\|)+(\s*:?-+:?\s*)?\|?\s*$/;
const THEMATIC_BREAK = /^\s*([-*_])(\s*\1){2,}\s*$/;
const LINE_PREFIX = /^\s*(?:>\s?|#{1,6}\s+|[-*+]\s+|\d+[.)]\s+)+/;
const ENTITIES: Record<string, string> = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&amp;": "&" };

/** A JSX or HTML tag becomes the text of its title and subtitle attributes. */
function tagText(tag: string): string {
  return [...tag.matchAll(ATTRIBUTE)].map((match) => ` ${match[1]} `).join("");
}

/** The text a reader sees in one line of Markdown, JSX and inline code. */
function lineText(line: string): string {
  if (TABLE_RULE.test(line) || THEMATIC_BREAK.test(line)) return "";
  // Hide inline code from the other rules, then put its text back.
  const code: string[] = [];
  const hidden = line.replace(LINE_PREFIX, "").replace(INLINE_CODE, (_, text: string) => `\u0001${code.push(text) - 1}\u0001`);
  return plainTitle(hidden.replace(TAG, tagText))
    .replace(/\|/g, " ")
    .replace(/&(?:lt|gt|quot|amp|#39);/g, (entity) => ENTITIES[entity])
    .replace(/\u0001(\d+)\u0001/g, (_, i: string) => code[Number(i)]);
}

/** The searchable text of some lines: code kept, syntax, imports and the metadata export dropped. */
function textOf(lines: SourceLine[]): string {
  const parts: string[] = [];
  let skipping = false; // inside a multi-line `export const …` block

  for (const { text, kind } of lines) {
    if (kind === "fence") continue;
    if (kind === "code") {
      parts.push(text);
      continue;
    }
    if (skipping) {
      skipping = !/^[}\])]/.test(text);
      continue;
    }
    if (/^(?:export|import)\s/.test(text)) {
      skipping = /[{[(]\s*$/.test(text);
      continue;
    }
    parts.push(lineText(text));
  }
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

/**
 * One doc for the page intro (the text before the first ##) and one per ##
 * section. Section ids come from lib/headings.ts, so they match the ids of
 * the built page.
 */
export function buildSearchDocs(pages: { page: NavPage; source: string }[]): SearchDoc[] {
  return pages.flatMap(({ page, source }) => {
    const lines = sourceLines(source);
    const sections = headingsFromSource(source).filter((heading) => heading.level === 2);
    const make = (href: string, title: string, from: number, to: number): SearchDoc => ({
      id: href,
      href,
      part: page.part,
      group: page.group,
      page: page.title,
      title,
      text: textOf(lines.slice(from, to)),
    });

    return [
      make(page.href, page.title, 0, sections[0]?.line ?? lines.length),
      ...sections.map((section, i) =>
        make(`${page.href}#${section.id}`, section.title, section.line + 1, sections[i + 1]?.line ?? lines.length),
      ),
    ];
  });
}

const SEARCH_OPTIONS = {
  prefix: true,
  fuzzy: 0.2,
  boost: { title: 3, page: 1.5 },
};

export function createIndex(docs: SearchDoc[]): MiniSearch<SearchDoc> {
  const index = new MiniSearch<SearchDoc>({
    fields: ["title", "page", "text"],
    storeFields: ["href", "part", "page", "title"],
    searchOptions: SEARCH_OPTIONS,
  });
  index.addAll(docs);
  return index;
}

export function runSearch(index: MiniSearch<SearchDoc>, query: string, limit = 8): SearchHit[] {
  if (query.trim() === "") return [];
  return index
    .search(query)
    .slice(0, limit)
    .map((hit) => ({
      id: String(hit.id),
      href: hit.href as string,
      part: hit.part as number,
      page: hit.page as string,
      title: hit.title as string,
    }));
}
