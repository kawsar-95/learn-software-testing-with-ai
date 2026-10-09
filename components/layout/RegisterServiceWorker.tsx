"use client";

import { useEffect } from "react";
import { BASE_PATH } from "@/lib/site";

/**
 * Registers /sw.js (app/sw.js/route.ts) in production builds. The dev server
 * gets no service worker, so its pages never come from an old cache.
 */
export function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    // Without a service worker the site still works online, so a failure only logs.
    navigator.serviceWorker
      .register(`${BASE_PATH}/sw.js`, { scope: `${BASE_PATH}/` })
      .catch((error) => console.warn("Service worker registration failed:", error));
  }, []);
  return null;
}
