'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

const BASE = 'https://media.fromsoftware.jp/theduskbloods/resources/images/images/pc';

// Main screenshots (001-030, skipping 011)
const MAIN = [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
// Expansion screenshots
const EXP = [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

function pad(n: number) {
  return String(n).padStart(3, '0');
}

const ALL_IMAGES = [
  ...MAIN.map((n) => ({ src: `${BASE}/${pad(n)}.png`, group: 'main' as const })),
  ...EXP.map((n) => ({ src: `${BASE}/expansion/${pad(n)}.png`, group: 'expansion' as const })),
];

export default function GalleryView() {
  const t = useTranslations('gallery');
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  function go(i: number) {
    setIdx((i + ALL_IMAGES.length) % ALL_IMAGES.length);
  }

  return (
    <div className="space-y-10 sm:space-y-16">
      <header>
        <span className="eyebrow">{t('intro.eyebrow')}</span>
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-4xl">{t('intro.title')}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>
      </header>

      <section>
        <span className="eyebrow">{t('main.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('main.title')}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {MAIN.map((n, i) => (
            <button
              key={n}
              onClick={() => { setIdx(i); setOpen(true); }}
              className="group relative aspect-video overflow-hidden rounded-[var(--radius)] border border-border bg-surface-2 transition hover:border-blood"
            >
              <img
                src={`${BASE}/${pad(n)}.png`}
                alt={t('main.alt', { n: i + 1 })}
                className="h-full w-full object-cover transition group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                <ImageIcon className="h-6 w-6 text-white opacity-0 transition group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <span className="eyebrow">{t('expansion.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('expansion.title')}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {EXP.map((n, i) => (
            <button
              key={n}
              onClick={() => { setIdx(MAIN.length + i); setOpen(true); }}
              className="group relative aspect-video overflow-hidden rounded-[var(--radius)] border border-border bg-surface-2 transition hover:border-blood"
            >
              <img
                src={`${BASE}/expansion/${pad(n)}.png`}
                alt={t('expansion.alt', { n: i + 1 })}
                className="h-full w-full object-cover transition group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                <ImageIcon className="h-6 w-6 text-white opacity-0 transition group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute right-4 top-4 text-white/80 hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            onClick={(e) => { e.stopPropagation(); go(idx - 1); }}
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <img
            src={ALL_IMAGES[idx].src}
            alt={t('lightbox.alt', { n: idx + 1 })}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            onClick={(e) => { e.stopPropagation(); go(idx + 1); }}
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          <div className="absolute bottom-4 text-sm text-white/60">
            {idx + 1} / {ALL_IMAGES.length}
          </div>
        </div>
      )}
    </div>
  );
}
