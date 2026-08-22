'use client';

import { useTranslations } from 'next-intl';

import { Calendar, Clock, Download, AlertTriangle, Activity, Server, CheckCircle2, Ban } from 'lucide-react';

const EXPECT_ICONS = [Activity, Server, AlertTriangle];

export default function NetworkTestView() {
  const t = useTranslations('networkTest');
  const requirements = t.raw('requirements.items') as { label: string; value: string }[];
  const sessions = t.raw('schedule.sessions.items') as { date: string; time: string }[];
  const expect = t.raw('expect.items') as { title: string; desc: string }[];

  return (
    <div className="space-y-10 sm:space-y-16">
      <header>
        <span className="eyebrow">{t('intro.eyebrow')}</span>
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-4xl">{t('intro.title')}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>

        {/* Application ended banner */}
        <div className="mt-5 flex items-start gap-3 rounded-[var(--radius)] border border-blood/30 bg-blood/10 p-4 sm:mt-6">
          <Ban className="mt-0.5 h-5 w-5 shrink-0 text-blood" />
          <div>
            <p className="text-base font-bold text-blood">{t('status.label')}</p>
            <p className="mt-1 text-base leading-relaxed text-muted">{t('status.desc')}</p>
          </div>
        </div>
      </header>

      {/* Schedule section */}
      <section className="card">
        <span className="eyebrow">{t('schedule.eyebrow')}</span>
        <h2 className="h-title mt-3 text-lg font-bold sm:text-xl">{t('schedule.title')}</h2>

        <div className="mt-5 space-y-4 sm:mt-6">
          {/* Application period */}
          <div className="flex items-start gap-3 rounded-[var(--radius)] border border-border bg-surface-2/40 p-3 sm:p-4">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div>
              <dt className="text-sm uppercase tracking-wider text-muted">{t('schedule.application.label')}</dt>
              <dd className="mt-1 text-base font-semibold text-text">
                {t('schedule.application.start')}
                <br />
                <span className="text-muted">至</span>
                <br />
                {t('schedule.application.end')}
              </dd>
              <p className="mt-1 text-sm text-muted">{t('schedule.application.note')}</p>
            </div>
          </div>

          {/* Selection announcement */}
          <div className="flex items-start gap-3 rounded-[var(--radius)] border border-border bg-surface-2/40 p-3 sm:p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div>
              <dt className="text-sm uppercase tracking-wider text-muted">{t('schedule.selection.label')}</dt>
              <dd className="mt-1 text-base font-semibold text-text">{t('schedule.selection.date')}</dd>
              <p className="mt-1 text-sm text-muted">{t('schedule.selection.note')}</p>
            </div>
          </div>

          {/* Download */}
          <div className="flex items-start gap-3 rounded-[var(--radius)] border border-border bg-surface-2/40 p-3 sm:p-4">
            <Download className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div>
              <dt className="text-sm uppercase tracking-wider text-muted">{t('schedule.download.label')}</dt>
              <dd className="mt-1 text-base font-semibold text-text">{t('schedule.download.date')}</dd>
              <p className="mt-1 text-sm text-muted">{t('schedule.download.note')}</p>
            </div>
          </div>

          {/* Test sessions */}
          <div className="rounded-[var(--radius)] border border-border bg-surface-2/40 p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 shrink-0 text-gold" />
              <dt className="text-sm uppercase tracking-wider text-muted">{t('schedule.sessions.label')}</dt>
            </div>
            <p className="mt-1 text-sm text-muted">{t('schedule.sessions.note')}</p>
            <ul className="mt-3 space-y-2">
              {sessions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blood" />
                  <div>
                    <span className="font-semibold text-text">{s.date}</span>
                    <span className="ml-2 text-muted">{s.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section>
        <span className="eyebrow">{t('requirements.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('requirements.title')}</h2>
        <dl className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-2">
          {requirements.map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-[var(--radius)] border border-border bg-surface-2/40 p-3 sm:p-4">
              <Calendar className="h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-sm uppercase tracking-wider text-muted">{f.label}</dt>
                <dd className="text-base font-semibold text-text">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* What to expect */}
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
    </div>
  );
}
