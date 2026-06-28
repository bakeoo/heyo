'use client'

import { WA_MESSAGES, waLink } from '@/lib/constants'
import { trackContactClick } from '@/lib/analytics'
import { WhatsAppIcon } from './icons'

/**
 * Sabit (floating) WhatsApp butonu.
 * Sağ alt köşede her zaman görünür, min 56px (mobilde kolay tıklanır).
 * Hover'da "Fiyat Al" etiketi açılır.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={waLink(WA_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContactClick('whatsapp', { location: 'float' })}
      aria-label="WhatsApp ile fiyat al"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-end overflow-hidden rounded-full bg-whatsapp text-white shadow-lg transition-all duration-300 hover:w-40 hover:bg-whatsappDark focus-visible:w-40"
    >
      {/* Hover'da açılan etiket */}
      <span className="whitespace-nowrap pl-4 pr-2 text-sm font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        Fiyat Al
      </span>
      {/* İkon her zaman görünür (sağda sabit, 56px daire merkezinde) */}
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </a>
  )
}
