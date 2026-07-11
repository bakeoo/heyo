import { BRAND_NAME } from '@/config/site'
import { FEATURES } from '@/content/home'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

/**
 * "Neden Biz?" section.
 * 6 madde: icon + başlık + kısa açıklama grid'i.
 */
export default function WhyUs() {
  return (
    <Section id="neden-biz" className="bg-surface">
      <Container>
        <SectionHeading eyebrow="Güvenilir Tedarikçi" title={`Neden ${BRAND_NAME}?`} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 rounded-card border border-line bg-background p-6 shadow-soft"
            >
              <span
                className="text-3xl leading-none"
                role="img"
                aria-label={feature.title}
              >
                {feature.icon}
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
