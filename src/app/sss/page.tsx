import type { Metadata } from 'next'
import SiteShell from '@/components/layout/SiteShell'
import Breadcrumbs from '@/components/sections/Breadcrumbs'
import PageHero from '@/components/sections/PageHero'
import Faq from '@/components/sections/Faq'
import ContactCTA from '@/components/sections/ContactCTA'
import JsonLd from '@/components/seo/JsonLd'
import { buildMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { GENERAL_FAQ } from '@/content/faq'

const CRUMBS = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Sıkça Sorulan Sorular', path: '/sss' },
]

export const metadata: Metadata = buildMetadata({
  title: 'Sıkça Sorulan Sorular (SSS) | Toptan Kokoreç & Şırdan | ŞIRDANCI ADO',
  description:
    'Toptan kokoreç ve şırdan siparişi, minimum miktar, kargo, fatura ve teslimat hakkında sık sorulan sorular ve yanıtları.',
  path: '/sss',
  keywords:
    'toptan kokoreç sss, toptan şırdan sipariş, minimum sipariş miktarı, toptan sakatat kargo, faturalı toptan et',
})

export default function SssPage() {
  return (
    <SiteShell>
      <Breadcrumbs items={CRUMBS} />

      <PageHero
        title="Sıkça Sorulan Sorular"
        subtitle="Toptan sipariş, teslimat, fatura ve tazelik hakkında en çok merak edilenleri yanıtladık."
        location="sss"
      />

      <Faq
        items={GENERAL_FAQ}
        eyebrow="SSS"
        title="Sıkça Sorulan Sorular"
        className="bg-background"
      />

      <ContactCTA />

      <JsonLd id="ld-breadcrumb" data={breadcrumbJsonLd(CRUMBS)} />
      <JsonLd id="ld-faq" data={faqJsonLd(GENERAL_FAQ)} />
    </SiteShell>
  )
}
