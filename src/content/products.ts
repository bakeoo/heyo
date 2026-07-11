/**
 * Ürün içeriği.
 * Yeni ürün eklemek için bu diziye bir kayıt ekle; hem ana sayfadaki
 * Ürünler section'ı hem de ileride açılacak ürün detay sayfaları bu
 * veriyi kullanır.
 */
import { WA_MESSAGES } from '@/config/site'

export interface Product {
  /** URL/anchor için benzersiz kısa kimlik (slug) */
  id: string
  name: string
  description: string
  /** Minimum sipariş miktarı, örn. "20 kg" */
  minOrder: string
  /** public/ altındaki görsel yolu */
  image: string
  /** SEO dostu, açıklayıcı alt metni */
  imageAlt: string
  /** Ürüne özel hazır WhatsApp mesajı */
  waMessage: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'kokorec-cig',
    name: 'Kokoreç (Çiğ)',
    description: 'Günlük taze kesim, temizlenmiş, vakumlu paket.',
    minOrder: '20 kg',
    image: '/media/products/kokorec-cig.webp',
    imageAlt: 'taze-toptan-cig-kokorec',
    waMessage: WA_MESSAGES.kokorecCig,
  },
  {
    id: 'kokorec-pismis',
    name: 'Kokoreç (Pişmiş / Hazır)',
    description: 'Lezzet garantili, servise hazır, soğuk zincir.',
    minOrder: '20 kg',
    image: '/media/products/kokorec-pismis.webp',
    imageAlt: 'toptan-hazir-pismis-kokorec',
    waMessage: WA_MESSAGES.kokorecPismis,
  },
  {
    id: 'sirdan',
    name: 'Şırdan',
    description: 'Taze, temizlenmiş, doldurulmaya hazır.',
    minOrder: '20 kg',
    image: '/media/products/sirdan.webp',
    imageAlt: 'taze-toptan-sirdan',
    waMessage: WA_MESSAGES.sirdan,
  },
]
