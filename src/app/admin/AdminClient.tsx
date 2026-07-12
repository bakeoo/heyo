'use client'

import { useState } from 'react'
import ProductManager from './ProductManager'
import CostManager from './CostManager'

type TabId = 'products' | 'costs'

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'products', label: 'Ürün Yönetimi', icon: <BoxIcon /> },
  { id: 'costs', label: 'Maliyet Yönetimi', icon: <WalletIcon /> },
]

export default function AdminClient() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [tab, setTab] = useState<TabId>('products')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setErr('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) setAuthed(true)
      else {
        const d = await res.json().catch(() => ({}))
        setErr(d.error || 'Şifre hatalı.')
      }
    } catch {
      setErr('Bağlantı hatası. (Panel yalnızca canlı sitede çalışır.)')
    } finally {
      setBusy(false)
    }
  }

  function logout() {
    setAuthed(false)
    setPassword('')
  }

  // ---- Giriş ekranı ----
  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-card border border-line bg-background p-8 shadow-soft"
        >
          <h1 className="font-heading text-2xl font-bold text-ink">
            <span className="text-brand">●</span> Yönetim Paneli
          </h1>
          <p className="mt-1 text-sm text-muted">Devam etmek için şifreyi girin.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            autoFocus
            className="mt-5 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none focus:border-brand"
          />
          <button type="submit" disabled={busy} className="btn-brand mt-4 w-full">
            {busy ? 'Kontrol ediliyor…' : 'Giriş Yap'}
          </button>
          {err && (
            <p className="mt-3 text-sm text-brand" role="alert">
              {err}
            </p>
          )}
        </form>
      </main>
    )
  }

  // ---- Dashboard (sidebar + içerik) ----
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Masaüstü sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-background md:flex">
        <div className="border-b border-line px-5 py-4">
          <p className="font-heading text-lg font-bold text-ink">
            <span className="text-brand">●</span> Yönetim
          </p>
          <p className="text-xs text-muted">ŞIRDANCI ADO</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                tab === t.id ? 'bg-brand text-white' : 'text-ink hover:bg-surface'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-line p-3">
          <button
            onClick={logout}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted transition hover:bg-surface"
          >
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* İçerik */}
      <div className="min-w-0 flex-1">
        {/* Mobil sekme çubuğu */}
        <div className="sticky top-0 z-10 flex items-center gap-1 overflow-x-auto border-b border-line bg-background/95 p-2 backdrop-blur md:hidden">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                tab === t.id ? 'bg-brand text-white' : 'text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
          <button onClick={logout} className="ml-auto whitespace-nowrap px-3 py-2 text-sm text-muted">
            Çıkış
          </button>
        </div>

        {tab === 'products' && <ProductManager password={password} />}
        {tab === 'costs' && <CostManager />}
      </div>
    </div>
  )
}

/* --- Sidebar ikonları --- */
function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </svg>
  )
}
function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
      <path d="M18 12a1 1 0 0 0 0 2h3v-2Z" />
    </svg>
  )
}
