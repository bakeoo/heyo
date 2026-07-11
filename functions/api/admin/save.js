/**
 * POST /api/admin/save  { password, products: Product[] }
 * Şifreyi doğrular, ürünleri validate eder ve products.json'ı GitHub'a
 * commit'ler. Commit sonrası Cloudflare Pages otomatik yeniden yayınlar.
 *
 * Gerekli ortam değişkenleri (Cloudflare Pages > Settings > Environment variables):
 *   ADMIN_PASSWORD   (secret)  – yönetim şifresi
 *   GITHUB_TOKEN     (secret)  – Contents: write yetkili fine-grained PAT
 *   GITHUB_REPO                – "bakeoo/heyo" (varsayılan)
 *   GITHUB_BRANCH              – deploy edilen branch (varsayılan aşağıda)
 *   PRODUCTS_PATH             – "src/content/products.json" (varsayılan)
 */
export async function onRequestPost({ request, env }) {
  try {
    if (!env.ADMIN_PASSWORD || !env.GITHUB_TOKEN) {
      return json(
        { error: 'Sunucu yapılandırması eksik (ADMIN_PASSWORD / GITHUB_TOKEN).' },
        500
      )
    }

    const body = await request.json()
    if (!timingSafeEqual(String(body.password || ''), env.ADMIN_PASSWORD)) {
      return json({ error: 'Yetkisiz.' }, 401)
    }

    const products = body.products
    const err = validate(products)
    if (err) return json({ error: err }, 400)

    const repo = env.GITHUB_REPO || 'bakeoo/heyo'
    const branch = env.GITHUB_BRANCH || 'claude/bold-ptolemy-gwqf2z'
    const path = env.PRODUCTS_PATH || 'src/content/products.json'
    const api = `https://api.github.com/repos/${repo}/contents/${path}`
    const ghHeaders = {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      'User-Agent': 'sirdanci-ado-admin',
      Accept: 'application/vnd.github+json',
    }

    // Mevcut dosyanın SHA'sını al (güncelleme için gerekli)
    let sha
    const getRes = await fetch(`${api}?ref=${encodeURIComponent(branch)}`, {
      headers: ghHeaders,
    })
    if (getRes.status === 200) {
      const j = await getRes.json()
      sha = j.sha
    } else if (getRes.status !== 404) {
      const t = await getRes.text()
      return json({ error: `GitHub okuma hatası (${getRes.status}).`, detail: t.slice(0, 200) }, 502)
    }

    const contentStr = JSON.stringify(products, null, 2) + '\n'
    const putRes = await fetch(api, {
      method: 'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'chore(admin): urunleri guncelle',
        content: base64Utf8(contentStr),
        branch,
        ...(sha ? { sha } : {}),
      }),
    })

    if (!putRes.ok) {
      const t = await putRes.text()
      return json(
        { error: `GitHub yazma hatası (${putRes.status}).`, detail: t.slice(0, 300) },
        502
      )
    }

    return json({ ok: true })
  } catch (e) {
    return json({ error: 'Sunucu hatası: ' + ((e && e.message) || String(e)) }, 500)
  }
}

function validate(products) {
  if (!Array.isArray(products)) return 'Geçersiz veri (dizi bekleniyor).'
  if (products.length === 0) return 'En az bir ürün olmalı.'
  if (products.length > 30) return 'En fazla 30 ürün eklenebilir.'
  const fields = ['id', 'name', 'description', 'minOrder', 'image', 'imageAlt', 'waMessage']
  for (const p of products) {
    if (typeof p !== 'object' || !p) return 'Geçersiz ürün kaydı.'
    for (const f of fields) {
      if (typeof p[f] !== 'string') return `Alan eksik veya geçersiz: ${f}`
      if (p[f].length > 600) return `Alan çok uzun: ${f}`
    }
    if (!p.name.trim()) return 'Ürün adı boş olamaz.'
  }
  return null
}

// UTF-8 güvenli base64 (Türkçe karakterler için)
function base64Utf8(str) {
  const bytes = new TextEncoder().encode(str)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin)
}

function timingSafeEqual(a, b) {
  const len = Math.max(a.length, b.length)
  let out = a.length === b.length ? 0 : 1
  for (let i = 0; i < len; i++) {
    out |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0)
  }
  return out === 0
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
