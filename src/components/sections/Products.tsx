import Image from 'next/image'
import { BLUR_DATA_URL } from '@/config/site'
import { PRODUCTS } from '@/content/products'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactLink from '@/components/ui/ContactLink'
import { WhatsAppIcon } from '@/components/icons'

/**
 * Ürünler section.
 * Varsayılan: tüm ürünler. `ids` verilirse yalnızca o ürünler gösterilir
 * (kategori sayfalarında ilgili ürünleri öne çıkarmak için).
 *
 * @param ids     Gösterilecek ürün id'leri (verilmezse hepsi)
 * @param eyebrow Başlık üstü küçük etiket
 * @param title   Section başlığı
 */
export default function Products({
  ids,
  eyebrow = 'Toptan Tedarik',
  title = 'Ürünlerimiz',
}: {
  ids?: string[]
  eyebrow?: string
  title?: string
} = {}) {
  const items = ids ? PRODUCTS.filter((p) => ids.includes(p.id)) : PRODUCTS

  return (
    <Section id="urunler" className="bg-background">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-soft transition hover:shadow-lg"
            >
              {/* Ürün fotoğrafı 4/3 oran */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-line">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>

              {/* İçerik */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-semibold text-ink">
                  {product.name}
                </h3>
                <p className="mt-2 text-muted">{product.description}</p>
                <p className="mt-3 text-sm font-medium text-ink">
                  Min. sipariş:{' '}
                  <span className="text-brand">{product.minOrder}</span>
                </p>

                <ContactLink
                  channel="whatsapp"
                  message={product.waMessage}
                  location="products"
                  extra={{ product: product.id }}
                  className="btn-whatsapp mt-6 w-full"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Fiyat Al
                </ContactLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
