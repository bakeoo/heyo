import type { Metadata } from 'next'
import { getCategory } from '@/content/categories'
import { buildMetadata } from '@/lib/seo'
import CategoryPage from '@/components/pages/CategoryPage'

// Bu sayfanın kategori verisi (content/categories.ts)
const category = getCategory('toptan-sirdan')!

export const metadata: Metadata = buildMetadata({
  title: category.metaTitle,
  description: category.metaDescription,
  path: `/${category.slug}`,
  keywords: category.keywords,
})

export default function Page() {
  return <CategoryPage category={category} />
}
