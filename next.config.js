/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Görsel optimizasyonu ayarları
  images: {
    // WebP ve AVIF formatlarını otomatik üret
    formats: ['image/avif', 'image/webp'],
    // Tüm görseller yerel public/ klasöründen geldiği için
    // uzak domain tanımlamaya gerek yok. Harici bir kaynak eklenirse
    // aşağıdaki remotePatterns kullanılabilir:
    remotePatterns: [],
    // Cihaz genişliklerine göre responsive boyutlar
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  // Üretimde "Powered by Next.js" başlığını gizle
  poweredByHeader: false,
  // Sonunda eğik çizgi standardı (SEO tutarlılığı)
  trailingSlash: false,
}

module.exports = nextConfig
