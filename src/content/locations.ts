/**
 * Şehir (yerel SEO) sayfası içerikleri.
 * Her kayıt /toptan/<slug> sayfasını üretir (dinamik rota + generateStaticParams).
 * Her şehir için giriş metni BENZERSİZDİR — yerel bağlam içerir; böylece
 * içerik tekrarı (duplicate/doorway) riski azalır.
 *
 * Yeni şehir eklemek için: buraya bir kayıt ekle. Rota ve sitemap otomatik.
 */

export interface CityContent {
  /** URL slug (ASCII, örn. 'istanbul') */
  slug: string
  /** Görünen şehir adı (örn. 'İstanbul') */
  city: string
  metaTitle: string
  metaDescription: string
  keywords: string
  h1: string
  heroSubtitle: string
  /** Şehre özgü, benzersiz giriş paragrafları */
  intro: string[]
}

export const LOCATIONS: CityContent[] = [
  {
    slug: 'istanbul',
    city: 'İstanbul',
    metaTitle: 'İstanbul Toptan Kokoreç, Şırdan ve Midye Tedarikçisi | ŞIRDANCI ADO',
    metaDescription:
      'İstanbul’a toptan kokoreç, şırdan ve midye tedariki. Günlük taze, soğuk zincir kargo, faturalı teslimat. Avrupa ve Anadolu yakasına hızlı sevkiyat. WhatsApp’tan fiyat alın.',
    keywords:
      'istanbul toptan kokoreç, istanbul toptan şırdan, istanbul toptan midye, istanbul kokoreç tedarikçisi, istanbul midye dolma toptan',
    h1: 'İstanbul Toptan Kokoreç, Şırdan ve Midye Tedarikçisi',
    heroSubtitle:
      'İstanbul’daki kokoreçci, büfe, midyeci ve lokantalara günlük taze kokoreç, şırdan ve midye — Avrupa ve Anadolu yakasına hızlı, soğuk zincirli teslimat.',
    intro: [
      'İstanbul’un Avrupa ve Anadolu yakasındaki kokoreçci, büfe, midyeci ve lokantalara toptan kokoreç, şırdan ve midye tedariği sağlıyoruz. Yoğun tempoya ve yüksek talebe alışkın İstanbul işletmeleri için kesintisiz, düzenli ve taze tedarik en önemli önceliğimizdir.',
      'Ürünler günlük gelir; temizlenmiş ve uygun şekilde paketlenip soğuk zincir bozulmadan İstanbul’daki adresinize ulaşır. Her sevkiyatta fatura ve gıda güvenliği belgeleri eksiksizdir. Haftalık veya aylık düzenli tedarik için size özel plan oluşturabiliriz.',
    ],
  },
  {
    slug: 'ankara',
    city: 'Ankara',
    metaTitle: 'Ankara Toptan Kokoreç, Şırdan ve Midye Tedarikçisi | ŞIRDANCI ADO',
    metaDescription:
      'Ankara’ya toptan kokoreç, şırdan ve midye tedariki. Günlük taze, soğuk zincir kargo, faturalı teslimat. Ankara geneli hızlı sevkiyat. WhatsApp’tan fiyat alın.',
    keywords:
      'ankara toptan kokoreç, ankara toptan şırdan, ankara toptan midye, ankara kokoreç tedarikçisi, ankara midye dolma toptan',
    h1: 'Ankara Toptan Kokoreç, Şırdan ve Midye Tedarikçisi',
    heroSubtitle:
      'Ankara ve çevresindeki işletmelere günlük taze, soğuk zincirle toptan kokoreç, şırdan ve midye tedariği.',
    intro: [
      'Ankara ve çevre ilçelerdeki büfe, lokanta, midyeci ve kokoreçcilere toptan kokoreç, şırdan ve midye tedariği yapıyoruz. Başkentin köklü sokak lezzetleri kültürüne yakışır kalitede, günlük taze ürünleri güvenle sunuyoruz.',
      'Tüm ürünler temizlenmiş ve uygun şekilde, soğuk zincirle Ankara’daki adresinize ulaşır. Faturalı ve gıda belgeli teslimatla işletmenizin tedarik yükünü hafifletiyoruz; düzenli sevkiyat için esnek planlar sunuyoruz.',
    ],
  },
  {
    slug: 'izmir',
    city: 'İzmir',
    metaTitle: 'İzmir Toptan Kokoreç, Şırdan ve Midye Tedarikçisi | ŞIRDANCI ADO',
    metaDescription:
      'İzmir’e toptan kokoreç, şırdan ve midye tedariki. Günlük taze, soğuk zincir kargo, faturalı teslimat. İzmir geneli hızlı sevkiyat. WhatsApp’tan fiyat alın.',
    keywords:
      'izmir toptan kokoreç, izmir toptan şırdan, izmir toptan midye, izmir midye dolma toptan, izmir kokoreç tedarikçisi',
    h1: 'İzmir Toptan Kokoreç, Şırdan ve Midye Tedarikçisi',
    heroSubtitle:
      'İzmir’in kokoreç, şırdan ve midye esnafına günlük taze, soğuk zincirle toptan tedarik.',
    intro: [
      'İzmir’in kokoreç, şırdan ve özellikle midye sevdalısı esnafına toptan tedarik sağlıyoruz. Ege’nin hareketli sokak lezzetleri kültürüne uygun, günlük taze ve hijyenik ürünleri kesintisiz biçimde ulaştırıyoruz.',
      'Çiğ ve pişmiş kokoreç, temizlenmiş şırdan ve midye dolma/tava için hazır midye seçeneklerimiz, soğuk zincir bozulmadan İzmir’deki işletmenize teslim edilir. Her sevkiyat faturalı ve belgelidir; talebe göre düzenli tedarik planı kurabiliriz.',
    ],
  },
  {
    slug: 'bursa',
    city: 'Bursa',
    metaTitle: 'Bursa Toptan Kokoreç, Şırdan ve Midye Tedarikçisi | ŞIRDANCI ADO',
    metaDescription:
      'Bursa’ya toptan kokoreç, şırdan ve midye tedariki. Günlük taze, soğuk zincir kargo, faturalı teslimat. Bursa geneli hızlı sevkiyat. WhatsApp’tan fiyat alın.',
    keywords:
      'bursa toptan kokoreç, bursa toptan şırdan, bursa toptan midye, bursa kokoreç tedarikçisi, bursa midye dolma toptan',
    h1: 'Bursa Toptan Kokoreç, Şırdan ve Midye Tedarikçisi',
    heroSubtitle:
      'Bursa ve ilçelerindeki işletmelere günlük taze, soğuk zincirle toptan kokoreç, şırdan ve midye tedariği.',
    intro: [
      'Bursa ve ilçelerindeki büfe, lokanta, midyeci ve kokoreçcilere toptan kokoreç, şırdan ve midye tedariği yapıyoruz. Şehrin canlı esnaf dokusuna uygun, güvenilir ve düzenli tedarik anlayışıyla çalışıyoruz.',
      'Günlük ürünlerimiz temizlenmiş ve uygun şekilde, soğuk zincirle Bursa’daki adresinize ulaşır. Faturalı ve gıda belgeli teslimat standart; ihtiyacınıza göre tek seferlik veya sürekli sevkiyat sağlıyoruz.',
    ],
  },
  {
    slug: 'adana',
    city: 'Adana',
    metaTitle: 'Adana Toptan Kokoreç, Şırdan ve Midye Tedarikçisi | ŞIRDANCI ADO',
    metaDescription:
      'Adana’ya toptan kokoreç, şırdan ve midye tedariki. Günlük taze, soğuk zincir kargo, faturalı teslimat. Çukurova geneli hızlı sevkiyat. WhatsApp’tan fiyat alın.',
    keywords:
      'adana toptan kokoreç, adana toptan şırdan, adana toptan midye, adana şırdan tedarikçisi, çukurova toptan şırdan',
    h1: 'Adana Toptan Kokoreç, Şırdan ve Midye Tedarikçisi',
    heroSubtitle:
      'Adana ve Çukurova bölgesine günlük taze, soğuk zincirle toptan şırdan, kokoreç ve midye tedariği.',
    intro: [
      'Adana ve Çukurova bölgesinin zengin sokak lezzetleri kültürüne toptan kokoreç, şırdan ve midye tedariği sağlıyoruz. Özellikle şırdanın çok sevildiği bu bölgede, günlük taze ve temizlenmiş ürünlerle esnafın yanındayız.',
      'Ürünlerimiz soğuk zincir bozulmadan, uygun ve hijyenik şekilde Adana’daki işletmenize ulaşır. Faturalı ve belgeli teslimatla güvenli tedarik sunar, talep hacminize göre düzenli sevkiyat planlarız.',
    ],
  },
]

/** Slug'a göre şehir bul. */
export function getCity(slug: string): CityContent | undefined {
  return LOCATIONS.find((c) => c.slug === slug)
}
