/**
 * Ürün içeriği.
 * Veri artık products.json'da tutulur; /admin paneli bu dosyayı GitHub'a
 * commit'leyerek günceller (ardından site otomatik yeniden yayınlanır).
 * Kod tarafında düzenlemek istersen doğrudan products.json'ı değiştirebilirsin.
 */
import productsData from './products.json'

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

export const PRODUCTS: Product[] = productsData as Product[]
