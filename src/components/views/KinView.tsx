'use client';

import { useTranslations } from 'next-intl';
import { Users, CircleDot, Sparkles, TrendingUp, Hand } from 'lucide-react';

export default function KinView() {
  const t = useTranslations('kin');
  const whatImage = t('what.image');
  const circlesImage = t('circles.image');
  const examplesImage = t('examples.image');
  const growImage = t('grow.image');
  const circles = t.raw('circles.items') as { title: string; desc: string }[];
  const examples = t.raw('examples.items') as { title: string; desc: string }[];

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
          <Users className="h-5 w-5 text-blood" />
          <h2 className="h-title text-xl font-bold sm:text-2xl">{t('what.title')}</h2>
        </div>
        <div className="mt-3 grid items-start gap-6 lg:grid-cols-2">
          <p className="text-sm leading-relaxed text-muted sm:text-base">{t('what.desc')}</p>
          <figure className="overflow-hidden rounded-[var(--radius)] border border-border">
            <img
              src={whatImage}
              alt={t('what.title')}
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <CircleDot className="h-5 w-5 text-blood" />
          <h2 className="h-title text-xl font-bold sm:text-2xl">{t('circles.title')}</h2>
        </div>
        <div className="mt-3 grid items-start gap-6 lg:grid-cols-2">
          <p className="text-sm leading-relaxed text-muted sm:text-base">{t('circles.desc')}</p>
          <figure className="overflow-hidden rounded-[var(--radius)] border border-border">
            <img
              src={circlesImage}
              alt={t('circles.title')}
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
        <div className="mt-6 grid gap-4 sm:gap-5 sm:grid-cols-3">
          {circles.map((c, i) => (
            <div key={i} className="card">
              <h3 className="font-heading text-base font-bold text-blood">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">{t('circles.note')}</p>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blood" />
          <h2 className="h-title text-xl font-bold sm:text-2xl">{t('examples.title')}</h2>
        </div>
        <div className="mt-3 grid items-start gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{t('examples.desc')}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {examples.map((e, i) => (
                <div key={i} className="card">
                  <h3 className="font-heading text-base font-bold text-text">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <figure className="overflow-hidden rounded-[var(--radius)] border border-border">
            <img
              src={examplesImage}
              alt={t('examples.title')}
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blood" />
          <h2 className="h-title text-xl font-bold sm:text-2xl">{t('grow.title')}</h2>
        </div>
        <div className="mt-3 grid items-start gap-6 lg:grid-cols-2">
          <p className="text-sm leading-relaxed text-muted sm:text-base">{t('grow.desc')}</p>
          <figure className="overflow-hidden rounded-[var(--radius)] border border-border">
            <img
              src={growImage}
              alt={t('grow.title')}
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Hand className="h-5 w-5 text-blood" />
          <h2 className="h-title text-xl font-bold sm:text-2xl">{t('summon.title')}</h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{t('summon.desc')}</p>
      </section>

      <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted">{t('sourceNote')}</p>
    </div>
  );
}
