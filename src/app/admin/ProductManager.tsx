'use client'

import { useEffect, useState } from 'react'
import initialProducts from '@/content/products.json'
import type { Product } from '@/content/products'

// Ürünleri GitHub'dan CANLI çek (build anındaki eski kopya yerine).
const REPO = 'bakeoo/heyo'
const BRANCH = 'claude/bold-ptolemy-gwqf2z'
const LIVE_URL = `https://api.github.com/repos/${REPO}/contents/src/content/products.json?ref=${encodeURIComponent(BRANCH)}`

const EMPTY: Product = {
  id: '',
  name: '',
  description: '',
  minOrder: '20 kg',
  image: '/media/products/',
  imageAlt: '',
  waMessage: 'Merhaba, toptan ürün fiyatı almak istiyorum.',
}

function slugify(s: string): string {
  return (s || '')
    .toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const FIELDS: { key: keyof Product; label: string; textarea?: boolean; hint?: string }[] = [
  { key: 'name', label: 'Ürün Adı' },
  { key: 'minOrder', label: 'Min. Sipariş', hint: 'örn. 20 kg' },
  { key: 'description', label: 'Açıklama', textarea: true },
  { key: 'image', label: 'Görsel Yolu / URL', hint: '/media/products/urun.webp ya da https://... görsel linki' },
  { key: 'imageAlt', label: 'Görsel Alt Metni (SEO)', hint: 'örn. taze-toptan-sirdan' },
  { key: 'waMessage', label: 'WhatsApp Mesajı', textarea: true },
]

export default function ProductManager({ password }: { password: string }) {
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [products, setProducts] = useState<Product[]>(initialProducts as Product[])
  const [open, setOpen] = useState<number | null>(0) // açık olan ürün (accordion)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const res = await fetch(LIVE_URL, {
          headers: { Accept: 'application/vnd.github.raw' },
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          if (alive && Array.isArray(data) && data.length) setProducts(data)
        }
      } catch {
        /* çevrimdışı: build kopyası */
      }
      if (alive) setLoading(false)
    })()
    return () => {
      alive = false
    }
  }, [])

  function setField(i: number, key: keyof Product, value: string) {
    setProducts((ps) => ps.map((p, idx) => (idx === i ? { ...p, [key]: value } : p)))
  }
  function addProduct() {
    setProducts((ps) => [...ps, { ...EMPTY }])
    setOpen(products.length) // yeni ürünü aç
  }
  function removeProduct(i: number) {
    setProducts((ps) => ps.filter((_, idx) => idx !== i))
    setOpen((o) => (o === i ? null : o !== null && o > i ? o - 1 : o))
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= products.length) return
    setProducts((ps) => {
      const next = [...ps]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
    setOpen((o) => (o === i ? j : o === j ? i : o))
  }

  async function handleSave() {
    setBusy(true)
    setStatus(null)
    const seen = new Set<string>()
    const cleaned = products.map((p, i) => {
      let id = (p.id || '').trim() || slugify(p.name) || `urun-${i + 1}`
      while (seen.has(id)) id = `${id}-${i + 1}`
      seen.add(id)
      return { ...p, id }
    })
    if (cleaned.some((p) => !p.name.trim())) {
      setStatus({ type: 'err', text: 'Her ürünün adı dolu olmalı.' })
      setBusy(false)
      return
    }
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, products: cleaned }),
      })
      const d = await res.json().catch(() => ({}))
      if (res.ok) {
        setProducts(cleaned)
        setStatus({
          type: 'ok',
          text: '✓ Kaydedildi! Site ~1-2 dakika içinde otomatik güncellenecek. (Sonra Ctrl+F5.)',
        })
      } else {
        setStatus({ type: 'err', text: d.error || `Kaydedilemedi (${res.status}).` })
      }
    } catch {
      setStatus({ type: 'err', text: 'Bağlantı hatası.' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      {/* Üst araç çubuğu */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Ürün Yönetimi</h1>
          <p className="text-sm text-muted">
            {loading ? 'Güncel veriler yükleniyor…' : `${products.length} ürün · başlığa tıkla, düzenle, `}
            {!loading && <strong className="text-ink">Kaydet</strong>}
            {!loading && ' (~1-2 dk sonra canlıda).'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={addProduct}
            disabled={loading}
            className="btn-outline px-4 py-2 text-sm disabled:opacity-50"
          >
            + Ürün Ekle
          </button>
          <button
            onClick={handleSave}
            disabled={busy || loading}
            className="btn-brand px-4 py-2 text-sm disabled:opacity-50"
          >
            {busy ? 'Kaydediliyor…' : 'Kaydet'}
          </button>
        </div>
      </div>

      {status && (
        <p
          role="alert"
          className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
            status.type === 'ok'
              ? 'border-whatsapp bg-whatsapp/10 text-ink'
              : 'border-brand bg-brand/10 text-brand'
          }`}
        >
          {status.text}
        </p>
      )}

      {/* Ürün listesi (accordion) */}
      <div className="space-y-3">
        {products.map((p, i) => {
          const isOpen = open === i
          return (
            <div
              key={i}
              className={`overflow-hidden rounded-card border bg-background shadow-soft transition ${
                isOpen ? 'border-brand' : 'border-line'
              }`}
            >
              {/* Başlık satırı */}
              <div className="flex items-center gap-3 p-3">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-line bg-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.visibility = 'hidden'
                      }}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-heading text-base font-bold text-ink sm:text-lg">
                      {p.name || 'İsimsiz ürün'}
                    </span>
                    <span className="block text-xs text-muted">Min. {p.minOrder || '—'}</span>
                  </span>
                </button>

                <div className="flex shrink-0 items-center gap-0.5">
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label="Yukarı taşı"
                    className="rounded px-2 py-1 text-muted hover:bg-surface disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === products.length - 1}
                    aria-label="Aşağı taşı"
                    className="rounded px-2 py-1 text-muted hover:bg-surface disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeProduct(i)}
                    aria-label="Ürünü sil"
                    className="rounded px-2 py-1 text-sm font-medium text-brand hover:bg-brand/10"
                  >
                    Sil
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-label={isOpen ? 'Kapat' : 'Aç'}
                    className="ml-1 rounded px-2 py-1 text-muted hover:bg-surface"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Düzenleme alanı */}
              {isOpen && (
                <div className="border-t border-line bg-surface/50 p-4 sm:p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {FIELDS.map((f) => (
                      <label
                        key={f.key}
                        className={f.textarea ? 'block sm:col-span-2' : 'block'}
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                          {f.label}
                        </span>
                        {f.textarea ? (
                          <textarea
                            value={p[f.key]}
                            onChange={(e) => setField(i, f.key, e.target.value)}
                            rows={2}
                            className="mt-1 w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-ink outline-none focus:border-brand"
                          />
                        ) : (
                          <input
                            value={p[f.key]}
                            onChange={(e) => setField(i, f.key, e.target.value)}
                            className="mt-1 w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-ink outline-none focus:border-brand"
                          />
                        )}
                        {f.hint && <span className="mt-1 block text-xs text-muted">{f.hint}</span>}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="mt-8 text-xs text-muted">
        İpucu: Başlığa tıklayınca ürün açılır/kapanır — böylece kalabalık listede kaybolmazsın.
        Görsel dosyalarını (webp) GitHub’da <code>public/media/products/</code> klasörüne
        yükleyip “Görsel Yolu” alanında o yolu verebilir ya da doğrudan bir https görsel linki
        yapıştırabilirsin.
      </p>
    </div>
  )
}
