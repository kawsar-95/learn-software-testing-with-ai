import { readFileSync } from "node:fs";
import { join } from "node:path";
import { headingsFromSource } from "./headings.ts";

export type OutlineItem = { id: string; title: string; level: 2 | 3 };

/** The ## and ### headings of an MDX source, in order. */
export function outlineFromSource(source: string): OutlineItem[] {
  return headingsFromSource(source)
    .filter((heading) => heading.level === 2 || heading.level === 3)
    .map(({ id, title, level }) => ({ id, title, level: level as 2 | 3 }));
}

/** The outline of content/<group>/<slug>.mdx. Reads the file at build time. */
export function getOutline(group: string, slug: string): OutlineItem[] {
  return outlineFromSource(readFileSync(join(process.cwd(), "content", group, `${slug}.mdx`), "utf8"));
}
