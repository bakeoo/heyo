import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LOCATIONS, getCity } from '@/content/locations'
import { buildMetadata } from '@/lib/seo'
import CityPage from '@/components/pages/CityPage'

// Statik export: yalnızca tanımlı şehirler üretilir, başka slug 404.
export const dynamicParams = false

/** Build sırasında her şehir için sayfa üret. */
export function generateStaticParams() {
  return LOCATIONS.map((c) => ({ sehir: c.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { sehir: string }
}): Metadata {
  const city = getCity(params.sehir)
  if (!city) return {}
  return buildMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/toptan/${city.slug}`,
    keywords: city.keywords,
  })
}

export default function Page({ params }: { params: { sehir: string } }) {
  const city = getCity(params.sehir)
  if (!city) notFound()
  return <CityPage city={city} />
}
