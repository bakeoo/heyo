import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import type { FaqItem } from '@/content/categories'

/**
 * SSS (SSS) section — erişilebilir, JS gerektirmeyen açılır/kapanır
 * (<details>/<summary>). FAQ JSON-LD şeması sayfada ayrıca eklenir.
 */
export default function Faq({
  items,
  eyebrow = 'Sıkça Sorulan Sorular',
  title = 'Merak Edilenler',
  className = 'bg-surface',
}: {
  items: FaqItem[]
  eyebrow?: string
  title?: string
  className?: string
}) {
  return (
    <Section className={className}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <div className="mx-auto max-w-3xl space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-card border border-line bg-background p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-semibold text-ink transition group-open:text-brand">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl leading-none text-brand transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}
