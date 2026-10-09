import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { GROUPS, PAGES, getNeighbors, getPage } from "../lib/nav.ts";

const routeMap: Record<string, string> = JSON.parse(
  readFileSync(new URL("../scripts/route-map.json", import.meta.url), "utf8"),
);
const routes = new Set(Object.values(routeMap));

/** Every content/<group>/<slug>.mdx file, as "<group>/<slug>". */
const mdxFiles = readdirSync(new URL("../content", import.meta.url), { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""))
  .sort();

test("PAGES lists exactly the content/**/*.mdx files", () => {
  assert.deepEqual(PAGES.map((p) => `${p.group}/${p.slug}`).sort(), mdxFiles);
});

test("every MDX file exports its metadata", () => {
  for (const file of mdxFiles) {
    const source = readFileSync(new URL(`../content/${file}.mdx`, import.meta.url), "utf8");
    assert.match(source, /^export const metadata = \{/m, `content/${file}.mdx has no "export const metadata"`);
  }
});

test("part numbers run 1..PAGES.length in order", () => {
  assert.deepEqual(
    PAGES.map((p) => p.part),
    Array.from({ length: PAGES.length }, (_, i) => i + 1),
  );
});

test("the order of the current pages is pinned", () => {
  assert.deepEqual(
    PAGES.slice(0, 4).map((p) => p.href),
    ["/getting-started/setup/", "/getting-started/models/", "/getting-started/modes/", "/foundations/ai-systems/"],
  );
  assert.equal(PAGES.at(-1)?.href, "/extend/marketplace/");
});

test("groups are in sidebar order", () => {
  assert.deepEqual(
    GROUPS.map((g) => g.slug),
    ["getting-started", "foundations", "configure", "extend"],
  );
});

test("PAGES is the flat list of the group pages", () => {
  assert.deepEqual(PAGES, GROUPS.flatMap((g) => g.pages));
});

test("every href is /<group>/<page>/ and is a known route", () => {
  for (const page of PAGES) {
    assert.match(page.href, /^\/[a-z-]+\/[a-z-]+\/$/);
    assert.equal(page.href, `/${page.group}/${page.slug}/`);
    assert.ok(
      routes.has(page.href),
      `${page.href} is not a value in scripts/route-map.json. Add it, or check_routes.py and check_outline.py skip the page.`,
    );
  }
});

test("every page has a title and a description", () => {
  for (const page of PAGES) {
    assert.ok(page.title.length > 0, page.href);
    assert.ok(page.description.length > 0, page.href);
  }
});

test("getPage finds a page and rejects unknown params", () => {
  assert.equal(getPage("extend", "hooks")?.title, "Hooks");
  assert.equal(getPage("extend", "setup"), undefined);
  assert.equal(getPage("nope", "hooks"), undefined);
});

test("getNeighbors: the chain starts at setup and ends at marketplace", () => {
  assert.equal(getNeighbors("getting-started", "setup").prev, undefined);
  assert.equal(getNeighbors("getting-started", "setup").next?.slug, "models");
  assert.equal(getNeighbors("extend", "marketplace").next, undefined);
  assert.equal(getNeighbors("extend", "marketplace").prev?.slug, "superpower");
});

test("getNeighbors crosses group borders", () => {
  assert.equal(getNeighbors("foundations", "ai-systems").prev?.slug, "modes");
});
