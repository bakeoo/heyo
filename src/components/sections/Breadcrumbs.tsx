import Link from 'next/link'
import Container from '@/components/ui/Container'

export interface Crumb {
  name: string
  path: string
}

/**
 * Görsel breadcrumb (yol izi). JSON-LD BreadcrumbList ayrıca sayfada
 * lib/seo.ts > breadcrumbJsonLd ile eklenir.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="border-b border-line bg-surface">
      <Container className="py-3">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={item.path} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-line">
                    /
                  </span>
                )}
                {isLast ? (
                  <span className="font-medium text-ink" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="transition hover:text-brand">
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </Container>
    </nav>
  )
}
