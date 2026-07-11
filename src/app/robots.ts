import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/site'

// Statik export için robots.txt üretir (out/robots.txt).
export const dynamic = 'force-static'

/**
 * robots.txt — /kampanya reklam açılış sayfası indekslenmez.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/kampanya', '/admin'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
