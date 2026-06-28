'use client'

import Image from 'next/image'
import { PRODUCTS, BLUR_DATA_URL, waLink } from '@/lib/constants'
import { trackContactClick } from '@/lib/analytics'
import { WhatsAppIcon } from './icons'

/**
 * Ürünler section.
 * 3 ürün kartı (mobilde alt alta). Her kartta fotoğraf (4/3),
 * ad, açıklama, min. sipariş ve ürüne özel WhatsApp "Fiyat Al" butonu.
 */
export default function Products() {
  return (
    <section id="urunler" className="section bg-background">
      <div className="container-site">
        <div className="mb-12 text-center">
          <span className="eyebrow">Toptan Tedarik</span>
          <h2 className="h2-title">Ürünlerimiz</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
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

                <a
                  href={waLink(product.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackContactClick('whatsapp', {
                      location: 'products',
                      product: product.id,
                    })
                  }
                  className="btn-whatsapp mt-6 w-full"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Fiyat Al
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
