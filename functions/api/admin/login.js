/**
 * POST /api/admin/login  { password }
 * Şifreyi sunucu tarafında (Cloudflare env secret) doğrular.
 * Ortam değişkeni: ADMIN_PASSWORD
 */
export async function onRequestPost({ request, env }) {
  try {
    if (!env.ADMIN_PASSWORD) {
      return json({ error: 'Sunucuda ADMIN_PASSWORD tanımlı değil.' }, 500)
    }
    const { password } = await request.json()
    if (!timingSafeEqual(String(password || ''), env.ADMIN_PASSWORD)) {
      return json({ error: 'Şifre hatalı.' }, 401)
    }
    return json({ ok: true })
  } catch {
    return json({ error: 'Geçersiz istek.' }, 400)
  }
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
