import type { Metadata } from 'next'
import { Oswald, Inter } from 'next/font/google'
import './globals.css'
import { buildMetadata, localBusinessJsonLd } from '@/lib/seo'
import Analytics from '@/components/analytics/Analytics'
import JsonLd from '@/components/seo/JsonLd'

/**
 * Başlık fontu: Oswald (güçlü, endüstriyel) — 600 ve 700 ağırlıkları.
 * CSS değişkeni olarak tanımlanır, tailwind.config.ts'de kullanılır.
 */
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

/**
 * Gövde fontu: Inter (okunabilir, modern) — 400 ve 500 ağırlıkları.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

/**
 * Site geneli / ana sayfa metadata'sı. Alt sayfalar kendi `metadata`'sını
 * export ederek bunu geçersiz kılar.
 */
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
    <html lang="tr" className={`${oswald.variable} ${inter.variable}`}>
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
