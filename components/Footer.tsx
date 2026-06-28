'use client'

import Link from 'next/link'
import {
  BRAND_NAME,
  DOMAIN,
  PHONE_NUMBER,
  WHATSAPP_NUMBER,
  EMAIL,
  ADDRESS,
  WORKING_HOURS,
  WA_MESSAGES,
  waLink,
  telLink,
} from '@/lib/constants'
import { trackContactClick } from '@/lib/analytics'

// Footer hızlı linkleri (section anchor'ları)
const QUICK_LINKS = [
  { href: '#urunler', label: 'Ürünler' },
  { href: '#neden-biz', label: 'Neden Biz' },
  { href: '#nasil-calisir', label: 'Sipariş Süreci' },
  { href: '#galeri', label: 'Üretimimizden' },
  { href: '#iletisim', label: 'İletişim' },
]

export default function Footer() {
  const year = 2026 // güncel yıl; gerekirse elle güncellenebilir

  return (
    <footer className="bg-ink text-white/80">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Marka + açıklama */}
          <div>
            <p className="font-heading text-xl font-bold text-white">
              <span className="text-brand">●</span> {BRAND_NAME}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              Türkiye geneli toptan kokoreç ve şırdan tedarikçisi. Günlük taze
              kesim, soğuk zincir kargo ve faturalı teslimat ile işletmenizin
              güvenilir çözüm ortağı.
            </p>
          </div>

          {/* Hızlı linkler */}
          <nav aria-label="Hızlı bağlantılar">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
              Hızlı Linkler
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* İletişim bilgileri */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
              İletişim
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={waLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick('whatsapp', { location: 'footer' })}
                  className="transition hover:text-white"
                >
                  WhatsApp: <span dir="ltr">{WHATSAPP_NUMBER}</span>
                </a>
              </li>
              <li>
                <a
                  href={telLink()}
                  onClick={() => trackContactClick('phone', { location: 'footer' })}
                  className="transition hover:text-white"
                >
                  Telefon: <span dir="ltr">{PHONE_NUMBER}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={() => trackContactClick('email', { location: 'footer' })}
                  className="transition hover:text-white"
                >
                  E-posta: {EMAIL}
                </a>
              </li>
              <li>Adres: {ADDRESS}</li>
              <li>Çalışma: {WORKING_HOURS}</li>
            </ul>
          </div>
        </div>

        {/* Alt satır */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          © {year} {BRAND_NAME} — Tüm hakları saklıdır. · {DOMAIN}
        </div>
      </div>
    </footer>
  )
}
