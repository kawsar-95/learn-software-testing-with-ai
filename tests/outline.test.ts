import { test } from "node:test";
import assert from "node:assert/strict";
import GithubSlugger from "github-slugger";
import { getOutline, outlineFromSource } from "../lib/outline.ts";
import { PAGES } from "../lib/nav.ts";

test("headings inside fenced code are skipped", () => {
  const source = ["# Title", "## Real", "```bash", "## not a heading", "# nor this", "```", "## After"].join("\n");
  assert.deepEqual(outlineFromSource(source), [
    { id: "real", title: "Real", level: 2 },
    { id: "after", title: "After", level: 2 },
  ]);
});

test("a tilde fence and an indented fence also hide headings", () => {
  const source = ["## One", "~~~", "## hidden", "~~~", "  ```md", "  ## hidden too", "  ```", "### Two"].join("\n");
  assert.deepEqual(
    outlineFromSource(source).map((item) => item.id),
    ["one", "two"],
  );
});

test("duplicate headings get -1, -2 like rehype-slug", () => {
  const source = ["## Setup", "text", "## Setup", "## Setup"].join("\n");
  assert.deepEqual(
    outlineFromSource(source).map((item) => item.id),
    ["setup", "setup-1", "setup-2"],
  );
});

test("the # heading takes a slug, so a later ## with the same text gets -1", () => {
  const source = ["# Hooks", "## Hooks"].join("\n");
  assert.deepEqual(outlineFromSource(source), [{ id: "hooks-1", title: "Hooks", level: 2 }]);
});

test("levels 4-6 take slugs but are not returned", () => {
  const source = ["#### Deep", "###### Deeper", "## Deep"].join("\n");
  assert.deepEqual(outlineFromSource(source), [{ id: "deep-1", title: "Deep", level: 2 }]);
});

test("level 3 headings are returned", () => {
  assert.deepEqual(outlineFromSource("## A\n### B"), [
    { id: "a", title: "A", level: 2 },
    { id: "b", title: "B", level: 3 },
  ]);
});

test("an emoji heading gets the github-slugger id", () => {
  const [item] = outlineFromSource("## ⚡ Superpower Mode!");
  assert.equal(item.id, new GithubSlugger().slug("⚡ Superpower Mode!"));
  assert.equal(item.title, "⚡ Superpower Mode!");
});

test("inline Markdown is stripped from titles and slugs", () => {
  const source = [
    "## **bold** and `code`",
    "### A [link](https://example.com/x) and _em_ text",
    "## Snake_case_name stays",
  ].join("\n");
  assert.deepEqual(outlineFromSource(source), [
    { id: "bold-and-code", title: "bold and code", level: 2 },
    { id: "a-link-and-em-text", title: "A link and em text", level: 3 },
    { id: "snake_case_name-stays", title: "Snake_case_name stays", level: 2 },
  ]);
});

test("a closing run of # is not part of the title", () => {
  assert.deepEqual(outlineFromSource("## Title ##"), [{ id: "title", title: "Title", level: 2 }]);
});

test("every real page has an outline with unique ids", () => {
  for (const page of PAGES) {
    const outline = getOutline(page.group, page.slug);
    const ids = outline.map((item) => item.id);
    assert.equal(new Set(ids).size, ids.length, page.href);
  }
});
