import Link from 'next/link'
import SiteShell from '@/components/layout/SiteShell'
import Breadcrumbs from '@/components/sections/Breadcrumbs'
import PageHero from '@/components/sections/PageHero'
import Products from '@/components/sections/Products'
import WhyUs from '@/components/sections/WhyUs'
import HowItWorks from '@/components/sections/HowItWorks'
import Faq from '@/components/sections/Faq'
import ContactCTA from '@/components/sections/ContactCTA'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import JsonLd from '@/components/seo/JsonLd'
import type { CityContent } from '@/content/locations'
import type { FaqItem } from '@/content/categories'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'

/** Şehre özel SSS üretir (Türkçe ek sorunlarından kaçınacak şekilde). */
function cityFaq(city: string): FaqItem[] {
  return [
    {
      question: `${city} için toptan teslimat yapıyor musunuz?`,
      answer: `Evet, ${city} ve çevresine soğuk zincir kargo ile toptan kokoreç ve şırdan teslimatı yapıyoruz; ürünler tazeliğini koruyarak adresinize ulaşır.`,
    },
    {
      question: `${city} için minimum sipariş miktarı ve fiyat nasıl?`,
      answer: `Ürün başına minimum 20 kg’dan başlıyoruz. Fiyat, güncel piyasaya ve miktara göre belirlenir; ${city} için WhatsApp’tan yazın, size özel teklifi hemen iletelim.`,
    },
  ]
}

/**
 * Şehir (yerel SEO) sayfası şablonu.
 * Şehre özgü giriş metni + kategori sayfalarına iç link + tüm ürünler +
 * güven/süreç section'ları + şehre özel SSS + iletişim CTA.
 * JSON-LD: BreadcrumbList + FAQPage.
 */
export default function CityPage({ city }: { city: CityContent }) {
  const path = `/toptan/${city.slug}`
  const faq = cityFaq(city.city)
  const crumbs = [
    { name: 'Ana Sayfa', path: '/' },
    { name: `${city.city} Toptan`, path },
  ]

  return (
    <SiteShell>
      <Breadcrumbs items={crumbs} />

      <PageHero
        title={city.h1}
        subtitle={city.heroSubtitle}
        location={`sehir-${city.slug}`}
      />

      {/* Şehre özel SEO metni + kategori iç linkleri */}
      <Section className="bg-background">
        <Container>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {city.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* İç link: kategori sayfaları */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/toptan-sirdan"
              className="btn-outline px-5 py-2.5 text-sm"
            >
              Toptan Şırdan
            </Link>
            <Link
              href="/toptan-kokorec"
              className="btn-outline px-5 py-2.5 text-sm"
            >
              Toptan Kokoreç
            </Link>
          </div>
        </Container>
      </Section>

      <Products eyebrow="Toptan Tedarik" title="Ürünlerimiz" />
      <WhyUs />
      <HowItWorks />

      <Faq items={faq} title={`${city.city} — Sıkça Sorulanlar`} />

      <ContactCTA />

      {/* ---- Yapısal veri ---- */}
      <JsonLd id="ld-breadcrumb" data={breadcrumbJsonLd(crumbs)} />
      <JsonLd id="ld-faq" data={faqJsonLd(faq)} />
    </SiteShell>
  )
}
