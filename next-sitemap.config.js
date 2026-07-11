/**
 * next-sitemap yapılandırması.
 * "npm run build" sonrası (postbuild) çalışır ve
 * sitemap.xml + robots.txt üretir.
 *
 * Statik export kullanıldığı için çıktı "out/" klasörüne yazılır
 * (Cloudflare Pages bu klasörü yayınlar).
 *
 * Not: /kampanya sayfası reklam açılış sayfasıdır ve noindex'tir;
 * sitemap'ten ve robots'tan hariç tutulur.
 */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://toptansirdanci.com',
  generateRobotsTxt: true,
  // Statik export klasörü
  outDir: './out',
  // Kampanya sayfasını sitemap dışında bırak
  exclude: ['/kampanya'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/kampanya'],
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
}
