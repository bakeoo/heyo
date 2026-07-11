'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BRAND_NAME,
  BRAND_LOGO,
  PHONE_NUMBER,
  WA_MESSAGES,
  NAV_LINKS,
} from '@/config/site'
import Container from '@/components/ui/Container'
import ContactLink from '@/components/ui/ContactLink'
import { WhatsAppIcon, PhoneIcon } from '@/components/icons'

/**
 * Sticky header + responsive navbar.
 * - Masaüstü: logo + navigasyon linkleri + Ara/WhatsApp butonları
 * - Mobil: logo + WhatsApp butonu + hamburger menü (linkler + Ara içeride)
 * - Scroll edildiğinde hafif gölge eklenir.
 *
 * @param minimal true verilirse (kampanya sayfası) navigasyon ve hamburger
 *                gizlenir; sadece logo + WhatsApp kalır.
 */
export default function Header({ minimal = false }: { minimal?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll'da gölge
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape ile mobil menüyü kapat
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/95 backdrop-blur transition ${
        scrolled ? 'shadow-header' : 'shadow-none'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Logo + marka yazısı */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${BRAND_NAME} ana sayfa`}
        >
          <Image
            src={BRAND_LOGO}
            alt={BRAND_NAME}
            width={256}
            height={256}
            priority
            className="h-12 w-12"
          />
          {/* Amblem zaten markayı içerir; dar ekranda yazıyı gizle */}
          <span className="hidden font-brand text-xl font-bold tracking-wide text-ink sm:inline-block sm:text-2xl">
            {BRAND_NAME}
          </span>
        </Link>

        {/* Masaüstü navigasyon */}
        {!minimal && (
          <nav
            aria-label="Ana menü"
            className="hidden flex-1 items-center justify-center gap-7 lg:gap-8 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink transition hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Sağ taraf */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Ara butonu (masaüstü) */}
          {!minimal && (
            <ContactLink
              channel="phone"
              location="header"
              className="btn-outline hidden px-4 py-2.5 text-sm sm:text-base md:inline-flex"
              ariaLabel={`Telefon ile ara: ${PHONE_NUMBER}`}
            >
              <PhoneIcon className="h-4 w-4" />
              Ara
            </ContactLink>
          )}

          {/* WhatsApp butonu (her zaman) */}
          <ContactLink
            channel="whatsapp"
            message={WA_MESSAGES.general}
            location="header"
            className="btn-whatsapp px-4 py-2.5 text-sm sm:text-base"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </ContactLink>

          {/* Hamburger (mobil) */}
          {!minimal && (
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition hover:bg-surface md:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          )}
        </div>
      </Container>

      {/* Mobil menü paneli */}
      {!minimal && menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobil menü"
          className="border-t border-line bg-background md:hidden"
        >
          <Container className="flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-2 py-3 text-base font-medium text-ink transition hover:bg-surface hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
            {/* Ara CTA (menü içinde) */}
            <ContactLink
              channel="phone"
              location="header-mobile"
              className="btn-outline mt-2 w-full"
              ariaLabel={`Telefon ile ara: ${PHONE_NUMBER}`}
            >
              <PhoneIcon className="h-5 w-5" />
              Hemen Ara
            </ContactLink>
          </Container>
        </nav>
      )}
    </header>
  )
}

/* --- Hamburger ikonları (yalnızca header içinde kullanılır) --- */

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
