'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, ClipboardList, Download, PlayCircle, Activity, Server, AlertTriangle } from 'lucide-react';

const STEP_ICONS = [ClipboardList, Activity, Download, PlayCircle];
const EXPECT_ICONS = [Activity, Server, AlertTriangle];

export default function NetworkTestView() {
  const t = useTranslations('networkTest');
  const facts = t.raw('facts.items') as { label: string; value: string }[];
  const steps = t.raw('howTo.steps') as { title: string; desc: string }[];
  const expect = t.raw('expect.items') as { title: string; desc: string }[];

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
          {facts.map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-[var(--radius)] border border-border bg-surface-2/40 p-3 sm:p-4">
              <Calendar className="h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                <dd className="text-sm font-semibold text-text">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <span className="eyebrow">{t('howTo.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('howTo.title')}</h2>
        <ol className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
          {steps.map((s, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length];
            return (
              <li key={i} className="card flex gap-3 sm:gap-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-blood/15 font-heading text-sm font-bold text-blood sm:h-10 sm:w-10">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-gold" />
                    <h3 className="font-heading text-sm font-bold text-text sm:text-base">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <span className="eyebrow">{t('expect.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('expect.title')}</h2>
        <div className="mt-6 grid gap-4 sm:gap-5 sm:grid-cols-3 sm:mt-8">
          {expect.map((e, i) => {
            const Icon = EXPECT_ICONS[i % EXPECT_ICONS.length];
            return (
              <div key={i} className="card">
                <Icon className="h-6 w-6 text-blood" />
                <h3 className="mt-4 font-heading text-base font-bold text-text">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="card text-center">
        <h2 className="h-title text-xl font-bold text-text">{t('cta.title')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">{t('cta.desc')}</p>
        <div className="mt-6">
          <Link href="/gameplay" className="btn-primary">{t('intro.eyebrow')}</Link>
        </div>
      </section>
    </div>
  );
}
