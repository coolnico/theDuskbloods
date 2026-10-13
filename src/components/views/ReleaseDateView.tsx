'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Calendar,
  Gamepad2,
  Users,
  Building2,
  User,
  Swords,
  Activity,
  CheckCircle2,
  HelpCircle,
  Clock,
  ShoppingBag,
  Radar,
  Newspaper,
} from 'lucide-react';

type Fact = { label: string; value: string };
type StatusItem = { title: string; desc: string };
type TimelineItem = { date: string; title: string; desc: string };
type WatchItem = { title: string; desc: string };
type RelatedItem = { href: string; title: string; desc: string };

const FACT_ICONS = [Calendar, Gamepad2, Building2, Building2, User, Swords, Users, Gamepad2];

export default function ReleaseDateView() {
  const t = useTranslations('releaseDate');
  const facts = t.raw('facts.items') as Fact[];
  const paragraphs = t.raw('expect.paragraphs') as string[];
  const windowParagraphs = t.raw('window.paragraphs') as string[];
  const confirmed = t.raw('status.confirmed') as StatusItem[];
  const unconfirmed = t.raw('status.unconfirmed') as StatusItem[];
  const timeline = t.raw('timeline.items') as TimelineItem[];
  const editions = t.raw('editions.items') as Fact[];
  const watch = t.raw('watch.items') as WatchItem[];
  const related = t.raw('related.items') as RelatedItem[];

  return (
    <div className="space-y-10 sm:space-y-16">
      <header>
        <span className="eyebrow">{t('intro.eyebrow')}</span>
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">{t('intro.title')}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>
        <p className="mt-3 text-xs uppercase tracking-wider text-gold">{t('intro.updatedAt')}</p>
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
        <span className="eyebrow">{t('status.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('status.title')}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{t('status.lead')}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[var(--radius)] border border-emerald-500/30 bg-emerald-500/5 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              {t('status.confirmedLabel')}
            </div>
            <ul className="mt-4 space-y-4">
              {confirmed.map((item, i) => (
                <li key={i}>
                  <div className="text-sm font-semibold text-text">{item.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius)] border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
              <HelpCircle className="h-4 w-4" />
              {t('status.unconfirmedLabel')}
            </div>
            <ul className="mt-4 space-y-4">
              {unconfirmed.map((item, i) => (
                <li key={i}>
                  <div className="text-sm font-semibold text-text">{item.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <span className="eyebrow">{t('timeline.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('timeline.title')}</h2>
        <ol className="mt-6 space-y-0 border-l border-border">
          {timeline.map((item, i) => (
            <li key={i} className="relative pb-8 pl-6 last:pb-0">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-blood" aria-hidden />
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
                <Clock className="h-3.5 w-3.5" />
                {item.date}
              </div>
              <h3 className="mt-1 text-base font-semibold text-text">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
            </li>
          ))}
        </ol>
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

      <section>
        <span className="eyebrow">{t('window.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('window.title')}</h2>
        <div className="mt-5 space-y-4 prose-muted sm:mt-6 sm:space-y-5">
          {windowParagraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">{p}</p>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="flex items-start gap-3">
          <ShoppingBag className="mt-1 h-5 w-5 shrink-0 text-gold" />
          <div>
            <span className="eyebrow">{t('editions.eyebrow')}</span>
            <h2 className="h-title mt-2 text-lg font-bold sm:text-xl">{t('editions.title')}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{t('editions.lead')}</p>
          </div>
        </div>
        <dl className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2">
          {editions.map((f, i) => (
            <div key={i} className="rounded-[var(--radius)] border border-border bg-surface-2/40 p-3 sm:p-4">
              <dt className="text-xs uppercase tracking-wider text-muted">{f.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-text">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Radar className="h-5 w-5 text-gold" />
          <span className="eyebrow">{t('watch.eyebrow')}</span>
        </div>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('watch.title')}</h2>
        <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
          {watch.map((item, i) => (
            <div key={i} className="rounded-[var(--radius)] border border-border bg-surface/60 p-4">
              <h3 className="text-sm font-semibold text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-gold" />
          <span className="eyebrow">{t('related.eyebrow')}</span>
        </div>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('related.title')}</h2>
        <div className="mt-5 grid gap-3 sm:mt-6">
          {related.map((item, i) => (
            <Link
              key={i}
              href={item.href as never}
              className="group rounded-[var(--radius)] border border-border bg-surface/60 p-4 transition hover:border-blood"
            >
              <div className="text-sm font-semibold text-text group-hover:text-blood">{item.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
            </Link>
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
