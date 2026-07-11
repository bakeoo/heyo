/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ---- Statik export (Cloudflare Pages için) ----
  // Site tamamen statik olduğundan "next build" doğrudan HTML/CSS/JS üretir
  // ve "out/" klasörüne export eder. Sunucu gerektirmez.
  output: 'export',

  images: {
    // Statik export'ta Next.js görsel optimize sunucusu çalışmaz;
    // görseller olduğu gibi servis edilir. Görseller zaten WebP olarak
    // optimize edildiği için sorun değil (blur placeholder yine çalışır).
    unoptimized: true,
  },

  // Üretimde "Powered by Next.js" başlığını gizle
  poweredByHeader: false,

  // Her sayfa kendi klasöründe index.html olarak üretilir; statik
  // barındırmada (Cloudflare Pages) temiz URL yönlendirmesi sağlar.
  trailingSlash: true,
}

module.exports = nextConfig
