import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'

/**
 * Standart sayfa iskeleti: Header + <main> + Footer + sabit WhatsApp butonu.
 * Ana sayfa ve ileride açılacak içerik/kategori sayfaları bunu kullanır.
 * (Kampanya sayfası kendi sade iskeletini kullanır.)
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
    </>
  )
}
