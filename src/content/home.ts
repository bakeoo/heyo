/**
 * Ana sayfa içeriği: "Neden Biz" maddeleri, "Sipariş Süreci" adımları
 * ve galeri görselleri. Metinleri buradan düzenle.
 */

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

// ---- Kampanya (Google Ads) güven unsurları ----
export const TRUST_POINTS: string[] = [
  '✅ Günlük Taze Kesim',
  '✅ Soğuk Zincir Teslimat',
  '✅ Türkiye Geneli Kargo',
  '✅ Faturalı & Gıda Belgeli',
  '✅ Toptan Fiyat Garantisi',
]
