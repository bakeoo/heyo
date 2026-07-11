/**
 * Kategori (SEO açılış sayfası) içerikleri.
 * Her kayıt bir sayfa üretir: /<slug>. İçerik, başlık, anahtar kelimeler,
 * SSS ve ilgili ürünler burada tanımlıdır. Yeni kategori eklemek için
 * diziye kayıt ekle + app/<slug>/page.tsx oluştur + sitemap'e ekle.
 */
import { WA_MESSAGES } from '@/config/site'

export interface FaqItem {
  question: string
  answer: string
}

export interface CategoryContent {
  /** URL slug (örn. 'toptan-sirdan') */
  slug: string
  /** Kısa ad (breadcrumb, başlıklar) */
  name: string
  /** <title> — markayı içerir */
  metaTitle: string
  metaDescription: string
  keywords: string
  /** Sayfa H1'i */
  h1: string
  /** Hero alt başlığı */
  heroSubtitle: string
  /** Giriş paragrafları (SEO metni) */
  intro: string[]
  /** Sayfaya özel öne çıkanlar */
  highlights: { title: string; text: string }[]
  /** Bu kategoriyle ilişkili ürün id'leri (content/products.ts) */
  productIds: string[]
  /** Sayfaya özel SSS (FAQ şeması için) */
  faq: FaqItem[]
  /** CTA'lar için hazır WhatsApp mesajı */
  waMessage: string
}

export const CATEGORIES: CategoryContent[] = [
  {
    slug: 'toptan-sirdan',
    name: 'Toptan Şırdan',
    metaTitle: 'Toptan Şırdan | Taze & Temizlenmiş Şırdan Tedarikçisi | ŞIRDANCI ADO',
    metaDescription:
      'Toptan şırdan tedarikçisi. Günlük taze, temizlenmiş ve doldurulmaya hazır şırdan. Türkiye geneli soğuk zincir kargo, faturalı teslimat. WhatsApp’tan toptan şırdan fiyatı alın.',
    keywords:
      'toptan şırdan, toptan şırdan fiyatları, şırdan toptan satış, şırdan tedarikçisi, temizlenmiş şırdan toptan, toptan sakatat',
    h1: 'Toptan Şırdan Tedarikçisi',
    heroSubtitle:
      'Günlük taze, temizlenmiş, doldurulmaya hazır şırdan — Türkiye geneli soğuk zincir kargo ve faturalı teslimat.',
    intro: [
      'ŞIRDANCI ADO olarak kokoreçci, büfe, lokanta ve şırdancı işletmelerine Türkiye geneli toptan şırdan tedariği yapıyoruz. Ürünlerimiz günlük kesimden gelir; titizlikle temizlenir, doldurulmaya hazır şekilde vakumlu paketlenir ve soğuk zincir bozulmadan adresinize ulaşır.',
      'Toptan şırdan fiyatlarımız işletmenizin kârlılığını gözetecek şekilde rekabetçidir. Minimum sipariş miktarından itibaren düzenli ya da tek seferlik tedarik sağlıyor, her sevkiyatta fatura ve gerekli gıda belgelerini eksiksiz sunuyoruz.',
      'Fiyat teklifi için WhatsApp’tan yazmanız ya da telefonla aramanız yeterli; ihtiyacınıza göre miktar ve teslimat planını birlikte belirleriz.',
    ],
    highlights: [
      { title: 'Temizlenmiş & Hazır', text: 'Doldurulmaya hazır, ayıklanmış şırdan; mutfakta ek işçilik gerektirmez.' },
      { title: 'Günlük Taze Kesim', text: 'Bekletilmiş değil, günlük kesimden vakumlu paket.' },
      { title: 'Soğuk Zincir Kargo', text: 'Türkiye’nin her iline bozulmadan, soğuk zincirle sevkiyat.' },
      { title: 'Faturalı & Belgeli', text: 'Resmi fatura ve gıda güvenliği belgeleriyle teslim.' },
    ],
    productIds: ['sirdan'],
    faq: [
      {
        question: 'Toptan şırdan minimum sipariş miktarı nedir?',
        answer:
          'Toptan şırdan siparişlerinde minimum 20 kg’dan başlıyoruz. İhtiyacınıza göre düzenli veya tek seferlik tedarik planlayabiliriz.',
      },
      {
        question: 'Şırdan temizlenmiş ve doldurulmaya hazır mı geliyor?',
        answer:
          'Evet. Şırdanlar titizlikle temizlenip ayıklanır ve doldurulmaya hazır şekilde vakumlu paketlenir; mutfağınızda ek hazırlık gerektirmez.',
      },
      {
        question: 'Türkiye’nin her yerine şırdan gönderiyor musunuz?',
        answer:
          'Evet, Türkiye geneli soğuk zincir kargo ile sevkiyat yapıyoruz. Ürünler soğuk zincir bozulmadan adresinize ulaşır.',
      },
      {
        question: 'Toptan şırdan fiyatını nasıl öğrenebilirim?',
        answer:
          'Fiyatlar güncel piyasaya ve miktara göre belirlenir. WhatsApp’tan yazmanız veya telefonla aramanız yeterli; size özel toptan fiyat teklifini hemen iletiriz.',
      },
      {
        question: 'Fatura ve gıda belgesi veriyor musunuz?',
        answer:
          'Her sevkiyatta resmi fatura ve gerekli gıda güvenliği belgelerini eksiksiz sunuyoruz.',
      },
    ],
    waMessage: WA_MESSAGES.sirdan,
  },
  {
    slug: 'toptan-kokorec',
    name: 'Toptan Kokoreç',
    metaTitle: 'Toptan Kokoreç | Çiğ & Pişmiş Kokoreç Tedarikçisi | ŞIRDANCI ADO',
    metaDescription:
      'Toptan kokoreç tedarikçisi. Günlük taze çiğ kokoreç ve servise hazır pişmiş kokoreç. Türkiye geneli soğuk zincir kargo, faturalı teslimat. WhatsApp’tan toptan kokoreç fiyatı alın.',
    keywords:
      'toptan kokoreç, toptan kokoreç fiyatları, kokoreç tedarikçisi, çiğ kokoreç toptan, pişmiş kokoreç toptan, kokoreçci malzeme',
    h1: 'Toptan Kokoreç Tedarikçisi',
    heroSubtitle:
      'Günlük taze çiğ kokoreç ve servise hazır pişmiş kokoreç — Türkiye geneli soğuk zincir kargo, faturalı teslimat.',
    intro: [
      'ŞIRDANCI ADO, kokoreçci ve büfelerden lokantalara kadar tüm toptan alıcılara günlük taze kokoreç tedariği sağlar. Hem çiğ (temizlenmiş, vakumlu) hem de servise hazır pişmiş kokoreç seçenekleriyle işletmenizin ihtiyacına uygun çözüm sunarız.',
      'Çiğ kokoreç günlük kesimden gelir; temizlenmiş ve vakumlu paketlenmiş olarak sevk edilir. Pişmiş/hazır kokoreç ise lezzet garantili, soğuk zincirle taşınan, servise hazır üründür. Her iki seçenekte de kalite ve hijyen standartlarımız değişmez.',
      'Toptan kokoreç fiyatları için WhatsApp’tan yazın ya da telefonla arayın; ürün tipini ve miktarı belirleyelim, size özel fiyatı hemen iletelim.',
    ],
    highlights: [
      { title: 'Çiğ & Pişmiş Seçeneği', text: 'Temizlenmiş çiğ kokoreç veya servise hazır pişmiş kokoreç.' },
      { title: 'Günlük Taze Kesim', text: 'Her gün taze kesim, vakumlu paket — bayat ürün yok.' },
      { title: 'Soğuk Zincir Kargo', text: 'Türkiye geneli bozulmadan, soğuk zincirle teslim.' },
      { title: 'Faturalı & Belgeli', text: 'Resmi fatura ve gıda güvenliği belgeleriyle sevkiyat.' },
    ],
    productIds: ['kokorec-cig', 'kokorec-pismis'],
    faq: [
      {
        question: 'Çiğ kokoreç mi yoksa pişmiş kokoreç mi tedarik ediyorsunuz?',
        answer:
          'İkisini de. Temizlenmiş, vakumlu çiğ kokoreç ve servise hazır pişmiş kokoreç seçeneklerini toptan olarak sunuyoruz.',
      },
      {
        question: 'Toptan kokoreç minimum sipariş miktarı nedir?',
        answer:
          'Toptan kokoreç siparişlerinde minimum 20 kg’dan başlıyoruz. Düzenli ya da tek seferlik tedarik planlayabiliriz.',
      },
      {
        question: 'Kokoreç Türkiye’nin her yerine gönderiliyor mu?',
        answer:
          'Evet, Türkiye geneli soğuk zincir kargo ile sevkiyat yapıyoruz; ürünler soğuk zincir bozulmadan adresinize ulaşır.',
      },
      {
        question: 'Toptan kokoreç fiyatını nasıl öğrenebilirim?',
        answer:
          'WhatsApp’tan yazmanız veya telefonla aramanız yeterli. Ürün tipini (çiğ/pişmiş) ve miktarı belirleyip size özel toptan fiyat teklifini hemen iletiyoruz.',
      },
      {
        question: 'Ürünler nasıl paketleniyor?',
        answer:
          'Çiğ kokoreç temizlenip vakumlu paketlenir; pişmiş kokoreç soğuk zincire uygun şekilde sevk edilir. Tüm sevkiyatlar faturalı ve gıda belgelidir.',
      },
    ],
    waMessage: WA_MESSAGES.general,
  },
]

/** Slug'a göre kategori bul (statik sayfa üretiminde kullanılır). */
export function getCategory(slug: string): CategoryContent | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
