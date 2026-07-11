/**
 * Ortalanmış section başlığı: küçük etiket (eyebrow) + H2 (+ opsiyonel açıklama).
 * Tüm standart section'larda tutarlı başlık görünümü sağlar.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h2-title">{title}</h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-muted">{description}</p>
      )}
    </div>
  )
}
