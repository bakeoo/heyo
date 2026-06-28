import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import WhyUs from '@/components/WhyUs'
import HowItWorks from '@/components/HowItWorks'
import Gallery from '@/components/Gallery'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

/**
 * Ana sayfa (one-page).
 * Tüm section'lar sırayla render edilir. Semantic HTML kullanılır.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <WhyUs />
        <HowItWorks />
        <Gallery />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
