'use client'

import { useEffect, useMemo, useState } from 'react'

/**
 * Maliyet yönetimi (aylık hesap-kitap).
 * Veriler yalnızca bu tarayıcıda (localStorage) tutulur — gizlidir, GitHub'a
 * gitmez. Yedek almak/taşımak için JSON dışa/içe aktarma vardır.
 */

interface Entry {
  id: string
  date: string // YYYY-MM-DD
  type: 'gelir' | 'gider'
  category: string
  description: string
  amount: number
}

const KEY = 'sirdanci_finance_v1'
const EXPENSE_CATS = ['Et / Hammadde', 'Ambalaj', 'Kargo', 'Personel', 'Kira', 'Enerji / Fatura', 'Diğer']
const INCOME_CATS = ['Satış', 'Tahsilat', 'Diğer']

function todayISO(): string {
  const d = new Date()
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10)
}
const monthOf = (iso: string) => iso.slice(0, 7)
const fmt = (n: number) =>
  n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺'

export default function CostManager() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loaded, setLoaded] = useState(false)
  const [month, setMonth] = useState('')

  // form
  const [date, setDate] = useState('')
  const [type, setType] = useState<'gelir' | 'gider'>('gider')
  const [category, setCategory] = useState(EXPENSE_CATS[0])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')

  // Yükle (yalnızca tarayıcıda)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setEntries(JSON.parse(raw))
    } catch {
      /* yoksay */
    }
    setMonth(monthOf(todayISO()))
    setDate(todayISO())
    setLoaded(true)
  }, [])

  // Kaydet
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(KEY, JSON.stringify(entries))
      } catch {
        /* yoksay */
      }
    }
  }, [entries, loaded])

  const cats = type === 'gider' ? EXPENSE_CATS : INCOME_CATS

  const monthEntries = useMemo(
    () => entries.filter((e) => monthOf(e.date) === month).sort((a, b) => (a.date < b.date ? 1 : -1)),
    [entries, month]
  )
  const income = monthEntries.filter((e) => e.type === 'gelir').reduce((s, e) => s + e.amount, 0)
  const expense = monthEntries.filter((e) => e.type === 'gider').reduce((s, e) => s + e.amount, 0)
  const net = income - expense

  const byCat = useMemo(() => {
    const m: Record<string, number> = {}
    monthEntries
      .filter((e) => e.type === 'gider')
      .forEach((e) => {
        m[e.category] = (m[e.category] || 0) + e.amount
      })
    return Object.entries(m).sort((a, b) => b[1] - a[1])
  }, [monthEntries])

  function addEntry(e: React.FormEvent) {
    e.preventDefault()
    // "1.234,56" (TR) → 1234.56 ; "1234.56" → 1234.56 ; "1234" → 1234
    const raw = amount.trim()
    const amt = raw.includes(',')
      ? parseFloat(raw.replace(/\./g, '').replace(',', '.'))
      : parseFloat(raw)
    if (!amt || amt <= 0 || !date) return
    const entry: Entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date,
      type,
      category: category || 'Diğer',
      description: description.trim(),
      amount: amt,
    }
    setEntries((es) => [entry, ...es])
    setDescription('')
    setAmount('')
  }
  function remove(id: string) {
    setEntries((es) => es.filter((e) => e.id !== id))
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sirdanci-maliyet-yedek.json'
    a.click()
    URL.revokeObjectURL(url)
  }
  function importJson(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0]
    if (!file) return
    const r = new FileReader()
    r.onload = () => {
      try {
        const data = JSON.parse(String(r.result))
        if (Array.isArray(data)) setEntries(data)
        else alert('Geçersiz yedek dosyası.')
      } catch {
        alert('Dosya okunamadı.')
      }
    }
    r.readAsText(file)
    ev.target.value = ''
  }

  if (!loaded) return null

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Maliyet Yönetimi</h1>
          <p className="text-sm text-muted">Aylık gelir / gider ve kâr-zarar takibi.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-lg border border-line bg-background px-3 py-2 text-sm text-ink outline-none focus:border-brand"
          />
          <button onClick={exportJson} className="btn-outline px-3 py-2 text-sm">
            Yedekle
          </button>
          <label className="btn-outline cursor-pointer px-3 py-2 text-sm">
            Yükle
            <input type="file" accept="application/json" onChange={importJson} className="hidden" />
          </label>
        </div>
      </div>

      {/* Özet kartları */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-line bg-background p-5 shadow-soft">
          <p className="text-sm text-muted">Toplam Gelir</p>
          <p className="mt-1 font-heading text-2xl font-bold text-whatsapp">{fmt(income)}</p>
        </div>
        <div className="rounded-card border border-line bg-background p-5 shadow-soft">
          <p className="text-sm text-muted">Toplam Gider</p>
          <p className="mt-1 font-heading text-2xl font-bold text-brand">{fmt(expense)}</p>
        </div>
        <div className="rounded-card border border-line bg-background p-5 shadow-soft">
          <p className="text-sm text-muted">Net {net >= 0 ? '(Kâr)' : '(Zarar)'}</p>
          <p className={`mt-1 font-heading text-2xl font-bold ${net >= 0 ? 'text-whatsapp' : 'text-brand'}`}>
            {fmt(net)}
          </p>
        </div>
      </div>

      {/* Kayıt ekleme formu */}
      <form
        onSubmit={addEntry}
        className="mt-6 rounded-card border border-line bg-background p-5 shadow-soft"
      >
        <h2 className="font-heading text-lg font-semibold text-ink">Kayıt Ekle</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <label className="block lg:col-span-1">
            <span className="text-xs font-medium text-muted">Tür</span>
            <select
              value={type}
              onChange={(e) => {
                const t = e.target.value as 'gelir' | 'gider'
                setType(t)
                setCategory((t === 'gider' ? EXPENSE_CATS : INCOME_CATS)[0])
              }}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand"
            >
              <option value="gider">Gider</option>
              <option value="gelir">Gelir</option>
            </select>
          </label>
          <label className="block lg:col-span-1">
            <span className="text-xs font-medium text-muted">Tarih</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand"
            />
          </label>
          <label className="block lg:col-span-1">
            <span className="text-xs font-medium text-muted">Kategori</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand"
            >
              {cats.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2 lg:col-span-2">
            <span className="text-xs font-medium text-muted">Açıklama</span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="örn. Kuzu bağırsak alımı"
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand"
            />
          </label>
          <label className="block lg:col-span-1">
            <span className="text-xs font-medium text-muted">Tutar (₺)</span>
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand"
            />
          </label>
        </div>
        <button type="submit" className="btn-brand mt-4 px-5 py-2 text-sm">
          Ekle
        </button>
      </form>

      {/* Gider kategori dağılımı */}
      {byCat.length > 0 && (
        <div className="mt-6 rounded-card border border-line bg-background p-5 shadow-soft">
          <h2 className="font-heading text-lg font-semibold text-ink">Gider Dağılımı</h2>
          <ul className="mt-3 space-y-2">
            {byCat.map(([cat, val]) => (
              <li key={cat} className="flex items-center justify-between text-sm">
                <span className="text-muted">{cat}</span>
                <span className="font-medium text-ink">{fmt(val)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Kayıt listesi */}
      <div className="mt-6">
        <h2 className="mb-3 font-heading text-lg font-semibold text-ink">
          {month} Kayıtları ({monthEntries.length})
        </h2>
        {monthEntries.length === 0 ? (
          <p className="rounded-card border border-dashed border-line bg-background p-6 text-center text-sm text-muted">
            Bu ay için henüz kayıt yok. Yukarıdan ekleyebilirsin.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-card border border-line bg-background shadow-soft">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-muted">
                  <th className="px-4 py-3 font-medium">Tarih</th>
                  <th className="px-4 py-3 font-medium">Tür</th>
                  <th className="px-4 py-3 font-medium">Kategori</th>
                  <th className="px-4 py-3 font-medium">Açıklama</th>
                  <th className="px-4 py-3 text-right font-medium">Tutar</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {monthEntries.map((e) => (
                  <tr key={e.id} className="border-b border-line last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 text-ink">{e.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          e.type === 'gelir'
                            ? 'bg-whatsapp/15 text-whatsapp'
                            : 'bg-brand/10 text-brand'
                        }`}
                      >
                        {e.type === 'gelir' ? 'Gelir' : 'Gider'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{e.category}</td>
                    <td className="px-4 py-3 text-muted">{e.description || '—'}</td>
                    <td className={`whitespace-nowrap px-4 py-3 text-right font-medium ${e.type === 'gelir' ? 'text-whatsapp' : 'text-ink'}`}>
                      {e.type === 'gelir' ? '+' : '−'}
                      {fmt(e.amount)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => remove(e.id)} className="text-brand hover:underline">
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-8 text-xs text-muted">
        🔒 Bu veriler yalnızca bu tarayıcıda saklanır (GitHub’a gitmez). Başka cihazda
        görmek veya kaybetmemek için <strong>Yedekle</strong> ile JSON indir, gerektiğinde
        <strong> Yükle</strong> ile geri al.
      </p>
    </div>
  )
}
