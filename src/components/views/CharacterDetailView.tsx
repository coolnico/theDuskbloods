'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { buildCharacterFaq } from '@/lib/character-faq';
import {
  Swords,
  Target,
  BookOpen,
  Lightbulb,
  Users,
  Newspaper,
  ArrowLeft,
  Activity,
} from 'lucide-react';

type Skill = { name: string; desc: string };
type Tip = { title: string; desc: string };
type Character = {
  slug: string;
  name: string;
  melee: string;
  ranged: string;
  image?: string;
  role: string;
  tagline: string;
  difficulty: number;
  playstyle: string[];
  tips: Tip[];
  lore: string[];
  bloodArts: Skill[];
  powers: Skill[];
};

const DIFFICULTY_LABELS = ['', '★', '★★', '★★★', '★★★★', '★★★★★'];

export default function CharacterDetailView({
  slug,
  locale,
}: {
  slug: string;
  locale?: string;
}) {
  const t = useTranslations('characters');
  const roster = t.raw('roster') as {
    items: Character[];
    labels: Record<string, string>;
  };
  const detail = t.raw('detail') as Record<string, string>;

  const char = roster.items.find((c) => c.slug === slug);
  if (!char) return null;

  const others = roster.items.filter((c) => c.slug !== slug).slice(0, 4);

  const faqItems = buildCharacterFaq(char, detail, locale || 'en');

  return (
    <div className="space-y-10 sm:space-y-16">
      <header>
        <Link
          href="/characters"
          locale={locale}
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" /> {detail.backToRoster}
        </Link>
        <span className="eyebrow">{t('intro.eyebrow')} · The Duskbloods</span>
        {/* H1: name + guide intent for SERP/AEO */}
        <h1 className="h-title mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
          {char.name} <span className="text-muted">{detail.h1Suffix || '— Bloodsworn Guide'}</span>
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">{char.tagline}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span>
            <span className="text-gold">{detail.role}: </span>
            {char.role}
          </span>
          <span>
            <span className="text-gold">{detail.difficulty}: </span>
            <span className="tracking-wider text-text">{DIFFICULTY_LABELS[char.difficulty] || char.difficulty}</span>
          </span>
        </div>
      </header>

      {/* GEO key facts — short extractable answers */}
      <section className="card border-border bg-surface-2/30" aria-label="Key facts">
        <h2 className="h-title text-sm font-semibold uppercase tracking-wider text-gold">
          {detail.keyFacts || 'Key facts'}
        </h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">{detail.role}</dt>
            <dd className="mt-1 text-sm font-semibold text-text">{char.role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">{detail.weapons}</dt>
            <dd className="mt-1 text-sm font-semibold text-text">{char.melee} · {char.ranged}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">{detail.bloodArts}</dt>
            <dd className="mt-1 text-sm font-semibold text-text">{char.bloodArts.map((b) => b.name).join(', ')}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">{detail.difficulty}</dt>
            <dd className="mt-1 text-sm font-semibold text-text">{DIFFICULTY_LABELS[char.difficulty] || char.difficulty}</dd>
          </div>
        </dl>
      </section>

      <section className="card overflow-hidden">
        <div className="flex flex-col gap-6 lg:flex-row">
          {char.image && (
            <div className="shrink-0 overflow-hidden rounded-[var(--radius)] border border-border lg:w-72">
              <img
                src={char.image}
                alt={char.name}
                className="aspect-[3/4] w-full object-cover"
                loading="eager"
              />
            </div>
          )}
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Swords className="h-5 w-5 text-gold" />
                <h2 className="h-title text-lg font-bold sm:text-xl">{detail.weapons}</h2>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[var(--radius)] border border-border bg-surface-2/40 p-3">
                  <div className="text-xs uppercase tracking-wider text-muted">{roster.labels.melee?.replace(': ', '') || 'Melee'}</div>
                  <div className="mt-1 text-sm font-semibold text-text">{char.melee}</div>
                </div>
                <div className="rounded-[var(--radius)] border border-border bg-surface-2/40 p-3">
                  <div className="text-xs uppercase tracking-wider text-muted">{roster.labels.ranged?.replace(': ', '') || 'Ranged'}</div>
                  <div className="mt-1 text-sm font-semibold text-text">{char.ranged}</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="h-title text-sm font-semibold uppercase tracking-wider text-gold">{detail.bloodArts}</h2>
              <ul className="mt-3 space-y-3">
                {char.bloodArts.map((s, i) => (
                  <li key={i} className="rounded-[var(--radius)] border border-border bg-surface/60 p-3">
                    <div className="text-sm font-bold text-text">{s.name}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="h-title text-sm font-semibold uppercase tracking-wider text-gold">{detail.powers}</h2>
              <ul className="mt-3 space-y-3">
                {char.powers.map((s, i) => (
                  <li key={i} className="rounded-[var(--radius)] border border-border bg-surface/60 p-3">
                    <div className="text-sm font-bold text-text">{s.name}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-gold" />
          <span className="eyebrow">{detail.playstyle}</span>
        </div>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{detail.playstyle}</h2>
        <div className="mt-5 space-y-4 sm:mt-6">
          {char.playstyle.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">{p}</p>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-gold" />
          <span className="eyebrow">{detail.tips}</span>
        </div>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{detail.tips}</h2>
        <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-3">
          {char.tips.map((tip, i) => (
            <div key={i} id={`tip-${i + 1}`} className="rounded-[var(--radius)] border border-border bg-surface/60 p-4">
              <h3 className="text-sm font-semibold text-text">
                <span className="text-gold">{i + 1}. </span>
                {tip.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-gold" />
          <span className="eyebrow">{detail.lore}</span>
        </div>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{detail.lore}</h2>
        <div className="mt-5 space-y-4 sm:mt-6">
          {char.lore.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">{p}</p>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gold" />
          <span className="eyebrow">{detail.otherCharacters}</span>
        </div>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">{detail.otherCharacters}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/characters/${c.slug}` as never}
              locale={locale}
              className="group rounded-[var(--radius)] border border-border bg-surface/60 p-4 transition hover:border-blood"
            >
              <div className="text-sm font-semibold text-text group-hover:text-blood">{c.name}</div>
              <p className="mt-1 text-xs text-muted">{c.role}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-gold" />
          <span className="eyebrow">{detail.relatedGuides}</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link href="/gameplay" locale={locale} className="group rounded-[var(--radius)] border border-border bg-surface/60 p-4 transition hover:border-blood">
            <div className="text-sm font-semibold text-text group-hover:text-blood">{detail.gameplayCardTitle || 'Gameplay guide'}</div>
            <p className="mt-1 text-xs text-muted">{detail.gameplayCardDesc || 'Virtue, phases, stagger, and House of Night.'}</p>
          </Link>
          <Link href="/characters" locale={locale} className="group rounded-[var(--radius)] border border-border bg-surface/60 p-4 transition hover:border-blood">
            <div className="text-sm font-semibold text-text group-hover:text-blood">{detail.backToRoster}</div>
            <p className="mt-1 text-xs text-muted">{detail.detailLead}</p>
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-gold" />
          <span className="eyebrow">{detail.faqTitle || 'FAQ'}</span>
        </div>
        <h2 className="h-title mt-3 text-xl font-bold sm:text-2xl">
          {detail.faqHeading || 'Frequently asked questions'}
        </h2>
        <div className="mt-5 space-y-3">
          {faqItems.map((item, i) => (
            <div key={i} className="rounded-[var(--radius)] border border-border bg-surface/60 p-4">
              <h3 className="text-sm font-semibold text-text">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card text-center">
        <Activity className="mx-auto h-7 w-7 text-blood sm:h-8 sm:w-8" />
        <h2 className="h-title mt-3 text-lg font-bold text-text sm:mt-4 sm:text-xl">{detail.ctaTitle}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted sm:mt-3">{detail.ctaDesc}</p>
      </section>

      <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted">{t('imageCredit')}</p>
    </div>
  );
}
