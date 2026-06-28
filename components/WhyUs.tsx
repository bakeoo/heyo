import { FEATURES, BRAND_NAME } from '@/lib/constants'

/**
 * "Neden Biz?" section.
 * 6 madde: icon + başlık + kısa açıklama grid'i.
 */
export default function WhyUs() {
  return (
    <section id="neden-biz" className="section bg-surface">
      <div className="container-site">
        <div className="mb-12 text-center">
          <span className="eyebrow">Güvenilir Tedarikçi</span>
          <h2 className="h2-title">Neden {BRAND_NAME}?</h2>
        </div>

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
      </div>
    </section>
  )
}
