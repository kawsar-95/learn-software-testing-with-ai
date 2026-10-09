import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { PAGES } from "../lib/nav.ts";
import { assetPattern, precacheUrls, serviceWorkerSource, webManifest } from "../lib/pwa.ts";

const SITE = { name: "Name", shortName: "Short", description: "Description" };

test("the precache list has the home page, every page, the 404 page, and the search index", () => {
  const urls = precacheUrls("");
  for (const url of ["/", "/404.html", "/search-index.json", ...PAGES.map((page) => page.href)]) {
    assert.ok(urls.includes(url), url);
  }
  assert.equal(new Set(urls).size, urls.length, "no duplicates");
});

test("every precache URL starts with the basePath", () => {
  for (const url of precacheUrls("/repo")) assert.ok(url.startsWith("/repo/"), url);
});

test("the manifest URLs start with the basePath", () => {
  const manifest = webManifest("/repo", SITE);
  assert.equal(manifest.start_url, "/repo/");
  assert.equal(manifest.scope, "/repo/");
  assert.equal(manifest.id, "/repo/");
  for (const icon of manifest.icons ?? []) assert.ok(icon.src.startsWith("/repo/icons/"), icon.src);
});

test("the manifest has a 192 px icon, a 512 px icon, and a maskable icon, and each file exists", () => {
  const icons = webManifest("", SITE).icons ?? [];
  assert.ok(icons.some((icon) => icon.sizes === "192x192" && icon.purpose === "any"));
  assert.ok(icons.some((icon) => icon.sizes === "512x512" && icon.purpose === "any"));
  assert.ok(icons.some((icon) => icon.purpose === "maskable"));
  for (const icon of icons) assert.ok(existsSync(join("public", icon.src)), icon.src);
});

test("the asset pattern finds the build files in HTML and stops at an escaped quote", () => {
  const html =
    '<script src="/repo/_next/static/chunks/a-1.js"></script>' +
    '<link href="/repo/_next/static/css/b.css"/>' +
    '<script>self.__next_f.push([1,"\\"/repo/_next/static/chunks/c.js\\""])</script>' +
    '<script src="/other/_next/static/chunks/d.js"></script>';
  const found = [...html.matchAll(new RegExp(assetPattern("/repo"), "g"))].map((match) => match[0]);
  assert.deepEqual(found, [
    "/repo/_next/static/chunks/a-1.js",
    "/repo/_next/static/css/b.css",
    "/repo/_next/static/chunks/c.js",
  ]);
});

test("the service worker source is valid JavaScript and has the cache version", () => {
  const source = serviceWorkerSource("/repo", "v1");
  assert.doesNotThrow(() => new Function(source));
  assert.ok(source.includes('const CACHE = "site-v1";'));
  assert.ok(source.includes('const BASE = "/repo";'));
});
