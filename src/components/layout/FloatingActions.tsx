import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/config/site'
import ContactLink from '@/components/ui/ContactLink'
import { WhatsAppIcon, InstagramIcon } from '@/components/icons'

// Instagram marka gradyanı
const IG_GRADIENT =
  'linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'

/**
 * Sağ altta sabit (floating) aksiyon butonları: WhatsApp + Instagram.
 * Her ikisi de daire; üzerine gelince (hover/odak) etiketi açılır.
 * Her sayfada görünür (SiteShell + kampanya).
 */
export default function FloatingActions() {
  return (
    <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-5 z-50 flex flex-col items-end gap-3">
      {/* Instagram */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram: @${INSTAGRAM_HANDLE}`}
        style={{ backgroundImage: IG_GRADIENT }}
        className="group flex h-14 w-14 items-center justify-end overflow-hidden rounded-full text-white shadow-lg transition-all duration-300 hover:w-40 focus-visible:w-40"
      >
        <span className="whitespace-nowrap pl-4 pr-2 text-sm font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          Takip Et
        </span>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center">
          <InstagramIcon className="h-7 w-7" />
        </span>
      </a>

      {/* WhatsApp */}
      <ContactLink
        channel="whatsapp"
        location="float"
        ariaLabel="WhatsApp ile fiyat al"
        className="group flex h-14 w-14 items-center justify-end overflow-hidden rounded-full bg-whatsapp text-white shadow-lg transition-all duration-300 hover:w-40 hover:bg-whatsappDark focus-visible:w-40"
      >
        <span className="whitespace-nowrap pl-4 pr-2 text-sm font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          Fiyat Al
        </span>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center">
          <WhatsAppIcon className="h-7 w-7" />
        </span>
      </ContactLink>
    </div>
  )
}
