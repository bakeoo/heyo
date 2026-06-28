import Image from 'next/image'
import { GALLERY, BLUR_DATA_URL } from '@/lib/constants'

/**
 * "Üretimimizden" galeri section.
 * 6 fotoğraf, desktop 3x2, mobil 2 kolon.
 * Hover'da hafif zoom (scale 1.03). Lightbox yok — sadelik ve hız önceliği.
 * Tüm görseller next/image ile lazy load.
 */
export default function Gallery() {
  return (
    <section id="galeri" className="section bg-surface">
      <div className="container-site">
        <div className="mb-12 text-center">
          <span className="eyebrow">Mutfaktan Kareler</span>
          <h2 className="h2-title">Üretimimizden</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {GALLERY.map((img) => (
            <div
              key={img.src}
              className="relative aspect-square overflow-hidden rounded-card bg-line"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover transition duration-300 hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
