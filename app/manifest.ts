import type { MetadataRoute } from "next";
import { webManifest } from "@/lib/pwa";
import { BASE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from "@/lib/site";

export const dynamic = "force-static";

/** /manifest.webmanifest: the name, colors, and icons of the installed app. */
export default function manifest(): MetadataRoute.Manifest {
  return webManifest(BASE_PATH, { name: SITE_NAME, shortName: SITE_SHORT_NAME, description: SITE_DESCRIPTION });
}
