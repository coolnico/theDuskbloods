'use client';

import { useTranslations } from 'next-intl';
import { Swords, Droplet, Users, Moon, Gamepad2, Building2 } from 'lucide-react';

const SECTION_ICONS = [Swords, Droplet, Users, Moon, Gamepad2, Building2];

export default function GameplayView() {
  const t = useTranslations('gameplay');
  const sections = t.raw('sections') as { title: string; desc: string }[];
  const roleItems = t.raw('roles.items') as { title: string; desc: string }[];

  return (
    <div className="space-y-10 sm:space-y-16">
      <header>
        <span className="eyebrow">{t('intro.eyebrow')}</span>
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-4xl">{t('intro.title')}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>
      </header>

      <section className="space-y-4 sm:space-y-5">
        {sections.map((s, i) => {
          const Icon = SECTION_ICONS[i % SECTION_ICONS.length];
          return (
            <div key={i} className="card flex gap-3 sm:gap-5">
              <Icon className="h-5 w-5 shrink-0 text-blood sm:h-6 sm:w-6" />
              <div>
                <h2 className="font-heading text-base font-bold text-text sm:text-lg">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section>
        <span className="eyebrow">{t('roles.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('roles.title')}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{t('roles.desc')}</p>
        <div className="mt-6 grid gap-4 sm:gap-5 sm:grid-cols-3 sm:mt-8">
          {roleItems.map((r, i) => (
            <div key={i} className="card">
              <h3 className="font-heading text-base font-bold text-gold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
