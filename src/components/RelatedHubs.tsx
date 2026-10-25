import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

/** Prefer locale-prefixed hrefs only for non-default locales (localePrefix: as-needed). */
function linkLocale(locale: string): string | undefined {
  return locale && locale !== 'en' ? locale : undefined;
}

type Hub = { href: string; navKey: string; desc: string };

const HUB_BY_TAG: Record<string, Hub[]> = {
  'release-date': [
    { href: '/release-date', navKey: 'releaseDate', desc: 'Timeline, confirmed vs. rumored dates, and the launch window.' },
    { href: '/system-requirements', navKey: 'systemRequirements', desc: 'Switch 2, Nintendo Switch Online, storage and accessories.' },
    { href: '/faq', navKey: 'faq', desc: 'Platforms, multiplayer, editions, and hardware Q&A.' },
  ],
  delay: [
    { href: '/release-date', navKey: 'releaseDate', desc: 'Official window, trackers, and delay analysis.' },
    { href: '/faq', navKey: 'faq', desc: 'Quick answers on release and platforms.' },
  ],
  tracker: [
    { href: '/release-date', navKey: 'releaseDate', desc: 'What is confirmed vs. what trackers claim.' },
    { href: '/faq', navKey: 'faq', desc: 'Quick answers on release and platforms.' },
  ],
  'nintendo-direct': [
    { href: '/release-date', navKey: 'releaseDate', desc: 'Where the exact date will drop.' },
    { href: '/latest', navKey: 'latest', desc: 'All news and analysis.' },
  ],
  'network test': [
    { href: '/network-test', navKey: 'networkTest', desc: 'Schedule, results, and what the test revealed.' },
    { href: '/system-requirements', navKey: 'systemRequirements', desc: 'Online membership, network, and hardware.' },
    { href: '/gameplay', navKey: 'gameplay', desc: 'Combat, Virtue, phases, and House of Night.' },
  ],
  beta: [
    { href: '/network-test', navKey: 'networkTest', desc: 'Network test hub.' },
    { href: '/gameplay', navKey: 'gameplay', desc: 'How the game actually plays.' },
  ],
  server: [
    { href: '/network-test', navKey: 'networkTest', desc: 'What the test said about servers.' },
    { href: '/system-requirements', navKey: 'systemRequirements', desc: 'Network and hardware checklist.' },
  ],
  performance: [
    { href: '/system-requirements', navKey: 'systemRequirements', desc: 'Hardware and display modes.' },
    { href: '/gameplay', navKey: 'gameplay', desc: 'Systems that affect combat feel.' },
  ],
  gameplay: [
    { href: '/gameplay', navKey: 'gameplay', desc: 'Full gameplay guide.' },
    { href: '/characters', navKey: 'characters', desc: 'Bloodsworn roster and abilities.' },
    { href: '/faq', navKey: 'faq', desc: 'Gameplay & multiplayer FAQ.' },
  ],
  pvpve: [
    { href: '/gameplay', navKey: 'gameplay', desc: 'PvPvE loops explained.' },
    { href: '/faq', navKey: 'faq', desc: 'What PvPvE means in matches.' },
  ],
  guide: [
    { href: '/gameplay', navKey: 'gameplay', desc: 'Evergreen mechanics guide.' },
    { href: '/faq', navKey: 'faq', desc: 'Beginner questions answered.' },
  ],
  beginner: [
    { href: '/gameplay', navKey: 'gameplay', desc: 'Learn the core loop.' },
    { href: '/system-requirements', navKey: 'systemRequirements', desc: 'What you need to play.' },
    { href: '/faq', navKey: 'faq', desc: 'Start here with common questions.' },
  ],
  matchmaking: [
    { href: '/gameplay', navKey: 'gameplay', desc: 'Alliances, Sigils, and match flow.' },
    { href: '/network-test', navKey: 'networkTest', desc: 'How the network test handled matchmaking.' },
  ],
  preview: [
    { href: '/gameplay', navKey: 'gameplay', desc: 'Systems shown in previews.' },
    { href: '/characters', navKey: 'characters', desc: 'Who you play as.' },
  ],
  switch2: [
    { href: '/system-requirements', navKey: 'systemRequirements', desc: 'Switch 2 exclusive requirements.' },
    { href: '/release-date', navKey: 'releaseDate', desc: 'Launch window and platforms.' },
  ],
  fromsoftware: [
    { href: '/about', navKey: 'about', desc: 'The project at a glance.' },
    { href: '/gameplay', navKey: 'gameplay', desc: 'FromSoftware systems in multiplayer.' },
  ],
};

const DEFAULT_HUBS: Hub[] = [
  { href: '/gameplay', navKey: 'gameplay', desc: 'Combat, Virtue, phases, and builds.' },
  { href: '/release-date', navKey: 'releaseDate', desc: 'Timeline and confirmed launch details.' },
  { href: '/faq', navKey: 'faq', desc: 'The questions players actually search.' },
];

function hubsForTags(tags: string[] | undefined, slug: string): Hub[] {
  const seen = new Map<string, Hub>();
  const push = (list: Hub[]) => {
    for (const h of list) {
      if (!seen.has(h.href)) seen.set(h.href, h);
    }
  };

  if (tags) {
    for (const tag of tags) {
      const key = tag.toLowerCase();
      if (HUB_BY_TAG[key]) push(HUB_BY_TAG[key]);
      for (const k of Object.keys(HUB_BY_TAG)) {
        if (key.includes(k) || k.includes(key)) push(HUB_BY_TAG[k]);
      }
    }
  }

  if (slug.includes('release') || slug.includes('delay') || slug.includes('tracker') || slug.includes('direct')) {
    push(HUB_BY_TAG['release-date']);
  }
  if (slug.includes('network') || slug.includes('server') || slug.includes('matchmaking')) {
    push(HUB_BY_TAG['network test']);
    push(HUB_BY_TAG.matchmaking);
  }
  if (slug.includes('gameplay') || slug.includes('pvpve') || slug.includes('preview')) {
    push(HUB_BY_TAG.gameplay);
    push(HUB_BY_TAG.preview);
  }

  if (seen.size === 0) push(DEFAULT_HUBS);
  return Array.from(seen.values()).slice(0, 4);
}

/** News → character detail pages (Bloodsworn featured in that topic). */
const CHARS_BY_TOPIC: Record<string, string[]> = {
  preview: ['zork', 'albert', 'sniper-layla'],
  gameplay: ['albert', 'bloodhand-jan', 'zork'],
  pvpve: ['albert', 'bloodhand-jan'],
  guide: ['albert', 'senator-samir-patres'],
  beginner: ['albert', 'zork'],
  matchmaking: ['bloodhand-jan', 'trang-lanh'],
  'network test': ['zork', 'sniper-layla', 'bloodhand-jan'],
  beta: ['zork', 'albert'],
  server: ['sniper-layla'],
  performance: ['sniper-layla', 'zork'],
  'release-date': [],
  switch2: [],
};

function charactersForTopic(tags: string[] | undefined, slug: string): string[] {
  const seen = new Set<string>();
  const push = (list: string[]) => list.forEach((c) => seen.add(c));

  if (tags) {
    for (const tag of tags) {
      const key = tag.toLowerCase();
      if (CHARS_BY_TOPIC[key]) push(CHARS_BY_TOPIC[key]);
      for (const k of Object.keys(CHARS_BY_TOPIC)) {
        if (key.includes(k) || k.includes(key)) push(CHARS_BY_TOPIC[k]);
      }
    }
  }
  if (slug.includes('preview') || slug.includes('gameplay') || slug.includes('pvpve')) {
    push(CHARS_BY_TOPIC.preview);
  }
  if (slug.includes('network') || slug.includes('matchmaking') || slug.includes('server')) {
    push(CHARS_BY_TOPIC['network test']);
  }
  if (slug.includes('beginner')) push(CHARS_BY_TOPIC.beginner);
  return Array.from(seen).slice(0, 3);
}

type CharLink = { slug: string; name: string; role: string };

/** News → hub + character cross-links rendered at the bottom of article pages. */
export default async function RelatedHubs({
  tags,
  slug,
  locale = 'en',
}: {
  tags?: string[];
  slug: string;
  locale?: string;
}) {
  const hubs = hubsForTags(tags, slug);
  const charSlugs = charactersForTopic(tags, slug);

  const t = await getTranslations({ locale, namespace: 'nav' });
  const tUi = await getTranslations({ locale, namespace: 'relatedHubs' });
  const tChars = await getTranslations({ locale, namespace: 'characters' });

  let chars: CharLink[] = [];
  if (charSlugs.length) {
    try {
      const roster = tChars.raw('roster') as { items: { slug?: string; name: string; role?: string }[] };
      chars = charSlugs
        .map((s) => roster.items.find((c) => c.slug === s))
        .filter(Boolean)
        .map((c) => ({ slug: c!.slug!, name: c!.name, role: c!.role || '' }));
    } catch {
      chars = [];
    }
  }

  if (!hubs.length && !chars.length) return null;

  return (
    <aside className="mt-12 rounded-[var(--radius)] border border-border bg-surface/60 p-5 sm:p-6">
      <div className="text-xs font-semibold uppercase tracking-wider text-gold">{tUi('eyebrow')}</div>
      <h2 className="h-title mt-2 text-lg font-bold sm:text-xl">{tUi('title')}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{tUi('lead')}</p>

      {hubs.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {hubs.map((h) => (
            <Link
              key={h.href}
              href={h.href as never}
              locale={linkLocale(locale)}
              className="group rounded-[var(--radius)] border border-border bg-surface-2/40 p-4 transition hover:border-blood"
            >
              <div className="text-sm font-semibold text-text group-hover:text-blood">{t(h.navKey as never)}</div>
              <p className="mt-1 text-xs leading-relaxed text-muted">{h.desc}</p>
            </Link>
          ))}
        </div>
      )}

      {chars.length > 0 && (
        <div className="mt-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-gold">
            {tUi('charactersTitle') || 'Featured Bloodsworn'}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {chars.map((c) => (
              <Link
                key={c.slug}
                href={`/characters/${c.slug}` as never}
                locale={linkLocale(locale)}
                className="group rounded-[var(--radius)] border border-border bg-surface-2/40 p-4 transition hover:border-blood"
              >
                <div className="text-sm font-semibold text-text group-hover:text-blood">{c.name}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted">{c.role}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
