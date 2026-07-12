'use client'

import { useState } from 'react'
import initialProducts from '@/content/products.json'
import type { Product } from '@/content/products'

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
  { key: 'description', label: 'Açıklama', textarea: true },
  { key: 'minOrder', label: 'Min. Sipariş', hint: 'örn. 20 kg' },
  { key: 'image', label: 'Görsel Yolu', hint: 'örn. /media/products/urun.webp — dosyayı GitHub’a ayrıca yükle' },
  { key: 'imageAlt', label: 'Görsel Alt Metni (SEO)', hint: 'örn. taze-toptan-sirdan' },
  { key: 'waMessage', label: 'WhatsApp Mesajı', textarea: true },
]

/**
 * Ürün yönetimi sekmesi. products.json'ı /api/admin/save ile GitHub'a
 * commit'ler (şifre prop olarak gelir).
 */
export default function ProductManager({ password }: { password: string }) {
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [products, setProducts] = useState<Product[]>(initialProducts as Product[])

  function setField(i: number, key: keyof Product, value: string) {
    setProducts((ps) => ps.map((p, idx) => (idx === i ? { ...p, [key]: value } : p)))
  }
  function addProduct() {
    setProducts((ps) => [...ps, { ...EMPTY }])
  }
  function removeProduct(i: number) {
    setProducts((ps) => ps.filter((_, idx) => idx !== i))
  }
  function move(i: number, dir: -1 | 1) {
    setProducts((ps) => {
      const j = i + dir
      if (j < 0 || j >= ps.length) return ps
      const next = [...ps]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
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
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Ürün Yönetimi</h1>
          <p className="text-sm text-muted">
            {products.length} ürün · değişiklikler <strong>Kaydet</strong> ile canlıya yansır.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={addProduct} className="btn-outline px-4 py-2 text-sm">
            + Ürün Ekle
          </button>
          <button onClick={handleSave} disabled={busy} className="btn-brand px-4 py-2 text-sm">
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

      <div className="space-y-5">
        {products.map((p, i) => (
          <div key={i} className="rounded-card border border-line bg-background p-5 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-heading text-sm font-semibold text-muted">Ürün #{i + 1}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Yukarı" className="rounded px-2 py-1 text-muted hover:bg-surface disabled:opacity-30">↑</button>
                <button onClick={() => move(i, 1)} disabled={i === products.length - 1} aria-label="Aşağı" className="rounded px-2 py-1 text-muted hover:bg-surface disabled:opacity-30">↓</button>
                <button onClick={() => removeProduct(i)} className="rounded px-2 py-1 text-sm text-brand hover:bg-brand/10">Sil</button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <label key={f.key} className={f.textarea ? 'sm:col-span-2 block' : 'block'}>
                  <span className="text-sm font-medium text-ink">{f.label}</span>
                  {f.textarea ? (
                    <textarea value={p[f.key]} onChange={(e) => setField(i, f.key, e.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand" />
                  ) : (
                    <input value={p[f.key]} onChange={(e) => setField(i, f.key, e.target.value)} className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand" />
                  )}
                  {f.hint && <span className="mt-1 block text-xs text-muted">{f.hint}</span>}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted">
        Not: Görsel dosyalarını (webp) GitHub’da <code>public/media/products/</code> klasörüne
        ayrıca yüklemelisin; “Görsel Yolu” o dosyayı işaret eder.
      </p>
    </div>
  )
}
