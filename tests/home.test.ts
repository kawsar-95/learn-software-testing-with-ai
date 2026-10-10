import { test } from "node:test";
import assert from "node:assert/strict";
import { GROUPS, PAGES } from "../lib/nav.ts";
import { START_STEPS, groupLabel } from "../lib/home.ts";

test("groupLabel is the uppercase title and the count of parts", () => {
  assert.equal(groupLabel("Getting Started", 3), "GETTING STARTED · 3 PARTS");
  assert.equal(groupLabel("Extend", 1), "EXTEND · 1 PART");
});

test("every group gets a label with its own count", () => {
  assert.deepEqual(
    GROUPS.map((g) => groupLabel(g.title, g.pages.length)),
    ["GETTING STARTED · 3 PARTS", "FOUNDATIONS · 4 PARTS", "CONFIGURE · 2 PARTS", "EXTEND · 5 PARTS", "AUTOMATE · 3 PARTS", "CASE STUDY · 6 PARTS"],
  );
});

test("the start-here steps are install, permission modes, how it works", () => {
  assert.deepEqual(
    START_STEPS.map((p) => p.href),
    ["/getting-started/setup/", "/getting-started/permission-modes/", "/foundations/how-claude-code-works/"],
  );
  assert.deepEqual(START_STEPS.map((p) => p.part), [1, 3, 4]);
  for (const step of START_STEPS) assert.ok(PAGES.includes(step));
});
