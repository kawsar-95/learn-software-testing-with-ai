import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PAGES } from "@/lib/nav";
import { buildSearchDocs } from "@/lib/search";

export const dynamic = "force-static";

export function GET() {
  const pages = PAGES.map((page) => ({
    page,
    source: readFileSync(join(process.cwd(), "content", page.group, `${page.slug}.mdx`), "utf8"),
  }));
  return Response.json(buildSearchDocs(pages));
}
