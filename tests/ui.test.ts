import { test } from "node:test";
import assert from "node:assert/strict";
import { PAGES } from "../lib/nav.ts";
import { footerSummary, searchType } from "../lib/ui.ts";

test("the page count in the strings comes from PAGES", () => {
  assert.ok(footerSummary.startsWith(`${PAGES.length} parts`));
  assert.ok(searchType.includes(`the ${PAGES.length} parts`));
});
