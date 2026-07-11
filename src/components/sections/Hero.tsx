'use client'

import { useState } from 'react'
import Image from 'next/image'
import { WA_MESSAGES, HERO_MEDIA, BLUR_DATA_URL } from '@/config/site'
import Container from '@/components/ui/Container'
import ContactLink from '@/components/ui/ContactLink'
import { WhatsAppIcon, PhoneIcon } from '@/components/icons'

/**
 * Hero section.
 * - Arka planda video (varsa) + poster görseli (fallback).
 * - next/image priority ile arka plan görseli her zaman yüklenir;
 *   video üzerine biner, yüklenemezse görsel görünmeye devam eder.
 * - Koyu overlay ile yazılar okunur kalır.
 *
 * @param title    H1 başlık (SEO). Varsayılan ana sayfa başlığı.
 * @param subtitle Alt başlık metni.
 */
export default function Hero({
  title = 'Türkiye Geneli Toptan Kokoreç ve Şırdan Tedarikçisi',
  subtitle = 'Günlük taze kesim | Soğuk zincir kargo | Fatura kesiyoruz | Minimum siparişten itibaren',
}: {
  title?: string
  subtitle?: string
}) {
  // Video yüklenemezse gizle (poster görseli altta kalır)
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      {/* Arka plan görseli (her zaman yüklenir, video için fallback) */}
      <Image
        src={HERO_MEDIA.poster}
        alt="toptan-kokorec-ve-sirdan-uretim"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover"
      />

      {/* Arka plan videosu (üstte; yoksa görsel görünür) */}
      {!videoFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_MEDIA.poster}
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
        >
          <source src={HERO_MEDIA.video} type="video/mp4" />
        </video>
      )}

      {/* Koyu overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        aria-hidden="true"
      />

      {/* İçerik */}
      <Container className="relative z-10 py-20 text-white">
        <h1 className="max-w-4xl text-h1-m font-bold leading-tight sm:text-h1-d">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ContactLink
            channel="whatsapp"
            message={WA_MESSAGES.general}
            location="hero"
            className="btn-whatsapp text-lg"
          >
            <WhatsAppIcon className="h-6 w-6" />
            WhatsApp&apos;tan Fiyat Al
          </ContactLink>
          <ContactLink
            channel="phone"
            location="hero"
            className="btn-outline-white text-lg"
          >
            <PhoneIcon className="h-6 w-6" />
            Hemen Ara
          </ContactLink>
        </div>
      </Container>
    </section>
  )
}
