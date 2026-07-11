import { cn } from '@/lib/utils'

/**
 * Ortalanmış içerik konteyneri (maks. genişlik + yatay padding).
 * Tüm section'lar içeriğini bununla sarar.
 */
export default function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('container-site', className)}>{children}</div>
}
