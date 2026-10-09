import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { GROUPS, PAGES, getNeighbors, getPage } from "../lib/nav.ts";

const routeMap: Record<string, string> = JSON.parse(
  readFileSync(new URL("../scripts/route-map.json", import.meta.url), "utf8"),
);
const routes = new Set(Object.values(routeMap));

test("PAGES has the 17 tutorial pages", () => {
  assert.equal(PAGES.length, 17);
});

test("part numbers run 1..17 in order", () => {
  assert.deepEqual(
    PAGES.map((p) => p.part),
    Array.from({ length: 17 }, (_, i) => i + 1),
  );
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
    assert.ok(routes.has(page.href), `${page.href} is not in scripts/route-map.json`);
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
