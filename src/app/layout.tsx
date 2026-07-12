import type { Metadata, Viewport } from 'next'
import { Oswald } from 'next/font/google'
import './globals.css'
import { buildMetadata, localBusinessJsonLd } from '@/lib/seo'
import Analytics from '@/components/analytics/Analytics'
import JsonLd from '@/components/seo/JsonLd'

/**
 * Tek site fontu: Oswald (güçlü, endüstriyel).
 * Başlık, gövde ve marka yazısı dahil tüm sitede kullanılır.
 * Türkçe karakterler için latin-ext alt kümesi dahil; gövde metni için
 * 400/500, başlıklar için 600/700 ağırlıkları yüklenir.
 */
const oswald = Oswald({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

/**
 * Site geneli / ana sayfa metadata'sı. Alt sayfalar kendi `metadata`'sını
 * export ederek bunu geçersiz kılar.
 */
// Mobil tarayıcı çubuğu rengi + viewport (yakınlaştırma serbest — erişilebilirlik)
export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = buildMetadata({
  title: 'Toptan Kokoreç ve Şırdan | ŞIRDANCI ADO | Türkiye Geneli',
  description:
    'Türkiye geneli toptan kokoreç ve şırdan tedarikçisi. Günlük taze kesim, soğuk zincir kargo, fatura kesilir. WhatsApp ile hemen fiyat alın.',
  path: '/',
  keywords:
    'toptan kokoreç, şırdan toptan, kokoreç tedarikçi, toptan sakatat, kokoreçci malzeme, toptan şırdan fiyatı',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={oswald.variable}>
      <body>
        {/* Google Analytics / Ads (NEXT_PUBLIC_GTAG_ID tanımlıysa yüklenir) */}
        <Analytics />
        {/* JSON-LD yapısal veri (LocalBusiness) */}
        <JsonLd id="ld-localbusiness" data={localBusinessJsonLd()} />
        {children}
      </body>
    </html>
  )
}
