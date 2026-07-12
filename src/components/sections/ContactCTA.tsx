import { PHONE_DISPLAY, WA_MESSAGES } from '@/config/site'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import ContactLink from '@/components/ui/ContactLink'
import { WhatsAppIcon, PhoneIcon } from '@/components/icons'

/**
 * İletişim / CTA section.
 * Büyük kırmızı arka plan + 2 iletişim kartı (WhatsApp / Telefon).
 */
export default function ContactCTA() {
  return (
    <Section id="iletisim" className="bg-brand text-white">
      <Container>
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-white/80">
            Bize Ulaşın
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-h2-d">Hemen Teklif Al</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Toptan kokoreç ve şırdan ihtiyaçlarınız için bizimle iletişime geçin,
            size özel fiyat teklifini hemen alın.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {/* WhatsApp kartı */}
          <div className="flex flex-col items-center rounded-card bg-white/10 p-8 text-center backdrop-blur">
            <WhatsAppIcon className="h-10 w-10 text-white" />
            <h3 className="mt-4 font-heading text-lg font-semibold">WhatsApp</h3>
            <p className="mt-1 text-white/90" dir="ltr">
              {PHONE_DISPLAY}
            </p>
            <ContactLink
              channel="whatsapp"
              message={WA_MESSAGES.general}
              location="contact"
              className="btn-whatsapp mt-6 w-full"
            >
              Mesaj Gönder
            </ContactLink>
          </div>

          {/* Telefon kartı */}
          <div className="flex flex-col items-center rounded-card bg-white/10 p-8 text-center backdrop-blur">
            <PhoneIcon className="h-10 w-10 text-white" />
            <h3 className="mt-4 font-heading text-lg font-semibold">Telefon</h3>
            <p className="mt-1 text-white/90" dir="ltr">
              {PHONE_DISPLAY}
            </p>
            <ContactLink
              channel="phone"
              location="contact"
              className="btn mt-6 w-full bg-white text-brand hover:bg-white/90"
            >
              Hemen Ara
            </ContactLink>
          </div>
        </div>
      </Container>
    </Section>
  )
}
