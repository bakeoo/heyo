import SiteShell from '@/components/layout/SiteShell'
import Hero from '@/components/sections/Hero'
import Products from '@/components/sections/Products'
import WhyUs from '@/components/sections/WhyUs'
import HowItWorks from '@/components/sections/HowItWorks'
import Gallery from '@/components/sections/Gallery'
import ContactCTA from '@/components/sections/ContactCTA'

/**
 * Ana sayfa (one-page).
 * Tüm section'lar sırayla render edilir. Semantic HTML kullanılır.
 */
export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Products />
      <WhyUs />
      <HowItWorks />
      <Gallery />
      <ContactCTA />
    </SiteShell>
  )
}
