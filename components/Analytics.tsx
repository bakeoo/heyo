import Script from 'next/script'

/**
 * Google Analytics / Google Ads (gtag.js) yükleyici.
 *
 * Ölçüm kimliği ortam değişkeninden okunur:
 *   NEXT_PUBLIC_GTAG_ID = "G-XXXXXXX" (GA4) veya "AW-XXXXXXX" (Google Ads)
 *
 * Kimlik tanımlı DEĞİLSE hiçbir script eklenmez; window.gtag tanımsız kalır
 * ve dönüşüm takibi yardımcıları (lib/analytics.ts) sessizce devre dışı kalır.
 * Böylece geliştirme/önizleme ortamında gereksiz istek yapılmaz.
 *
 * Kullanım: kimliği Vercel proje ayarlarında ortam değişkeni olarak ekleyin.
 */
export default function Analytics() {
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID

  if (!gtagId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtagId}');
        `}
      </Script>
    </>
  )
}
