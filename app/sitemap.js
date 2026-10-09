import { SITE_URL, allRoutes } from '../lib/site'

export const dynamic = 'force-static'

export default async function sitemap() {
  if (!SITE_URL) return []
  return (await allRoutes()).map((route) => ({ url: SITE_URL + route }))
}
