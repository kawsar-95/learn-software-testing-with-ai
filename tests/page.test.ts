import { test } from "node:test";
import assert from "node:assert/strict";
import { editUrl, formatUpdated } from "../lib/page.ts";

test("formatUpdated gives the short month and the year", () => {
  assert.equal(formatUpdated("2026-10-10"), "Oct 2026");
  assert.equal(formatUpdated("2027-01-01"), "Jan 2027");
  assert.equal(formatUpdated("2026-12-31"), "Dec 2026");
});

test("formatUpdated rejects a date that is not YYYY-MM-DD", () => {
  assert.throws(() => formatUpdated("Oct 2026"));
  assert.throws(() => formatUpdated("2026-13-01"));
});

test("editUrl points to the MDX file on GitHub", () => {
  assert.equal(
    editUrl("extend", "hooks"),
    "https://github.com/kawsar-95/learn-software-testing-with-ai/blob/main/content/extend/hooks.mdx",
  );
});
