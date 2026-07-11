import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/site'

// Statik export için sitemap.xml üretir (out/sitemap.xml).
export const dynamic = 'force-static'

/**
 * Sitemap'e dahil edilecek rotalar.
 * Yeni indekslenebilir sayfa ekledikçe buraya bir satır ekle;
 * sitemap otomatik güncellenir. (Kampanya sayfası noindex olduğu için yok.)
 */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
