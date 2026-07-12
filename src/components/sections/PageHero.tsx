import Container from '@/components/ui/Container'
import ContactLink from '@/components/ui/ContactLink'
import { WhatsAppIcon, PhoneIcon } from '@/components/icons'

/**
 * İç sayfa hero'su (videosuz, kompakt). Kategori/şehir/SSS sayfalarında
 * H1 + alt başlık + 2 CTA gösterir. Premium his için koyu zemin + hafif
 * marka rengi ışıması.
 */
export default function PageHero({
  title,
  subtitle,
  waMessage,
  location,
}: {
  title: string
  subtitle: string
  waMessage?: string
  location: string
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Marka rengi yumuşak ışıma (dekoratif) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
      />

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <h1 className="max-w-3xl text-[2rem] font-bold leading-[1.18] sm:text-4xl sm:leading-[1.12] lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/85 sm:mt-5 sm:text-xl">
          {subtitle}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          <ContactLink
            channel="whatsapp"
            message={waMessage}
            location={location}
            className="btn-whatsapp w-full text-base sm:w-auto sm:text-lg"
          >
            <WhatsAppIcon className="h-6 w-6" />
            WhatsApp&apos;tan Fiyat Al
          </ContactLink>
          <ContactLink
            channel="phone"
            location={location}
            className="btn-outline-white w-full text-base sm:w-auto sm:text-lg"
          >
            <PhoneIcon className="h-6 w-6" />
            Hemen Ara
          </ContactLink>
        </div>
      </Container>
    </section>
  )
}
