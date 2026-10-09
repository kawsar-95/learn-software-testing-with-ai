import { SITE_URL } from '../lib/site'

export const dynamic = 'force-static'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    ...(SITE_URL && { sitemap: `${SITE_URL}/sitemap.xml` }),
  }
}
