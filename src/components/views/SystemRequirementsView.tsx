'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Gamepad2,
  Monitor,
  Wifi,
  HardDrive,
  Gamepad,
  CheckCircle2,
  CircleDashed,
  Newspaper,
  Info,
  Activity,
} from 'lucide-react';

type Fact = { label: string; value: string };
type ControllerItem = { title: string; desc: string };
type ChecklistItem = { title: string; desc: string; required: boolean };
type RelatedItem = { href: string; title: string; desc: string };

const FACT_ICONS = [Gamepad2, Monitor, Monitor, Gamepad2, Wifi, HardDrive, Wifi, Gamepad2];

export default function SystemRequirementsView() {
  const t = useTranslations('systemRequirements');
  const facts = t.raw('facts.items') as Fact[];
  const platform = t.raw('platform.paragraphs') as string[];
  const online = t.raw('online.paragraphs') as string[];
  const storage = t.raw('storage.paragraphs') as string[];
  const controllers = t.raw('controllers.items') as ControllerItem[];
  const checklist = t.raw('checklist.items') as ChecklistItem[];
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
        <span className="eyebrow">{t('platform.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('platform.title')}</h2>
        <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
          {platform.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">{p}</p>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Wifi className="h-5 w-5 text-gold" />
          <span className="eyebrow">{t('online.eyebrow')}</span>
        </div>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('online.title')}</h2>
        <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
          {online.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">{p}</p>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <HardDrive className="h-5 w-5 text-gold" />
          <span className="eyebrow">{t('storage.eyebrow')}</span>
        </div>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('storage.title')}</h2>
        <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
          {storage.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">{p}</p>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Gamepad className="h-5 w-5 text-gold" />
          <span className="eyebrow">{t('controllers.eyebrow')}</span>
        </div>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('controllers.title')}</h2>
        <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
          {controllers.map((item, i) => (
            <div key={i} className="rounded-[var(--radius)] border border-border bg-surface/60 p-4">
              <h3 className="text-sm font-semibold text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <span className="eyebrow">{t('checklist.eyebrow')}</span>
        <h2 className="h-title mt-3 text-lg font-bold sm:text-xl">{t('checklist.title')}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{t('checklist.lead')}</p>
        <ul className="mt-5 space-y-3 sm:mt-6">
          {checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-3 rounded-[var(--radius)] border border-border bg-surface-2/40 p-3 sm:p-4">
              {item.required ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              ) : (
                <CircleDashed className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              )}
              <div>
                <div className="text-sm font-semibold text-text">
                  {item.title}
                  {!item.required && (
                    <span className="ml-2 text-xs font-normal uppercase tracking-wider text-muted">TBA / optional</span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
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

      <section className="card border-border bg-surface-2/30">
        <div className="flex items-start gap-3">
          <Info className="mt-1 h-5 w-5 shrink-0 text-muted" />
          <div>
            <h2 className="text-sm font-semibold text-text">{t('note.title')}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">{t('note.desc')}</p>
          </div>
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
