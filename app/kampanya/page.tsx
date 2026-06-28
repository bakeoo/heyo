import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import ContactCTA from '@/components/ContactCTA'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { campaignMetadata } from '@/lib/metadata'
import { BRAND_NAME, DOMAIN } from '@/lib/constants'

// Kampanya sayfası metadata (noindex — sadece reklam trafiği)
export const metadata: Metadata = campaignMetadata

// Güven unsurları (Neden Biz'in kısaltılmış hali)
const TRUST_POINTS = [
  '✅ Günlük Taze Kesim',
  '✅ Soğuk Zincir Teslimat',
  '✅ Türkiye Geneli Kargo',
  '✅ Faturalı & Gıda Belgeli',
  '✅ Toptan Fiyat Garantisi',
]

/**
 * Google Ads açılış sayfası (/kampanya).
 * Ana sayfanın sadeleştirilmiş, dönüşüm odaklı hali.
 * Header minimal (sadece logo + WhatsApp), navigasyon yok.
 * Tüm WhatsApp/telefon tıklamaları bileşenler içinde gtag dönüşüm
 * event'i (contact_click) tetikler.
 */
export default function KampanyaPage() {
  return (
    <>
      {/* Minimal header: sadece logo + WhatsApp */}
      <Header minimal />

      <main>
        {/* Reklam metnine uygun başlık */}
        <Hero
          title="Toptan Kokoreç ve Şırdan — Hemen Fiyat Alın"
          subtitle="Günlük taze, soğuk zincir kargo, faturalı teslimat. Türkiye'nin her yerine toptan tedarik. WhatsApp'tan dakikalar içinde fiyat alın."
        />

        {/* Güven unsurları şeridi */}
        <section className="bg-surface py-6">
          <div className="container-site">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm font-medium text-ink sm:text-base">
              {TRUST_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ürünler */}
        <Products />

        {/* İletişim CTA */}
        <ContactCTA />
      </main>

      {/* Minimal footer */}
      <footer className="bg-ink py-8 text-center text-sm text-white/60">
        <p className="font-heading text-white">
          <span className="text-brand">●</span> {BRAND_NAME}
        </p>
        <p className="mt-2">© 2026 {BRAND_NAME} · {DOMAIN}</p>
      </footer>

      {/* Sabit WhatsApp butonu */}
      <WhatsAppFloat />
    </>
  )
}
