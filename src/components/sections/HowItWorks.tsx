import { STEPS } from '@/content/home'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

/**
 * "Sipariş Süreci" section.
 * 3 adım yatay akış (mobilde dikey).
 */
export default function HowItWorks() {
  return (
    <Section id="nasil-calisir" className="bg-background">
      <Container>
        <SectionHeading eyebrow="3 Adımda Sipariş" title="Sipariş Süreci" />

        <ol className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.no}
              className="relative flex flex-col items-center text-center"
            >
              {/* Adım numarası */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand font-heading text-2xl font-bold text-white shadow-soft">
                {step.no}
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-muted">{step.text}</p>

              {/* Adımlar arası bağlantı çizgisi (sadece desktop) */}
              {index < STEPS.length - 1 && (
                <span
                  className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-line md:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
