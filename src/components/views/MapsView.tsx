'use client';

import { useTranslations } from 'next-intl';
import { Map, Compass, Wrench } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function MapsView() {
  const t = useTranslations('maps');
  const landsImage = t('lands.image');
  const points = t.raw('lands.points') as { title: string; desc: string }[];
  const features = t.raw('regions.features') as { title: string; desc: string; image?: string }[];
  const tools = t.raw('tools.items') as { title: string; desc: string }[];

  return (
    <div className="space-y-10 sm:space-y-16">
      <header>
        <span className="eyebrow">{t('intro.eyebrow')}</span>
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">{t('intro.title')}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>
        <p className="mt-2 text-xs uppercase tracking-wider text-gold">{t('intro.updatedAt')}</p>
      </header>

      <section>
        <div className="flex items-center gap-2">
          <Map className="h-5 w-5 text-blood" />
          <h2 className="h-title text-xl font-bold sm:text-2xl">{t('lands.title')}</h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{t('lands.desc')}</p>
        <figure className="mt-6 overflow-hidden rounded-[var(--radius)] border border-border">
          <img
            src={landsImage}
            alt={t('lands.title')}
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
          />
        </figure>
        <div className="mt-6 grid gap-4 sm:gap-5 sm:grid-cols-3">
          {points.map((p, i) => (
            <div key={i} className="card">
              <h3 className="font-heading text-base font-bold text-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-blood" />
          <h2 className="h-title text-xl font-bold sm:text-2xl">{t('regions.title')}</h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{t('regions.desc')}</p>
        <div className="mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2">
          {features.map((f, i) => (
            <div key={i} className="card overflow-hidden">
              {f.image && (
                <img
                  src={f.image}
                  alt={f.title}
                  className="aspect-[16/9] w-full rounded-[var(--radius)] object-cover"
                  loading="lazy"
                />
              )}
              <h3 className="mt-4 font-heading text-base font-bold text-blood">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-blood" />
          <h2 className="h-title text-xl font-bold sm:text-2xl">{t('tools.title')}</h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{t('tools.desc')}</p>
        <div className="mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2">
          {tools.map((tool, i) => (
            <div key={i} className="card">
              <h3 className="font-heading text-base font-bold text-text">{tool.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Link
        href="/guides"
        className="card block transition hover:border-gold"
      >
        <p className="text-xs uppercase tracking-wider text-gold">{t('guidesLink.title')}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t('guidesLink.desc')}</p>
        <span className="mt-3 inline-block text-sm font-semibold text-blood hover:underline underline-offset-4">
          {t('guidesLink.cta')} →
        </span>
      </Link>

      <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted">{t('sourceNote')}</p>
    </div>
  );
}
