/**
 * ============================================================
 *  SİTE YAPILANDIRMASI (tek merkez)
 * ============================================================
 *  Marka, iletişim, domain, navigasyon ve link yardımcıları.
 *  Yeni sayfa/section eklerken içerik verisi için `src/content/*`
 *  dosyalarına bak; buradaki değerler tüm site genelinde kullanılır.
 *
 *  Doldurulacak placeholder:
 *    - ADDRESS ... [ADRES]  (placeholder kaldıkça sitede gizlenir)
 * ============================================================
 */

// ---- Domain ----
export const DOMAIN = 'toptansirdanci.com'
export const SITE_URL = `https://${DOMAIN}`

// ---- Marka ----
export const BRAND_NAME = 'ŞIRDANCI ADO'
export const BRAND_DESCRIPTION =
  'Türkiye geneli toptan kokoreç ve şırdan tedarikçisi'
// Logo (256px optimize WebP). Kaynak: public/media/brand/logo_ado.png
export const BRAND_LOGO = '/media/brand/logo.webp'

// ---- İletişim (WhatsApp ve telefon AYNI numara: +90 546 432 4625) ----
// WhatsApp: uluslararası, boşluksuz (wa.me linki için)
export const WHATSAPP_NUMBER = '905464324625'
// Telefon: uluslararası format (tel: linki ve schema için)
export const PHONE_NUMBER = '+905464324625'
// Ekranda gösterilen okunur biçim (tüm görünür numaralar bunu kullanır)
export const PHONE_DISPLAY = '+90 546 432 4625'
// Adres sonra eklenecek. Placeholder ([...]) olduğu sürece sitede gösterilmez.
export const ADDRESS = '[ADRES]'

// ---- Teslimat ----
export const DELIVERY_SCOPE = 'Türkiye geneli (soğuk zincirle kargo)'

// ---- Hazır WhatsApp mesajları ----
export const WA_MESSAGES = {
  // Genel fiyat listesi talebi (header, hero, floating buton, iletişim)
  general: 'Merhaba, toptan ürün fiyat listesi almak istiyorum.',
  // Ürüne özel mesajlar
  kokorecCig: 'Merhaba, toptan çiğ kokoreç fiyatı almak istiyorum.',
  kokorecPismis: 'Merhaba, toptan hazır kokoreç fiyatı almak istiyorum.',
  sirdan: 'Merhaba, toptan şırdan fiyatı almak istiyorum.',
} as const

// ---- Navigasyon (section anchor'ları / ileride gerçek rotalar) ----
export interface NavLink {
  href: string
  label: string
}

export const NAV_LINKS: NavLink[] = [
  { href: '/toptan-sirdan', label: 'Toptan Şırdan' },
  { href: '/toptan-kokorec', label: 'Toptan Kokoreç' },
  { href: '/#neden-biz', label: 'Neden Biz' },
  { href: '/sss', label: 'SSS' },
  { href: '/#iletisim', label: 'İletişim' },
]

// ---- Medya yolları ----
// Not: Video/poster değiştirdiğinde ?v sürüm numarasını artır.
// Aynı dosya adıyla yeni içerik yüklenince tarayıcı/CDN eski dosyayı
// önbellekten servis eder; sürüm etiketi (query) önbelleği atlatır.
export const HERO_MEDIA = {
  poster: '/media/hero/hero-bg.webp',
  video: '/media/hero/hero-video.mp4?v=2',
}

// Açık gri, çok küçük blur veri-URI'si (next/image placeholder="blur").
// Görsel henüz yüklenmemişken bile build kırılmaz.
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjYiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjYiIGZpbGw9IiNlOGU4ZTgiLz48L3N2Zz4='

/* ============================================================
 *  Yardımcı fonksiyonlar
 * ============================================================ */

/**
 * Bir değerin doldurulmamış placeholder olup olmadığını döndürür
 * (örn. "[ADRES]"). true ise ilgili bilgi sitede gizlenir.
 */
export function isPlaceholder(value: string): boolean {
  return value.startsWith('[') && value.endsWith(']')
}

/**
 * tel: linki için telefon numarasını sadeleştirir (boşluk/parantez/tire siler).
 */
export function telLink(phone: string = PHONE_NUMBER): string {
  const cleaned = phone.replace(/[^\d+]/g, '')
  return `tel:${cleaned}`
}

/**
 * WhatsApp tıkla-konuş linki üretir. Mesaj encodeURIComponent ile encode edilir.
 *
 * @param message Önceden hazırlanmış mesaj metni
 * @returns https://wa.me/<numara>?text=<encoded mesaj>
 */
export function waLink(message: string = WA_MESSAGES.general): string {
  const number = WHATSAPP_NUMBER.replace(/[^\d]/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
