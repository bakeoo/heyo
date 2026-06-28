'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  BRAND_NAME,
  PHONE_NUMBER,
  WA_MESSAGES,
  waLink,
  telLink,
} from '@/lib/constants'
import { trackContactClick } from '@/lib/analytics'
import { WhatsAppIcon, PhoneIcon } from './icons'

/**
 * Sticky header.
 * - Sol: marka logosu (kırmızı aksanlı)
 * - Sağ: WhatsApp + Telefon butonları (mobilde de iki buton görünür)
 * - Scroll edildiğinde hafif gölge eklenir.
 *
 * @param minimal true verilirse (kampanya sayfası) navigasyon linkleri
 *                ve telefon butonu gizlenir, sadece logo + WhatsApp kalır.
 */
export default function Header({ minimal = false }: { minimal?: boolean }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/95 backdrop-blur transition ${
        scrolled ? 'shadow-header' : 'shadow-none'
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl"
          aria-label={`${BRAND_NAME} ana sayfa`}
        >
          <span className="text-brand">●</span> {BRAND_NAME}
        </Link>

        {/* Sağ taraf butonları */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!minimal && (
            <a
              href={telLink()}
              onClick={() => trackContactClick('phone', { location: 'header' })}
              className="btn-outline px-4 py-2.5 text-sm sm:text-base"
              aria-label={`Telefon ile ara: ${PHONE_NUMBER}`}
            >
              <PhoneIcon className="h-4 w-4" />
              Ara
            </a>
          )}
          <a
            href={waLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick('whatsapp', { location: 'header' })}
            className="btn-whatsapp px-4 py-2.5 text-sm sm:text-base"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
