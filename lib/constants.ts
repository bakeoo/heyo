/**
 * ============================================================
 *  MARKA & İÇERİK SABİTLERİ
 * ============================================================
 *  Tüm marka bilgileri, iletişim numaraları ve hazır WhatsApp
 *  mesajları burada tek yerde tanımlıdır. Siteyi canlıya almadan
 *  önce aşağıdaki PLACEHOLDER değerleri kendi bilgilerinle değiştir.
 *
 *  Değiştirilecek placeholder'lar:
 *    - BRAND_NAME ............. [MARKA_ADI]
 *    - WHATSAPP_NUMBER ........ [WHATSAPP_NUMARASI]  (905XXXXXXXXX)
 *    - PHONE_NUMBER ........... [TELEFON_NUMARASI]   (05XXXXXXXXX)
 *    - EMAIL .................. [EMAIL]
 *    - ADDRESS ................ [ADRES]
 *    - WORKING_HOURS .......... [CALISMA_SAATLERI]
 *    - PRODUCTS[].minOrder .... [MIN_MIKTAR]
 * ============================================================
 */

// ---- Domain ----
export const DOMAIN = 'toptansirdanci.com'
export const SITE_URL = `https://${DOMAIN}`

// ---- Marka ----
export const BRAND_NAME = '[MARKA_ADI]' // TODO: gerçek marka adıyla değiştir

// ---- İletişim ----
// WhatsApp numarası uluslararası formatta, başında "90", boşluksuz: 905XXXXXXXXX
export const WHATSAPP_NUMBER = '[WHATSAPP_NUMARASI]'
// Telefon numarası yerel format: 05XXXXXXXXX
export const PHONE_NUMBER = '[TELEFON_NUMARASI]'
export const EMAIL = '[EMAIL]'
export const ADDRESS = '[ADRES]'
// Çalışma saatleri (schema.org openingHours formatı): örn. "Mo-Sa 08:00-18:00"
export const WORKING_HOURS = '[CALISMA_SAATLERI]'

// Teslimat kapsamı
export const DELIVERY_SCOPE = 'Türkiye geneli (soğuk zincirle kargo)'

/**
 * tel: linki için telefon numarasını sadeleştirir (boşluk/parantez/tire siler).
 */
export function telLink(phone: string = PHONE_NUMBER): string {
  const cleaned = phone.replace(/[^\d+]/g, '')
  return `tel:${cleaned}`
}

/**
 * WhatsApp tıkla-konuş linki üretir.
 * Mesaj encodeURIComponent ile güvenli şekilde encode edilir.
 *
 * @param message Önceden hazırlanmış mesaj metni
 * @returns https://wa.me/<numara>?text=<encoded mesaj>
 */
export function waLink(message: string): string {
  // Numaradan rakam dışı karakterleri temizle
  const number = WHATSAPP_NUMBER.replace(/[^\d]/g, '')
  const text = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${text}`
}

// ---- Hazır WhatsApp mesajları ----
export const WA_MESSAGES = {
  // Genel fiyat listesi talebi (header, hero, floating buton, iletişim)
  general: 'Merhaba, toptan ürün fiyat listesi almak istiyorum.',
  // Ürüne özel mesajlar
  kokorecCig: 'Merhaba, toptan çiğ kokoreç fiyatı almak istiyorum.',
  kokorecPismis: 'Merhaba, toptan hazır kokoreç fiyatı almak istiyorum.',
  sirdan: 'Merhaba, toptan şırdan fiyatı almak istiyorum.',
} as const

// ---- Ürünler ----
export interface Product {
  id: string
  name: string
  description: string
  minOrder: string // [MIN_MIKTAR] kg
  image: string
  imageAlt: string
  waMessage: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'kokorec-cig',
    name: 'Kokoreç (Çiğ)',
    description: 'Günlük taze kesim, temizlenmiş, vakumlu paket.',
    minOrder: '[MIN_MIKTAR] kg', // TODO: minimum sipariş miktarını gir
    image: '/media/products/kokorec-cig.webp',
    imageAlt: 'taze-toptan-cig-kokorec',
    waMessage: WA_MESSAGES.kokorecCig,
  },
  {
    id: 'kokorec-pismis',
    name: 'Kokoreç (Pişmiş / Hazır)',
    description: 'Lezzet garantili, servise hazır, soğuk zincir.',
    minOrder: '[MIN_MIKTAR] kg', // TODO: minimum sipariş miktarını gir
    image: '/media/products/kokorec-pismis.webp',
    imageAlt: 'toptan-hazir-pismis-kokorec',
    waMessage: WA_MESSAGES.kokorecPismis,
  },
  {
    id: 'sirdan',
    name: 'Şırdan',
    description: 'Taze, temizlenmiş, doldurulmaya hazır.',
    minOrder: '[MIN_MIKTAR] kg', // TODO: minimum sipariş miktarını gir
    image: '/media/products/sirdan.webp',
    imageAlt: 'taze-toptan-sirdan',
    waMessage: WA_MESSAGES.sirdan,
  },
]

// ---- "Neden Biz?" maddeleri ----
export interface Feature {
  icon: string // emoji / basit ikon
  title: string
  text: string
}

export const FEATURES: Feature[] = [
  { icon: '🔪', title: 'Günlük Taze Kesim', text: 'Her gün taze kesim, bayatlamış ürün yok.' },
  { icon: '❄️', title: 'Soğuk Zincir Teslimat', text: 'Ürünler bozulmadan, soğuk zincirle kapınızda.' },
  { icon: '🚚', title: 'Türkiye Geneli Kargo', text: 'Tüm illere hızlı ve güvenli sevkiyat.' },
  { icon: '🧾', title: 'Fatura + Gıda Belgeli', text: 'Resmi fatura ve gerekli gıda belgeleri eksiksiz.' },
  { icon: '💰', title: 'Toptan Fiyat Garantisi', text: 'Rekabetçi toptan fiyatlarla maliyetinizi düşürün.' },
  { icon: '⚡', title: 'Hızlı Teslimat', text: 'Sipariş onayından sonra en kısa sürede yola çıkar.' },
]

// ---- "Sipariş Süreci" adımları ----
export interface Step {
  no: number
  title: string
  text: string
}

export const STEPS: Step[] = [
  { no: 1, title: 'İletişime Geç', text: 'WhatsApp veya telefon ile bize ulaşın.' },
  { no: 2, title: 'Fiyat Teklifi Al', text: 'Ürün ve miktarı belirleyin, fiyat teklifinizi alın.' },
  { no: 3, title: 'Kapına Teslim', text: 'Ödeme sonrası soğuk zincirle adresinize teslim.' },
]

// ---- Galeri görselleri ----
export interface GalleryImage {
  src: string
  alt: string
}

export const GALLERY: GalleryImage[] = Array.from({ length: 6 }, (_, i) => ({
  src: `/media/gallery/galeri-${i + 1}.webp`,
  alt: `uretimimizden-foto-${i + 1}`,
}))

// ---- Hero medya yolları ----
export const HERO_MEDIA = {
  poster: '/media/hero/hero-bg.webp',
  video: '/media/hero/hero-video.mp4',
}

/**
 * next/image placeholder="blur" için kullanılan jenerik, çok küçük
 * gri blur veri-URI'si. Görseller henüz yüklenmemişken bile build kırılmaz.
 */
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjYiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjYiIGZpbGw9IiNlOGU4ZTgiLz48L3N2Zz4='
