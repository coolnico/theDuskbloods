'use client';

import { useTranslations } from 'next-intl';
import FaqAccordion from '@/components/FaqAccordion';

type FaqItem = { q: string; a: string };
type FaqGroup = { title: string; items: FaqItem[] };

export default function FaqView() {
  const t = useTranslations('faq');
  const groups = t.raw('groups') as FaqGroup[];

  return (
    <div className="space-y-8 sm:space-y-12">
      <header>
        <span className="eyebrow">{t('intro.eyebrow')}</span>
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-4xl">{t('intro.title')}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>
      </header>

      <section className="space-y-8 sm:space-y-10">
        {groups.map((g, i) => (
          <FaqAccordion key={i} groupTitle={g.title} items={g.items} />
        ))}
      </section>
    </div>
  );
}
