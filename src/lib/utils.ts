/**
 * Genel yardımcılar.
 */

/**
 * Koşullu className birleştirici. Falsy değerleri (false/null/undefined)
 * atar, kalanları boşlukla birleştirir.
 *
 * @example cn('btn', isActive && 'btn-active')
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(' ')
}
