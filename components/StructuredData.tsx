import Script from 'next/script'
import { BRAND_NAME, SITE_URL, PHONE_NUMBER } from '@/lib/constants'

/**
 * JSON-LD yapısal veri (LocalBusiness).
 * Google'ın işletmeyi tanıması ve zengin sonuçlar için kullanılır.
 * Değerler lib/constants.ts'den otomatik gelir.
 */
export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND_NAME,
    description: 'Toptan kokoreç ve şırdan tedarikçisi',
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
    },
    areaServed: 'TR',
  }

  return (
    <Script
      id="structured-data-localbusiness"
      type="application/ld+json"
      // JSON-LD içeriğini güvenli şekilde gömüyoruz
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
