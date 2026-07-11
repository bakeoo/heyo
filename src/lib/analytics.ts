/**
 * Google Ads / Analytics dönüşüm takibi yardımcıları.
 *
 * Tüm WhatsApp ve telefon tıklamalarında trackContactClick çağrılır.
 * gtag sayfada tanımlı değilse (örn. henüz GA/Ads scripti eklenmemişse)
 * sessizce hiçbir şey yapmaz, hata fırlatmaz.
 */

// window.gtag tipini global olarak bildir
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export type ContactMethod = 'whatsapp' | 'phone' | 'email'

/**
 * Bir iletişim tıklamasını dönüşüm event'i olarak gönderir.
 *
 * @param method Tıklanan iletişim yöntemi
 * @param extra  İsteğe bağlı ek parametreler (örn. ürün adı, konum)
 */
export function trackContactClick(
  method: ContactMethod,
  extra: Record<string, unknown> = {}
): void {
  // gtag yoksa hata verme
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }
  window.gtag('event', 'contact_click', {
    method,
    ...extra,
  })
}
