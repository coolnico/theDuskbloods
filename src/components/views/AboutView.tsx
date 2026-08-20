'use client';

import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';

export default function AboutView() {
  const t = useTranslations('about');
  const paragraphs = t.raw('paragraphs') as string[];
  const facts = t.raw('facts.items') as { label: string; value: string }[];

  return (
    <div className="space-y-8 sm:space-y-12">
      <header>
        <span className="eyebrow">{t('intro.eyebrow')}</span>
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-4xl">{t('intro.title')}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>
      </header>

      <section className="space-y-4 prose-muted">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <section className="card">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-gold" />
          <h2 className="h-title text-lg font-bold sm:text-xl">{t('facts.title')}</h2>
        </div>
        <span className="eyebrow mt-1 block">{t('facts.eyebrow')}</span>
        <dl className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-2">
          {facts.map((f, i) => (
            <div key={i} className="rounded-[var(--radius)] border border-border bg-surface-2/40 p-3 sm:p-4">
              <dt className="text-xs uppercase tracking-wider text-muted">{f.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-text">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
