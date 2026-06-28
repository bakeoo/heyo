'use client'

import {
  WHATSAPP_NUMBER,
  PHONE_NUMBER,
  WA_MESSAGES,
  waLink,
  telLink,
} from '@/lib/constants'
import { trackContactClick } from '@/lib/analytics'
import { WhatsAppIcon, PhoneIcon } from './icons'

/**
 * İletişim / CTA section.
 * Büyük kırmızı arka plan + 2 iletişim kartı (WhatsApp / Telefon).
 */
export default function ContactCTA() {
  return (
    <section id="iletisim" className="section bg-brand text-white">
      <div className="container-site">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-white/80">
            Bize Ulaşın
          </span>
          <h2 className="text-h2-m font-bold sm:text-h2-d">Hemen Teklif Al</h2>
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
              {WHATSAPP_NUMBER}
            </p>
            <a
              href={waLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick('whatsapp', { location: 'contact' })}
              className="btn-whatsapp mt-6 w-full"
            >
              Mesaj Gönder
            </a>
          </div>

          {/* Telefon kartı */}
          <div className="flex flex-col items-center rounded-card bg-white/10 p-8 text-center backdrop-blur">
            <PhoneIcon className="h-10 w-10 text-white" />
            <h3 className="mt-4 font-heading text-lg font-semibold">Telefon</h3>
            <p className="mt-1 text-white/90" dir="ltr">
              {PHONE_NUMBER}
            </p>
            <a
              href={telLink()}
              onClick={() => trackContactClick('phone', { location: 'contact' })}
              className="btn mt-6 w-full bg-white text-brand hover:bg-white/90"
            >
              Hemen Ara
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
