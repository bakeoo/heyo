import Link from 'next/link'
import {
  BRAND_NAME,
  DOMAIN,
  PHONE_DISPLAY,
  ADDRESS,
  NAV_LINKS,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  isPlaceholder,
} from '@/config/site'
import { LOCATIONS } from '@/content/locations'
import Container from '@/components/ui/Container'
import ContactLink from '@/components/ui/ContactLink'
import { InstagramIcon } from '@/components/icons'

export default function Footer() {
  const year = 2026 // güncel yıl; gerekirse elle güncellenebilir

  return (
    <footer className="bg-ink text-white/80">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marka + açıklama */}
          <div>
            <p className="font-heading text-xl font-bold text-white">
              <span className="text-brand">●</span> {BRAND_NAME}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              Türkiye geneli toptan kokoreç, şırdan ve midye tedarikçisi. Günlük
              taze ürün, soğuk zincir kargo ve faturalı teslimat ile
              işletmenizin güvenilir çözüm ortağı.
            </p>
          </div>

          {/* Hızlı linkler */}
          <nav aria-label="Hızlı bağlantılar">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
              Hızlı Linkler
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hizmet bölgeleri (yerel SEO iç linkleri) */}
          <nav aria-label="Hizmet bölgeleri">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
              Hizmet Bölgeleri
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {LOCATIONS.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/toptan/${loc.slug}`}
                    className="transition hover:text-white"
                  >
                    {loc.city} Toptan Kokoreç, Şırdan, Midye
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
                <ContactLink
                  channel="whatsapp"
                  location="footer"
                  className="transition hover:text-white"
                >
                  WhatsApp: <span dir="ltr">{PHONE_DISPLAY}</span>
                </ContactLink>
              </li>
              <li>
                <ContactLink
                  channel="phone"
                  location="footer"
                  className="transition hover:text-white"
                >
                  Telefon: <span dir="ltr">{PHONE_DISPLAY}</span>
                </ContactLink>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram: @{INSTAGRAM_HANDLE}
                </a>
              </li>
              {/* Adres ancak gerçek değer girildiğinde gösterilir */}
              {!isPlaceholder(ADDRESS) && <li>Adres: {ADDRESS}</li>}
            </ul>
          </div>
        </div>

        {/* Alt satır */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          © {year} {BRAND_NAME} — Tüm hakları saklıdır. · {DOMAIN}
        </div>
      </Container>
    </footer>
  )
}
