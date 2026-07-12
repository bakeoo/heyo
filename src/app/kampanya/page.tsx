import type { Metadata } from 'next'
import { BRAND_NAME, DOMAIN } from '@/config/site'
import { TRUST_POINTS } from '@/content/home'
import { buildMetadata } from '@/lib/seo'
import Header from '@/components/layout/Header'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import Hero from '@/components/sections/Hero'
import Products from '@/components/sections/Products'
import ContactCTA from '@/components/sections/ContactCTA'
import Container from '@/components/ui/Container'

// Kampanya sayfası metadata (noindex — sadece reklam trafiği)
export const metadata: Metadata = buildMetadata({
  title: `Toptan Kokoreç, Şırdan & Midye - Hemen Fiyat Al | ${BRAND_NAME}`,
  description:
    'Toptan kokoreç, şırdan ve midye ihtiyacınız için hemen WhatsApp’tan fiyat alın. Günlük taze, soğuk zincir, Türkiye geneli kargo, faturalı teslimat.',
  path: '/kampanya',
  noindex: true,
})

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
          title="Toptan Kokoreç, Şırdan ve Midye — Hemen Fiyat Alın"
          subtitle="Günlük taze, soğuk zincir kargo, faturalı teslimat. Türkiye'nin her yerine toptan tedarik. WhatsApp'tan dakikalar içinde fiyat alın."
        />

        {/* Güven unsurları şeridi */}
        <section className="bg-surface py-6">
          <Container>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm font-medium text-ink sm:text-base">
              {TRUST_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Container>
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
        <p className="mt-2">
          © 2026 {BRAND_NAME} · {DOMAIN}
        </p>
      </footer>

      {/* Sabit WhatsApp butonu */}
      <WhatsAppFloat />
    </>
  )
}
