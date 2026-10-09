import { test } from "node:test";
import assert from "node:assert/strict";
import { articleProgress, showBackToTop } from "../lib/reading.ts";

test("articleProgress is 0 while the top of the article is below the top of the viewport", () => {
  assert.equal(articleProgress(300, 3000, 800), 0);
  assert.equal(articleProgress(0, 3000, 800), 0);
});

test("articleProgress is 100 % when the bottom of the article reaches the bottom of the viewport", () => {
  assert.equal(articleProgress(-2200, 3000, 800), 1);
});

test("articleProgress is linear between the two ends", () => {
  assert.equal(articleProgress(-1100, 3000, 800), 0.5);
});

test("articleProgress clamps past the end", () => {
  assert.equal(articleProgress(-5000, 3000, 800), 1);
});

test("articleProgress for an article that fits in the viewport is 1 once its bottom is visible", () => {
  assert.equal(articleProgress(100, 500, 800), 1);
  assert.equal(articleProgress(500, 500, 800), 0);
});

test("articleProgress never returns NaN", () => {
  assert.equal(articleProgress(0, 0, 0), 1);
});

test("showBackToTop is true only after one viewport height of scroll", () => {
  assert.equal(showBackToTop(0, 800), false);
  assert.equal(showBackToTop(800, 800), false);
  assert.equal(showBackToTop(801, 800), true);
});
