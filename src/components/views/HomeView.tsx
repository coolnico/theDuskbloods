'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Swords, Droplet, Users, Moon, Gamepad2, MonitorSmartphone } from 'lucide-react';
import FaqAccordion from '@/components/FaqAccordion';

const HERO_IMG = '/hero.svg';
const BASE = 'https://media.fromsoftware.jp/theduskbloods/resources/images/images/pc';
const PREVIEW_IDS = [1, 5, 8, 14, 20, 26];

const VIDEOS = [
  { id: 'K7oI_Bo9z8I', key: 'debut' },
  { id: '020HBXwwFeo', key: 'networkTest' },
];

const FEATURE_ICONS = [Swords, Droplet, Users, Moon, Gamepad2, MonitorSmartphone];

export default function HomeView() {
  const t = useTranslations('home');
  const features = t.raw('features.items') as { title: string; desc: string }[];
  const faqItems = t.raw('faq.items') as { q: string; a: string }[];

  return (
    <div className="space-y-12 sm:space-y-20">
      {/* Hero + Videos — tight grouping */}
      <div className="space-y-4 sm:space-y-6">
      <section className="relative overflow-hidden rounded-[var(--radius)] border border-border">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/40" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blood/60 to-transparent" aria-hidden />
        <svg className="absolute right-5 top-5 text-gold/50" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M24 0 L32 0 L32 8 M32 0 L16 16" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="28" cy="4" r="1.5" fill="currentColor"/>
        </svg>
        <svg className="absolute left-5 bottom-5 text-gold/50" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M0 24 L0 32 L8 32 M0 32 L16 16" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="4" cy="28" r="1.5" fill="currentColor"/>
        </svg>
        <div className="relative px-5 py-10 sm:px-10 sm:py-24">
          <span className="eyebrow">{t('hero.badge')}</span>
          <h1 className="h-title mt-3 text-3xl font-bold text-text sm:text-6xl sm:mt-4">
            {t('hero.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-lg">
            {t('hero.subtitle')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Link href="/gameplay" className="btn-primary">{t('hero.ctaPrimary')}</Link>
            <Link href="/network-test" className="btn-ghost">{t('hero.ctaSecondary')}</Link>
          </div>
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-3 lg:grid-cols-5">
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">{t('hero.releaseLabel')}</dt>
              <dd className="mt-1 font-heading text-lg font-bold text-text">{t('hero.releaseValue')}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">{t('hero.platformLabel')}</dt>
              <dd className="mt-1 font-heading text-sm font-bold text-text">{t('hero.platformValue')}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">{t('hero.genreLabel')}</dt>
              <dd className="mt-1 font-heading text-sm font-bold text-text">{t('hero.genreValue')}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">{t('hero.playersLabel')}</dt>
              <dd className="mt-1 font-heading text-lg font-bold text-text">{t('hero.playersValue')}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">{t('hero.playableLabel')}</dt>
              <dd className="mt-1 font-heading text-lg font-bold text-text">{t('hero.playableValue')}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Videos */}
      <section>
        <span className="eyebrow">{t('videos.eyebrow')}</span>
        <h2 className="h-title mt-3 text-2xl font-bold sm:text-3xl">{t('videos.title')}</h2>
        <div className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-2">
          {VIDEOS.map((v) => (
            <div key={v.id} className="card overflow-hidden p-0">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={t(`videos.${v.key}`)}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-3 sm:px-5 sm:py-4">
                <h3 className="font-heading text-sm font-bold text-text sm:text-base">{t(`videos.${v.key}`)}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* Screenshot preview */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">{t('screenshots.eyebrow')}</span>
            <h2 className="h-title mt-3 text-2xl font-bold sm:text-3xl">{t('screenshots.title')}</h2>
          </div>
          <Link href="/gallery" className="btn-ghost shrink-0 text-sm">{t('screenshots.cta')}</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {PREVIEW_IDS.map((n) => (
            <Link
              key={n}
              href="/gallery"
              className="group relative aspect-video overflow-hidden rounded-[var(--radius)] border border-border bg-surface-2 transition hover:border-blood"
            >
              <img
                src={`${BASE}/${String(n).padStart(3, '0')}.png`}
                alt={t('screenshots.alt', { n })}
                className="h-full w-full object-cover transition group-hover:scale-105"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section>
        <span className="eyebrow">{t('overview.eyebrow')}</span>
        <h2 className="h-title mt-3 text-2xl font-bold sm:text-3xl">{t('overview.title')}</h2>
        <div className="mt-5 space-y-4 prose-muted">
          {(t.raw('overview.paragraphs') as string[]).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <span className="eyebrow">{t('features.eyebrow')}</span>
        <h2 className="h-title mt-3 text-2xl font-bold sm:text-3xl">{t('features.title')}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              <div key={i} className="card">
                <Icon className="h-6 w-6 text-blood" />
                <h3 className="mt-4 font-heading text-lg font-bold text-text">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Network banner */}
      <section className="card relative overflow-hidden border-blood/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="eyebrow">{t('networkBanner.eyebrow')}</span>
            <h2 className="h-title mt-2 text-xl font-bold">{t('networkBanner.title')}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted">{t('networkBanner.desc')}</p>
          </div>
          <Link href="/network-test" className="btn-primary shrink-0">{t('networkBanner.cta')}</Link>
        </div>
      </section>

      {/* Characters teaser */}
      <section className="text-center">
        <span className="eyebrow">{t('charactersTeaser.eyebrow')}</span>
        <h2 className="h-title mt-3 text-2xl font-bold sm:text-3xl">{t('charactersTeaser.title')}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {t('charactersTeaser.desc')}
        </p>
        <div className="mt-6">
          <Link href="/characters" className="btn-ghost">{t('charactersTeaser.cta')}</Link>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <span className="eyebrow">{t('faq.eyebrow')}</span>
        <h2 className="h-title mt-3 text-2xl font-bold sm:text-3xl">{t('faq.title')}</h2>
        <div className="mt-8">
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
