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
import { PRODUCTS } from '@/content/products'
import type { CategoryContent } from '@/content/categories'
import {
  breadcrumbJsonLd,
  faqJsonLd,
  productJsonLd,
} from '@/lib/seo'

/**
 * Kategori (SEO açılış) sayfası şablonu.
 * Verilen kategori içeriğinden tam sayfayı kurar: breadcrumb, hero,
 * SEO metni + öne çıkanlar, ilgili ürünler, güven/süreç section'ları,
 * SSS ve iletişim CTA'sı. JSON-LD (breadcrumb, ürün, FAQ) otomatik eklenir.
 */
export default function CategoryPage({ category }: { category: CategoryContent }) {
  const path = `/${category.slug}`
  const products = PRODUCTS.filter((p) => category.productIds.includes(p.id))

  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { name: 'Ana Sayfa', path: '/' },
          { name: category.name, path },
        ]}
      />

      <PageHero
        title={category.h1}
        subtitle={category.heroSubtitle}
        waMessage={category.waMessage}
        location={category.slug}
      />

      {/* SEO metni + öne çıkanlar */}
      <Section className="bg-background">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            {/* Giriş paragrafları */}
            <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              {category.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Öne çıkanlar */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {category.highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-card border border-line bg-surface p-5 shadow-soft"
                >
                  <h3 className="font-heading text-base font-semibold text-ink">
                    {h.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* İlgili ürünler */}
      <Products
        ids={category.productIds}
        eyebrow="Toptan Tedarik"
        title="Ürünler"
      />

      <WhyUs />
      <HowItWorks />

      <Faq items={category.faq} title={`${category.name} — Sıkça Sorulanlar`} />

      <ContactCTA />

      {/* ---- Yapısal veri (JSON-LD) ---- */}
      <JsonLd
        id="ld-breadcrumb"
        data={breadcrumbJsonLd([
          { name: 'Ana Sayfa', path: '/' },
          { name: category.name, path },
        ])}
      />
      {products.map((product) => (
        <JsonLd
          key={product.id}
          id={`ld-product-${product.id}`}
          data={productJsonLd(product)}
        />
      ))}
      <JsonLd id="ld-faq" data={faqJsonLd(category.faq)} />
    </SiteShell>
  )
}
