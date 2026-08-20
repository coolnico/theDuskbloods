'use client';

import { useTranslations } from 'next-intl';

export default function StaticView({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section className="space-y-6">
      <h1 className="h-title text-2xl font-bold sm:text-3xl">{t('title')}</h1>
      <p className="text-sm text-muted">{t('description')}</p>
      <div className="space-y-4 prose-muted">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
