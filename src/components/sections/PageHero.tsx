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

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <h1 className="max-w-3xl text-h1-m font-bold leading-tight sm:text-[3.25rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/85 sm:text-xl">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <ContactLink
            channel="whatsapp"
            message={waMessage}
            location={location}
            className="btn-whatsapp text-lg"
          >
            <WhatsAppIcon className="h-6 w-6" />
            WhatsApp&apos;tan Fiyat Al
          </ContactLink>
          <ContactLink
            channel="phone"
            location={location}
            className="btn-outline-white text-lg"
          >
            <PhoneIcon className="h-6 w-6" />
            Hemen Ara
          </ContactLink>
        </div>
      </Container>
    </section>
  )
}
