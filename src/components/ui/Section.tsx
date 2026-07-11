import { cn } from '@/lib/utils'

/**
 * Standart dikey boşluklu <section> sarmalayıcı.
 * `id` anchor navigasyonu için, `className` ile arka plan rengi verilir.
 */
export default function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn('section', className)}>
      {children}
    </section>
  )
}
