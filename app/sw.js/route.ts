import { serviceWorkerSource } from "@/lib/pwa";
import { BASE_PATH } from "@/lib/site";

export const dynamic = "force-static";

/** /sw.js, written at build time. A new build gets a new cache version. */
export function GET() {
  return new Response(serviceWorkerSource(BASE_PATH, Date.now().toString(36)), {
    headers: { "Content-Type": "text/javascript; charset=utf-8" },
  });
}
