/**
 * ============================================================
 *  SEO YARDIMCILARI
 * ============================================================
 *  Merkezi metadata üreticisi + JSON-LD (yapısal veri) üreticileri.
 *  Her yeni sayfa `buildMetadata()` ile tutarlı SEO etiketleri alır;
 *  gerektiğinde JSON-LD üreticileriyle zengin sonuç verisi eklenir.
 * ============================================================
 */
import type { Metadata } from 'next'
import {
  SITE_URL,
  BRAND_NAME,
  BRAND_DESCRIPTION,
  PHONE_NUMBER,
  ADDRESS,
  isPlaceholder,
} from '@/config/site'
import type { Product } from '@/content/products'

/** Kanonik yolu tam URL'ye çevirir ('/' → site kökü). */
function absoluteUrl(path = '/'): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}

export interface PageSeo {
  /** Sekme/başlık — markayı da içermeli (şablon uygulanmaz) */
  title: string
  description: string
  /** Kanonik yol, örn. '/toptan-sirdan' (varsayılan '/') */
  path?: string
  keywords?: string
  /** OG görseli (public/ altında) */
  ogImage?: string
  /** Arama motorlarında gizle (örn. reklam açılış sayfası) */
  noindex?: boolean
}

/**
 * Sayfa metadata'sı üretir (title, description, canonical, OpenGraph,
 * Twitter, robots). Tüm sayfalar bunu kullanır.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  keywords,
  ogImage = '/media/hero/hero-bg.webp',
  noindex = false,
}: PageSeo): Metadata {
  const url = absoluteUrl(path)

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND_NAME,
      type: 'website',
      locale: 'tr_TR',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'toptan-kokorec-ve-sirdan-tedarikcisi',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    other: { 'geo.region': 'TR' },
  }
}

/* ============================================================
 *  JSON-LD (schema.org) üreticileri
 *  Düz obje döndürürler; <JsonLd data={...} /> ile sayfaya gömülür.
 * ============================================================ */

/** LocalBusiness — işletmenin Google tarafından tanınması için. */
export function localBusinessJsonLd() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND_NAME,
    description: BRAND_DESCRIPTION,
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      // Adres girildiyse ekle
      ...(!isPlaceholder(ADDRESS) ? { streetAddress: ADDRESS } : {}),
    },
    areaServed: 'TR',
  }
  return data
}

/** Ürün — ürün detay sayfaları için (fiyat gösterilmez). */
export function productJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    brand: { '@type': 'Brand', name: BRAND_NAME },
  }
}

/** BreadcrumbList — sayfa yolu (ana sayfa > alt sayfa). */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** FAQPage — sıkça sorulan sorular (SEO için değerli). */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
