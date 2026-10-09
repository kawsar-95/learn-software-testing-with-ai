/**
 * The installable app: the web manifest and the service worker. Every URL
 * starts with the basePath ("" locally, "/<repo-name>" on GitHub Pages).
 */
import type { MetadataRoute } from "next";
import { PAGES } from "./nav.ts";

const ICONS = [
  { file: "icon-192.png", sizes: "192x192", purpose: "any" },
  { file: "icon-512.png", sizes: "512x512", purpose: "any" },
  { file: "icon-maskable-512.png", sizes: "512x512", purpose: "maskable" },
] as const;

/** The colors of the dark theme (globals.css): the splash screen and the title bar. */
const BACKGROUND = "#0f1013";

export function webManifest(
  basePath: string,
  site: { name: string; shortName: string; description: string },
): MetadataRoute.Manifest {
  return {
    id: `${basePath}/`,
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: BACKGROUND,
    theme_color: BACKGROUND,
    icons: ICONS.map((icon) => ({
      src: `${basePath}/icons/${icon.file}`,
      sizes: icon.sizes,
      type: "image/png",
      purpose: icon.purpose,
    })),
  };
}

/** The 404 page. The service worker shows it for a page that is not in the cache when the reader is offline. */
export const offlinePage = (basePath: string) => `${basePath}/404.html`;

/** The URLs that the service worker caches at install, so that every page opens offline. */
export function precacheUrls(basePath: string): string[] {
  return [
    `${basePath}/`,
    ...PAGES.map((page) => `${basePath}${page.href}`),
    offlinePage(basePath),
    `${basePath}/search-index.json`,
    `${basePath}/manifest.webmanifest`,
    ...ICONS.map((icon) => `${basePath}/icons/${icon.file}`),
  ];
}

/**
 * Matches the hashed build files (JS, CSS, fonts) in a page's HTML. The
 * service worker caches them with the pages. The match stops at a quote, a
 * space, a parenthesis, or the backslash of an escaped string in a script.
 */
export function assetPattern(basePath: string): string {
  return `${basePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/_next/static/[^"'\\s()\\\\]+`;
}

/**
 * The source of /sw.js.
 * - Install: cache the pages of precacheUrls and the build files that they use.
 * - /_next/static/: cache first. The file names have a content hash.
 * - Other requests: network first, so an online reader always gets the newest page.
 *   The cache answers when the network fails.
 * - Activate: delete the caches of older versions.
 */
export function serviceWorkerSource(basePath: string, version: string): string {
  const constants = {
    CACHE: `site-${version}`,
    BASE: basePath,
    PRECACHE: precacheUrls(basePath),
    OFFLINE: offlinePage(basePath),
    ASSET: assetPattern(basePath),
  };
  return `${Object.entries(constants)
    .map(([name, value]) => `const ${name} = ${JSON.stringify(value)};`)
    .join("\n")}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const assets = new Set();
    await Promise.allSettled(PRECACHE.map(async (url) => {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) return;
      if ((response.headers.get("content-type") || "").includes("text/html")) {
        for (const match of (await response.clone().text()).matchAll(new RegExp(ASSET, "g"))) assets.add(match[0]);
      }
      await cache.put(url, response);
    }));
    await Promise.allSettled([...assets].map((url) => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith("site-") && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith(BASE + "/")) return;
  if (url.pathname.startsWith(BASE + "/_next/static/")) event.respondWith(cacheFirst(request));
  else event.respondWith(networkFirst(request, request.mode === "navigate"));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) await (await caches.open(CACHE)).put(request, response.clone());
  return response;
}

async function networkFirst(request, isPage) {
  try {
    const response = await fetch(request);
    if (response.ok) await (await caches.open(CACHE)).put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await caches.match(request, { ignoreSearch: isPage });
    if (cached) return cached;
    const offline = isPage && (await caches.match(OFFLINE));
    if (offline) return offline;
    throw error;
  }
}
`;
}
