import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/site'
import { LOCATIONS } from '@/content/locations'

// Statik export için sitemap.xml üretir (out/sitemap.xml).
export const dynamic = 'force-static'

type Route = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}

/**
 * Sabit rotalar. Şehir sayfaları LOCATIONS'tan otomatik eklenir.
 * Yeni indekslenebilir sayfa ekledikçe buraya bir satır ekle.
 * (Kampanya sayfası noindex olduğu için yok.)
 */
const STATIC_ROUTES: Route[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/toptan-sirdan', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/toptan-kokorec', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/sss', priority: 0.6, changeFrequency: 'monthly' },
]

// Şehir sayfaları (yerel SEO)
const CITY_ROUTES: Route[] = LOCATIONS.map((c) => ({
  path: `/toptan/${c.slug}`,
  priority: 0.8,
  changeFrequency: 'monthly',
}))

export default function sitemap(): MetadataRoute.Sitemap {
  // trailingSlash: true ile uyumlu olsun diye sonda eğik çizgi
  return [...STATIC_ROUTES, ...CITY_ROUTES].map((route) => ({
    url: route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}/`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
