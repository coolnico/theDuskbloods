'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon, BookOpen } from 'lucide-react';

const BASE = 'https://img.duskbloods.net/dusk/gallery';
const V = '?v=2';

// Official screenshots (001-030, skipping 011)
const MAIN = [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

function pad(n: number) {
  return String(n).padStart(3, '0');
}

/** Grid thumbnail (800x450). */
function imageSrc(n: number) {
  return `${BASE}/${pad(n)}.png${V}`;
}

/**
 * Lightbox source (1600x900). The official "expansion" set is the same
 * screenshots at 2x resolution, so it backs the viewer instead of a
 * duplicate grid section.
 */
function hiResSrc(n: number) {
  // Same cropped asset as thumbnail (no separate expansion set on R2)
  return `${BASE}/${pad(n)}.png${V}`;
}

type FeaturedItem = {
  group: string;
  n: number;
  title: string;
  desc: string;
  keyword: string;
};

type Featured = {
  eyebrow: string;
  title: string;
  lead: string;
  sourceNote: string;
  h2A: string;
  h2B: string;
  h2C: string;
  items: FeaturedItem[];
};

const GROUP_KEYS = [
  { key: 'a', heading: 'h2A' as const },
  { key: 'b', heading: 'h2B' as const },
  { key: 'c', heading: 'h2C' as const },
];

export default function GalleryView() {
  const t = useTranslations('gallery');
  const featured = t.raw('featured') as Featured | undefined;
  const featuredItems = featured?.items ?? [];
  // Numbers already shown with commentary above — keep the grid below duplicate-free
  const featuredNs = new Set(featuredItems.map((i) => i.n));
  const gridImages = MAIN.filter((n) => !featuredNs.has(n));
  const groups = GROUP_KEYS.map((g) => ({
    ...g,
    headingText: featured ? featured[g.heading] : '',
    items: featuredItems.filter((i) => i.group === g.key),
  }));

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  function go(i: number) {
    setIdx((i + MAIN.length) % MAIN.length);
  }

  function openAt(n: number) {
    const i = MAIN.indexOf(n);
    if (i >= 0) {
      setIdx(i);
      setOpen(true);
    }
  }

  function FeaturedCard({ item }: { item: FeaturedItem }) {
    return (
      <article id={`shot-${item.group}-${item.n}`} className="group overflow-hidden rounded-[var(--radius)] border border-border bg-surface/60">
        <button
          type="button"
          onClick={() => openAt(item.n)}
          className="relative block w-full aspect-video overflow-hidden bg-surface-2"
        >
          <img
            src={imageSrc(item.n)}
            alt={`${item.keyword} — ${item.title}`}
            title={item.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
        </button>
        <div className="p-4 sm:p-5">
          <h3 className="text-base font-semibold text-text sm:text-lg">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
          <p className="mt-3 text-xs text-gold">{item.keyword}</p>
        </div>
      </article>
    );
  }

  return (
    <div className="space-y-10 sm:space-y-16">
      <header>
        <span className="eyebrow">{t('intro.eyebrow')}</span>
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">{t('intro.title')}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>
      </header>

      {featured && featuredItems.length > 0 && (
        <section>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-gold" />
            <span className="eyebrow">{featured.eyebrow}</span>
          </div>
          <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl lg:text-3xl">{featured.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{featured.lead}</p>

          {groups.map((g) =>
            g.items.length ? (
              <div key={g.key}>
                <h3 className="h-title mt-8 text-lg font-bold sm:text-xl">{g.headingText}</h3>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {g.items.map((item) => (
                    <FeaturedCard key={`${item.group}-${item.n}`} item={item} />
                  ))}
                </div>
              </div>
            ) : null
          )}

          <p className="mt-8 text-xs leading-relaxed text-muted">{featured.sourceNote}</p>
        </section>
      )}

      <section>
        <span className="eyebrow">{t('main.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('main.title')}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {gridImages.map((n) => (
            <button
              key={n}
              onClick={() => openAt(n)}
              className="group relative aspect-video overflow-hidden rounded-[var(--radius)] border border-border bg-surface-2 transition hover:border-blood"
            >
              <img
                src={imageSrc(n)}
                alt={`${t('main.alt', { n })} — The Duskbloods screenshot ${pad(n)}`}
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
            src={hiResSrc(MAIN[idx])}
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
            {idx + 1} / {MAIN.length}
          </div>
        </div>
      )}
    </div>
  );
}
