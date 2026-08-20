'use client';

import { useTranslations } from 'next-intl';
import { Swords, Droplet, Eye, History, Wrench, Compass } from 'lucide-react';

const TRAIT_ICONS = [Swords, Droplet, Eye, History, Wrench, Compass];
const CHAR_IMG = '/bloodsworn.svg';

export default function CharactersView() {
  const t = useTranslations('characters');
  const traits = t.raw('traits.items') as { title: string; desc: string }[];

  return (
    <div className="space-y-10 sm:space-y-16">
      <header className="grid gap-6 sm:gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">{t('intro.eyebrow')}</span>
          <h1 className="h-title mt-3 text-2xl font-bold sm:text-4xl">{t('intro.title')}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>
          <div className="mt-6 card sm:mt-8">
            <h2 className="font-heading text-base font-bold text-text sm:text-lg">{t('about.title')}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t('about.desc')}</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-[var(--radius)] border border-border">
          <img
            src={CHAR_IMG}
            alt="Bloodsworn warrior concept art"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </header>

      <section>
        <span className="eyebrow">{t('traits.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('traits.title')}</h2>
        <div className="mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2 sm:mt-8 lg:grid-cols-3">
          {traits.map((tr, i) => {
            const Icon = TRAIT_ICONS[i % TRAIT_ICONS.length];
            return (
              <div key={i} className="card">
                <Icon className="h-6 w-6 text-blood" />
                <h3 className="mt-4 font-heading text-base font-bold text-text">{tr.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tr.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="card text-center">
        <h2 className="h-title text-xl font-bold text-text">{t('note.title')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">{t('note.desc')}</p>
      </section>
    </div>
  );
}
