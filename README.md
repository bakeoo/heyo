# Toptan Şırdancı — toptansirdanci.com

Türkiye geneli **toptan kokoreç ve şırdan** tedarikçisi için geliştirilmiş,
B2B odaklı, tek sayfa (one-page) Next.js web sitesi.

Amaç: Google'da bulunmak (SEO + Google Ads) ve ziyaretçiyi **WhatsApp** veya
**telefona** yönlendirmek. Sitede fiyat gösterilmez; tüm dönüşüm WhatsApp/telefon
üzerinden gerçekleşir.

## Teknoloji

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (tasarım sistemi `tailwind.config.ts`'de)
- **next/font** (Oswald + Inter — Google Fonts)
- **next/image** (görsel optimizasyonu, WebP/AVIF, lazy load, blur placeholder)
- **Native `sitemap.ts` / `robots.ts`** (Next.js metadata rotaları)
- **Vercel**'e deploy için hazır

---

## 1. Kurulum

Gereksinim: Node.js 18.18+ (öneri: 20+).

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
# -> http://localhost:3000        (ana sayfa)
# -> http://localhost:3000/kampanya (Google Ads açılış sayfası)
```

Üretim derlemesi:

```bash
npm run build   # statik export: out/ klasörü + sitemap.xml & robots.txt üretir
npm run start   # üretim sunucusunu çalıştırır
```

---

## 2. Placeholder'lar nerede değiştirilir?

**Tüm marka ve iletişim bilgileri tek dosyada:** [`src/config/site.ts`](src/config/site.ts)

Aşağıdaki sabitleri kendi bilgilerinizle değiştirin:

| Sabit                 | Mevcut değer     | Format / Örnek          |
| --------------------- | ---------------- | ----------------------- |
| `BRAND_NAME`          | `ŞIRDANCI ADO`   | marka adı               |
| `WHATSAPP_NUMBER`     | `905464324625`   | `905XXXXXXXXX` (90 ile) |
| `PHONE_NUMBER`        | `05464324625`    | `05XXXXXXXXX`           |
| `ADDRESS`             | `[ADRES]`        | `İstanbul` (henüz boş)  |
| `PRODUCTS[].minOrder` | `20 kg`          | `20 kg`                 |

> **Adres:** `[ADRES]` gibi köşeli parantezli (placeholder) kaldığı sürece
> footer'da **gösterilmez**; gerçek değeri girince otomatik görünür.
>
> **E-posta ve çalışma saati** bu projede kullanılmıyor; siteden kaldırıldı.

> **Not:** Marka adı tüm sitede (`Header`, `Footer`, başlıklar, SEO metadata,
> JSON-LD) otomatik olarak `BRAND_NAME` sabitinden gelir; tek yerden değişir.

Hazır WhatsApp mesajları da aynı dosyadaki `WA_MESSAGES` objesinde tanımlıdır.
WhatsApp linkleri `waLink(mesaj)` yardımcı fonksiyonu ile `encodeURIComponent`
kullanılarak güvenli biçimde üretilir.

---

## 3. Görseller nereye yüklenir?

Tüm medya `public/media/` altında bulunur. Dosya adlarını **birebir** koruyun:

```
public/media/
├── hero/
│   ├── hero-bg.webp      ← Hero arka plan görseli / video posteri
│   └── hero-video.mp4    ← (opsiyonel) Hero arka plan videosu
├── products/
│   ├── kokorec-cig.webp
│   ├── kokorec-pismis.webp
│   └── sirdan.webp
└── gallery/
    └── galeri-1.webp ... galeri-6.webp
```

- **Format:** Görseller **WebP**, video **MP4**.
- **Hero:** Video varsa otomatik oynatılır (`autoplay`, `muted`, `loop`,
  `playsInline`). Video yoksa veya yüklenemezse `hero-bg.webp` görseli gösterilir.
- **Ürün görselleri:** 4/3 oran önerilir (örn. 1200×900).
- **Galeri:** Kare (1:1) oran önerilir.
- Hero görseli `priority`, diğer tüm görseller `loading="lazy"` ile yüklenir;
  hepsinde blur placeholder vardır.

> Dosyalar yüklenmeden de site derlenir ve çalışır (görsel alanı boş/gri görünür).

---

## 4. Dönüşüm takibi (Google Ads / Analytics)

Tüm WhatsApp, telefon ve e-posta tıklamaları
`gtag('event', 'contact_click', { method, ... })` event'i tetikler
(bkz. [`src/lib/analytics.ts`](src/lib/analytics.ts)). `gtag` tanımlı değilse hata vermez.

gtag.js'i etkinleştirmek için ölçüm kimliğinizi ortam değişkeni olarak ekleyin
(bkz. `.env.example`):

```bash
NEXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX   # GA4
# veya
NEXT_PUBLIC_GTAG_ID=AW-XXXXXXXXX   # Google Ads
```

Kimlik tanımlandığında [`src/components/analytics/Analytics.tsx`](src/components/analytics/Analytics.tsx)
gtag.js'i otomatik yükler.

---

## 5. SEO

- `app/layout.tsx` içinde tam metadata (title, description, keywords, OpenGraph).
- `<html lang="tr">`, semantic HTML (`main`, `section`, `article`, `header`, `footer`).
- JSON-LD `LocalBusiness` yapısal verisi ([`src/lib/seo.ts`](src/lib/seo.ts) üreticileri + [`src/components/seo/JsonLd.tsx`](src/components/seo/JsonLd.tsx)).
- Native `sitemap.ts` + `robots.ts` ile `sitemap.xml` + `robots.txt` (build sırasında otomatik).
- `/kampanya` sayfası `noindex` (sadece reklam trafiği; sitemap'ten hariç).

---

## 6. Vercel'e deploy

1. Projeyi bir GitHub deposuna gönderin.
2. [vercel.com](https://vercel.com) > **Add New Project** > depoyu seçin.
3. Vercel otomatik olarak Next.js'i algılar; ekstra ayar gerekmez.
4. (Opsiyonel) **Settings > Environment Variables**: `NEXT_PUBLIC_GTAG_ID`.
5. **Settings > Domains**: `toptansirdanci.com` alan adını bağlayın.
6. **Deploy.** Her `git push` ile otomatik yeniden yayınlanır.

> Alan adını değiştirirseniz `src/config/site.ts` (`DOMAIN`) değerini güncelleyin;
> sitemap ve robots bu değerden otomatik türetilir.

---

## Proje yapısı

Katmanlı, ölçeklenebilir mimari. Kaynak kod `src/` altında; içerik (data),
sunum (component), yapılandırma (config) ve SEO ayrı katmanlarda. Yeni sayfa
eklerken mevcut section'ları ve SEO yardımcılarını yeniden kullanabilirsin.

```
src/
  app/
    layout.tsx          # kök metadata, fontlar, JSON-LD, lang="tr"
    page.tsx            # ana sayfa (one-page)
    kampanya/page.tsx   # Google Ads açılış sayfası (noindex)
    robots.ts           # native robots.txt
    sitemap.ts          # native sitemap.xml (yeni rotayı buraya ekle)
    globals.css         # tasarım sistemi + temel stiller
  components/
    layout/             # Header, Footer, WhatsAppFloat, SiteShell
    sections/           # Hero, Products, WhyUs, HowItWorks, Gallery, ContactCTA
    ui/                 # Container, Section, SectionHeading, ContactLink
    seo/                # JsonLd (yapısal veri gömücü)
    analytics/          # Analytics (gtag yükleyici)
    icons.tsx           # inline SVG ikonları
  config/
    site.ts             # ⭐ marka, iletişim, domain, nav, waLink()/telLink()
  content/
    products.ts         # ürün verisi (+ ürün tipi)
    home.ts             # Neden Biz / Sipariş Süreci / Galeri / güven unsurları
  lib/
    seo.ts              # buildMetadata() + JSON-LD üreticileri
    analytics.ts        # gtag dönüşüm takibi
    utils.ts            # cn() yardımcısı
public/media/           # görseller ve video
next.config.js          # statik export ayarı
tailwind.config.ts      # tasarım sistemi (renk, tipografi)
```

### Yeni sayfa nasıl eklenir? (SEO için)
1. `src/app/<slug>/page.tsx` oluştur, `buildMetadata({ title, description, path })` ile metadata ver.
2. İçeriği `src/content/*` altına koy; mevcut `sections/` ve `ui/` bileşenlerini kullan.
3. İndekslensin istiyorsan `src/app/sitemap.ts` içindeki `ROUTES` dizisine ekle.
4. Gerekiyorsa `lib/seo.ts` üreticileriyle (Product, FAQ, Breadcrumb) JSON-LD ekle.
