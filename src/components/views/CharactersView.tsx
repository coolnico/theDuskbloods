'use client';

import { useTranslations } from 'next-intl';
import { Swords, Droplet, Eye, History, Wrench, Compass } from 'lucide-react';

const TRAIT_ICONS = [Swords, Droplet, Eye, History, Wrench, Compass];

type Character = {
  name: string;
  melee: string;
  ranged: string;
  image?: string;
  bloodArts: { name: string; desc: string }[];
  powers: { name: string; desc: string }[];
};

export default function CharactersView() {
  const t = useTranslations('characters');
  const traits = t.raw('traits.items') as { title: string; desc: string }[];

  // roster is optional — only zh locale has it for now
  type Roster = { eyebrow: string; title: string; desc: string; items: Character[] };
  let roster: Roster | null = null;
  try {
    const raw = t.raw('roster');
    if (raw && typeof raw === 'object' && 'items' in raw && Array.isArray((raw as any).items)) {
      roster = raw as Roster;
    }
  } catch {
    // no roster defined for this locale
  }

  return (
    <div className="space-y-10 sm:space-y-16">
      <header>
        <span className="eyebrow">{t('intro.eyebrow')}</span>
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-4xl">{t('intro.title')}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">{t('intro.lead')}</p>
      </header>

      {/* Character roster */}
      {roster && (
        <section>
          <span className="eyebrow">{roster.eyebrow}</span>
          <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{roster.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{roster.desc}</p>
          <div className="mt-6 space-y-4 sm:space-y-5">
            {roster.items.map((char, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                  {char.image && (
                    <div className="shrink-0 overflow-hidden rounded-[var(--radius)] border border-border sm:w-56">
                      <img
                        src={char.image}
                        alt={char.name}
                        className="aspect-[3/4] w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-blood sm:text-2xl">{char.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                        <p><span className="text-gold">{t('roster.labels.melee')}</span>{char.melee}</p>
                        <p><span className="text-gold">{t('roster.labels.ranged')}</span>{char.ranged}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">{t('roster.labels.bloodArts')}</h4>
                        <ul className="mt-2 space-y-2">
                          {char.bloodArts.map((ba, j) => (
                            <li key={j}>
                              <span className="text-sm font-bold text-text">{ba.name}</span>
                              <p className="text-sm leading-relaxed text-muted">{ba.desc}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">{t('roster.labels.powers')}</h4>
                        <ul className="mt-2 space-y-2">
                          {char.powers.map((p, j) => (
                            <li key={j}>
                              <span className="text-sm font-bold text-text">{p.name}</span>
                              <p className="text-sm leading-relaxed text-muted">{p.desc}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <span className="eyebrow">{t('traits.eyebrow')}</span>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{t('traits.title')}</h2>
        <div className="mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2 sm:mt-8 lg:grid-cols-3">
          {traits.map((tr, i) => {
            const Icon = TRAIT_ICONS[i % TRAIT_ICONS.length];
            return (
              <div key={i} className="card">
                <Icon className="h-6 w-6 text-blood" />
                <h3 className="mt-4 font-heading text-base font-bold text-text">{tr.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tr.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="card text-center">
        <h2 className="h-title text-xl font-bold text-text">{t('note.title')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">{t('note.desc')}</p>
      </section>
    </div>
  );
}
