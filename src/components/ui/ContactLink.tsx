'use client'

import { waLink, telLink, WA_MESSAGES } from '@/config/site'
import { trackContactClick } from '@/lib/analytics'

/**
 * Tüm iletişim tıklamaları için tek merkez.
 * - channel='whatsapp' → wa.me linki (encode'lu mesaj), yeni sekme
 * - channel='phone'    → tel: linki
 * Her tıklamada gtag `contact_click` dönüşüm event'i tetiklenir
 * (gtag yoksa sessizce atlanır).
 *
 * Stil tamamen `className` ile verilir; hem büyük butonlar hem de
 * satır içi metin linkleri için kullanılır.
 */
export default function ContactLink({
  channel,
  message = WA_MESSAGES.general,
  location,
  extra,
  className,
  ariaLabel,
  children,
}: {
  channel: 'whatsapp' | 'phone'
  /** channel='whatsapp' için hazır mesaj (varsayılan: genel talep) */
  message?: string
  /** Analytics'te tıklamanın konumu (örn. 'hero', 'footer') */
  location: string
  /** Ek analytics parametreleri (örn. { product: 'sirdan' }) */
  extra?: Record<string, unknown>
  className?: string
  ariaLabel?: string
  children: React.ReactNode
}) {
  const isWhatsApp = channel === 'whatsapp'
  const href = isWhatsApp ? waLink(message) : telLink()

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackContactClick(channel, { location, ...extra })}
      {...(isWhatsApp
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {children}
    </a>
  )
}
