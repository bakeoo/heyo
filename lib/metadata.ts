import type { Metadata } from 'next'
import { BRAND_NAME, SITE_URL, DOMAIN } from './constants'

/**
 * Ana sayfa SEO metadata yapılandırması.
 * app/layout.tsx tarafından kullanılır.
 */
const title = `Toptan Kokoreç ve Şırdan | ${BRAND_NAME} | Türkiye Geneli`
const description =
  'Türkiye geneli toptan kokoreç ve şırdan tedarikçisi. Günlük taze kesim, soğuk zincir kargo, fatura kesilir. WhatsApp ile hemen fiyat alın.'

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords:
    'toptan kokoreç, şırdan toptan, kokoreç tedarikçi, toptan sakatat, kokoreçci malzeme, toptan şırdan fiyatı',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: BRAND_NAME,
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: '/media/hero/hero-bg.webp',
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
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'geo.region': 'TR',
  },
}

/**
 * Google Ads kampanya sayfası (app/kampanya) için metadata.
 * Reklam trafiği indekslenmesin diye noindex; sadece reklamdan gelen
 * ziyaretçiye hizmet eder.
 */
export const campaignMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Toptan Kokoreç & Şırdan - Hemen Fiyat Al | ${BRAND_NAME}`,
  description:
    'Toptan kokoreç ve şırdan ihtiyacınız için hemen WhatsApp’tan fiyat alın. Günlük taze, soğuk zincir, Türkiye geneli kargo, faturalı teslimat.',
  alternates: {
    canonical: '/kampanya',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export { DOMAIN }
