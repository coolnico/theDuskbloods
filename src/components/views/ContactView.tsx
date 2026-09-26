'use client';

import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';

export default function ContactView() {
  const t = useTranslations('contact');

  return (
    <div className="space-y-8 sm:space-y-12">
      <header>
        <span className="eyebrow">{t('intro.eyebrow')}</span>
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">{t('intro.title')}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>
      </header>

      <section className="grid gap-4 sm:gap-5 sm:max-w-md">
        <div className="card">
          <Mail className="h-6 w-6 text-blood" />
          <h2 className="mt-4 font-heading text-base font-bold text-text">{t('email.title')}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{t('email.desc')}</p>
          <a
            href={`mailto:${t('email.address')}`}
            className="mt-3 inline-block text-sm font-semibold text-gold hover:underline"
          >
            {t('email.address')}
          </a>
        </div>
      </section>

      <section className="card">
        <h2 className="h-title text-lg font-bold sm:text-xl">{t('note.title')}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t('note.desc')}</p>
      </section>
    </div>
  );
}
