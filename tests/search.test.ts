import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PAGES } from "../lib/nav.ts";
import { getOutline } from "../lib/outline.ts";
import { buildSearchDocs, createIndex, runSearch } from "../lib/search.ts";
import type { SearchDoc } from "../lib/search.ts";

const read = (group: string, slug: string) => readFileSync(join("content", group, `${slug}.mdx`), "utf8");
const docs = buildSearchDocs(PAGES.map((page) => ({ page, source: read(page.group, page.slug) })));

test("every page has at least one doc", () => {
  for (const page of PAGES) {
    assert.ok(
      docs.some((doc) => doc.href === page.href || doc.href.startsWith(`${page.href}#`)),
      page.href,
    );
  }
});

test("each page has an intro doc and one doc per ## section, with outline ids", () => {
  for (const page of PAGES) {
    const own = docs.filter((doc) => doc.page === page.title);
    const sections = getOutline(page.group, page.slug).filter((item) => item.level === 2);
    assert.equal(own[0].href, page.href, `${page.href} intro`);
    assert.equal(own[0].title, page.title);
    assert.deepEqual(
      own.slice(1).map((doc) => doc.href),
      sections.map((item) => `${page.href}#${item.id}`),
      page.href,
    );
  }
});

test("doc ids are unique and every doc has its page fields", () => {
  assert.equal(new Set(docs.map((doc) => doc.id)).size, docs.length);
  for (const doc of docs) {
    const page = PAGES.find((p) => p.group === doc.group && p.title === doc.page);
    assert.ok(page, doc.id);
    assert.equal(doc.part, page.part);
    assert.ok(doc.title.length > 0, doc.id);
  }
});

test("no doc text has an import line, the metadata block, or a closing tag", () => {
  for (const doc of docs) {
    assert.ok(!doc.text.includes("import "), `${doc.id} has "import "`);
    assert.ok(!doc.text.includes("</"), `${doc.id} has "</"`);
    assert.ok(!doc.text.includes("export const metadata"), `${doc.id} has the metadata block`);
  }
});

const sample = [
  "export const metadata = {",
  "  title: 'Sample',",
  "}",
  "",
  "# Sample",
  "",
  "Intro with **bold**, `inline code` and a [link text](https://example.com/x).",
  "",
  '<CardGrid cols={2}>',
  '  <InfoCard title="Card One" subtitle="Card sub">',
  "    - Item **one**",
  "</InfoCard>",
  "</CardGrid>",
  "",
  "## First Part",
  "",
  "| Path | Scope |",
  "|---|---|",
  "| `~/.claude/` | Global |",
  "",
  "<details>",
  "<summary>Open &gt; me</summary>",
  "",
  "```bash",
  "## not a heading",
  "git show <hash>",
  "```",
  "",
  "</details>",
  "",
  "### Deeper",
  "",
  "Deep text.",
  "",
  "## First Part",
  "",
  "Second with the same title.",
].join("\n");
const [samplePage] = PAGES;
const sampleDocs = buildSearchDocs([{ page: samplePage, source: sample }]);

test("the intro is the text before the first ## and drops the metadata export", () => {
  const [intro] = sampleDocs;
  assert.equal(intro.href, samplePage.href);
  assert.equal(intro.title, samplePage.title);
  assert.equal(
    intro.text,
    "Sample Intro with bold, inline code and a link text. Card One Card sub Item one",
  );
});

test("a section keeps code text, JSX text and heading text, and drops Markdown and tag syntax", () => {
  const section = sampleDocs[1];
  assert.equal(section.href, `${samplePage.href}#first-part`);
  assert.equal(section.title, "First Part");
  assert.equal(
    section.text,
    "Path Scope ~/.claude/ Global Open > me ## not a heading git show <hash> Deeper Deep text.",
  );
});

test("a repeated ## title gets the -1 id, as the built page does", () => {
  assert.equal(sampleDocs[2].href, `${samplePage.href}#first-part-1`);
  assert.equal(sampleDocs[2].text, "Second with the same title.");
});

test("runSearch ranks the Hooks page first for hooks", () => {
  const index = createIndex(docs);
  assert.ok(runSearch(index, "hooks")[0].href.startsWith("/extend/hooks/"));
});

test("runSearch hits carry the stored fields and no text", () => {
  const index = createIndex(docs);
  const hit = runSearch(index, "hooks")[0];
  assert.deepEqual(Object.keys(hit).sort(), ["href", "id", "page", "part", "title"]);
});

test("runSearch returns nothing for a blank query and honors the limit", () => {
  const index = createIndex(docs);
  assert.deepEqual(runSearch(index, ""), []);
  assert.deepEqual(runSearch(index, "   "), []);
  assert.ok(runSearch(index, "claude", 3).length <= 3);
});

test("docs are JSON-safe", () => {
  const copy = JSON.parse(JSON.stringify(docs)) as SearchDoc[];
  assert.deepEqual(copy, docs);
});
