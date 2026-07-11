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
  { path: '/toptan-sirdan', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/toptan-kokorec', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/sss', priority: 0.6, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  // trailingSlash: true ile uyumlu olsun diye sonda eğik çizgi
  return ROUTES.map((route) => ({
    url: route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}/`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
