import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/nav";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** The home page and the 17 tutorial pages. Empty without NEXT_PUBLIC_SITE_URL. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];
  return ["/", ...PAGES.map((page) => page.href)].map((path) => ({ url: `${SITE_URL}${path}` }));
}
