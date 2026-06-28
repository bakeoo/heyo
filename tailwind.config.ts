import type { Config } from 'tailwindcss'

/**
 * Tailwind yapılandırması.
 * Tasarım sistemi renkleri ve tipografi burada merkezi olarak tanımlı.
 * Renkleri değiştirmek istersen sadece buradaki "colors" objesini düzenle.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Marka renk paleti
        background: '#FFFFFF',
        surface: '#F8F8F8',
        ink: '#1A1A1A', // ana metin
        muted: '#555555', // ikincil metin
        brand: {
          DEFAULT: '#C0392B', // kırmızı aksan
          dark: '#962d22', // hover koyu kırmızı
        },
        whatsapp: '#25D366', // WhatsApp yeşili
        whatsappDark: '#1da851',
        line: '#E5E5E5', // border
      },
      fontFamily: {
        // next/font tarafından sağlanan CSS değişkenleri
        heading: ['var(--font-oswald)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Type scale (mobil değerler; desktop için sm:/lg: kullanılır)
        'h1-m': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h1-d': ['4.5rem', { lineHeight: '1.05', fontWeight: '700' }],
        'h2-m': ['2rem', { lineHeight: '1.15', fontWeight: '700' }],
        'h2-d': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
      },
      borderRadius: {
        card: '8px',
        btn: '24px',
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0,0,0,0.08)',
        header: '0 2px 8px rgba(0,0,0,0.06)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
