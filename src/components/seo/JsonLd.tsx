import Script from 'next/script'

/**
 * Jenerik JSON-LD gömücü. lib/seo.ts üreticilerinden gelen düz objeyi
 * <script type="application/ld+json"> olarak sayfaya ekler.
 *
 * @param id   Sayfada benzersiz script id'si
 * @param data schema.org JSON-LD objesi
 */
export default function JsonLd({
  id,
  data,
}: {
  id: string
  data: Record<string, unknown>
}) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      // JSON-LD içeriğini güvenli şekilde gömüyoruz
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
