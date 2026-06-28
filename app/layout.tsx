import type { Metadata } from 'next'
import { Oswald, Inter } from 'next/font/google'
import './globals.css'
import { siteMetadata } from '@/lib/metadata'
import StructuredData from '@/components/StructuredData'
import Analytics from '@/components/Analytics'

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

// SEO metadata (lib/metadata.ts içinde tanımlı)
export const metadata: Metadata = siteMetadata

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
        <StructuredData />
        {children}
      </body>
    </html>
  )
}
