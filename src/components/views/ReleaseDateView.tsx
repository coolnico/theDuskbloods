'use client';

import { useTranslations } from 'next-intl';
import { Calendar, Gamepad2, Users, Building2, User, Swords, Activity } from 'lucide-react';

const FACT_ICONS = [Calendar, Gamepad2, Building2, Building2, User, Swords, Users];

export default function ReleaseDateView() {
  const t = useTranslations('releaseDate');
  const facts = t.raw('facts.items') as { label: string; value: string }[];
  const paragraphs = t.raw('expect.paragraphs') as string[];

  return (
    <div className="space-y-10 sm:space-y-16">
      <header>
        <span className="eyebrow">{t('intro.eyebrow')}</span>
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-4xl">{t('intro.title')}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>
      </header>

      <section className="card">
        <span className="eyebrow">{t('facts.eyebrow')}</span>
        <h2 className="h-title mt-3 text-lg font-bold sm:text-xl">{t('facts.title')}</h2>
        <dl className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-2">
          {facts.map((f, i) => {
            const Icon = FACT_ICONS[i % FACT_ICONS.length];
            return (
              <div key={i} className="flex items-center gap-3 rounded-[var(--radius)] border border-border bg-surface-2/40 p-3 sm:p-4">
                <Icon className="h-5 w-5 shrink-0 text-gold" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                  <dd className="text-sm font-semibold text-text">{f.value}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </section>

      <section>
        <span className="eyebrow">{t('expect.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('expect.title')}</h2>
        <div className="mt-5 space-y-4 prose-muted sm:mt-6 sm:space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">{p}</p>
          ))}
        </div>
      </section>

      <section className="card text-center">
        <Activity className="mx-auto h-7 w-7 text-blood sm:h-8 sm:w-8" />
        <h2 className="h-title mt-3 text-lg font-bold text-text sm:mt-4 sm:text-xl">{t('cta.title')}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted sm:mt-3">{t('cta.desc')}</p>
      </section>
    </div>
  );
}
