import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import AdminClient from './AdminClient'

// Admin paneli arama motorlarında görünmesin
export const metadata: Metadata = buildMetadata({
  title: 'Yönetim Paneli | ŞIRDANCI ADO',
  description: 'Ürün yönetimi.',
  path: '/admin',
  noindex: true,
})

export default function AdminPage() {
  return <AdminClient />
}
