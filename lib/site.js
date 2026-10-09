import { getPageMap } from 'nextra/page-map'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || null
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || null

function collectRoutes(items) {
  return items.flatMap((item) => {
    if (item.children) return collectRoutes(item.children)
    return item.route ? [item.route] : []
  })
}

export async function allRoutes() {
  const routes = collectRoutes(await getPageMap())
  return routes.map((route) => (route.endsWith('/') ? route : `${route}/`))
}
