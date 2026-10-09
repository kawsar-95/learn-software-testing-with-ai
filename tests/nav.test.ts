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

test("the order of the pages is pinned", () => {
  assert.deepEqual(
    PAGES.map((p) => p.href),
    [
      "/getting-started/setup/",
      "/getting-started/models/",
      "/getting-started/permission-modes/",
      "/foundations/how-claude-code-works/",
      "/foundations/prompting/",
      "/foundations/test-design/",
      "/foundations/principles/",
      "/configure/claude-md/",
      "/configure/settings/",
      "/extend/skills/",
      "/extend/subagents/",
      "/extend/hooks/",
      "/extend/mcp/",
      "/extend/plugins/",
      "/automate/headless/",
      "/automate/github-actions/",
      "/automate/playwright/",
    ],
  );
});

test("the page titles are pinned", () => {
  assert.deepEqual(
    PAGES.map((p) => p.title),
    [
      "Install Claude Code",
      "Claude Models",
      "Permission Modes",
      "How Claude Code Works",
      "Prompting for QA",
      "Test Design with Claude",
      "Key Principles",
      "CLAUDE.md & Memory",
      "Settings & the .claude Folder",
      "Skills & Commands",
      "Subagents",
      "Hooks",
      "MCP Servers",
      "Plugins & Marketplaces",
      "Headless & CI",
      "GitHub Actions",
      "Browser Testing with Playwright",
    ],
  );
});

test("groups are in sidebar order", () => {
  assert.deepEqual(
    GROUPS.map((g) => g.slug),
    ["getting-started", "foundations", "configure", "extend", "automate"],
  );
  assert.deepEqual(
    GROUPS.map((g) => g.pages.length),
    [3, 4, 2, 5, 3],
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
    assert.equal(typeof page.tagline, "string", page.href);
  }
});

test("the route map is the identity map of home plus every page", () => {
  assert.deepEqual(routeMap, Object.fromEntries(["/", ...PAGES.map((p) => p.href)].map((r) => [r, r])));
});

test("getPage finds a page and rejects unknown params", () => {
  assert.equal(getPage("extend", "hooks")?.title, "Hooks");
  assert.equal(getPage("extend", "setup"), undefined);
  assert.equal(getPage("nope", "hooks"), undefined);
});

test("getNeighbors: the chain starts at setup and ends at playwright", () => {
  assert.equal(getNeighbors("getting-started", "setup").prev, undefined);
  assert.equal(getNeighbors("getting-started", "setup").next?.slug, "models");
  assert.equal(getNeighbors("automate", "playwright").next, undefined);
  assert.equal(getNeighbors("automate", "playwright").prev?.slug, "github-actions");
});

test("getNeighbors crosses group borders", () => {
  assert.equal(getNeighbors("foundations", "how-claude-code-works").prev?.slug, "permission-modes");
  assert.equal(getNeighbors("extend", "plugins").next?.slug, "headless");
});

test("every page has a tagline of 1 to 8 words", () => {
  assert.equal(PAGES.length, 17);
  for (const page of PAGES) {
    const words = page.tagline.trim().split(/\s+/).filter(Boolean);
    assert.ok(words.length >= 1 && words.length <= 8, `${page.href}: "${page.tagline}" has ${words.length} words`);
    assert.doesNotMatch(page.tagline, /\d/, `${page.href}: a tagline has no numbers`);
  }
});

test("the taglines are all different", () => {
  assert.equal(new Set(PAGES.map((p) => p.tagline)).size, PAGES.length);
});
