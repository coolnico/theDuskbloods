import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

/** Prefer locale-prefixed hrefs only for non-default locales (localePrefix: as-needed). */
function linkLocale(locale: string): string | undefined {
  return locale && locale !== 'en' ? locale : undefined;
}

type Hub = { href: string; navKey: string; descKey: string };

const DESC_FALLBACK: Record<string, string> = {
  confirmedVsTrackers: 'What is confirmed vs. what trackers claim.',
  "timelineRumors": "Timeline, confirmed vs. rumored dates, and the launch window.",
  "hardwareChecklist": "Switch 2, Nintendo Switch Online, storage and accessories.",
  "platformsFaq": "Platforms, multiplayer, editions, and hardware Q&A.",
  "windowTrackers": "Official window, trackers, and delay analysis.",
  "quickRelease": "Quick answers on release and platforms.",
  "whereDateDrops": "Where the exact date will drop.",
  "allNews": "All news and analysis.",
  "testSchedule": "Schedule, results, and what the test revealed.",
  "onlineHardware": "Online membership, network, and hardware.",
  "combatVirtue": "Combat, Virtue, phases, and House of Night.",
  "testHub": "Network test hub.",
  "howItPlays": "How the game actually plays.",
  "testServers": "What the test said about servers.",
  "networkHardware": "Network and hardware checklist.",
  "displayModes": "Hardware and display modes.",
  "combatFeel": "Systems that affect combat feel.",
  "fullGameplay": "Full gameplay guide.",
  "rosterAbilities": "Bloodsworn roster and abilities.",
  "gameplayFaq": "Gameplay & multiplayer FAQ.",
  "pvpveLoops": "PvPvE loops explained.",
  "pvpveInMatches": "What PvPvE means in matches.",
  "evergreenMechanics": "Evergreen mechanics guide.",
  "beginnerAnswers": "Beginner questions answered.",
  "coreLoop": "Learn the core loop.",
  "whatYouNeed": "What you need to play.",
  "startHere": "Start here with common questions.",
  "alliancesSigils": "Alliances, Sigils, and match flow.",
  "testMatchmaking": "How the network test handled matchmaking.",
  "previewSystems": "Systems shown in previews.",
  "shotsAnalysis": "Official screenshots with analysis.",
  "whoYouPlay": "Who you play as.",
  "switch2Requirements": "Switch 2 exclusive requirements.",
  "launchPlatforms": "Launch window and platforms.",
  "projectGlance": "The project at a glance.",
  "fromsoftMultiplayer": "FromSoftware systems in multiplayer.",
  "combatBuilds": "Combat, Virtue, phases, and builds.",
  "timelineConfirmed": "Timeline and confirmed launch details.",
  "playerSearchQs": "The questions players actually search.",
};

function hubDesc(descKey: string, table: Record<string, string> | undefined): string {
  return table?.[descKey] || DESC_FALLBACK[descKey] || descKey;
}


const HUB_BY_TAG: Record<string, Hub[]> = {
  'release-date': [
    { href: '/release-date', navKey: 'releaseDate', descKey: 'timelineRumors' },
    { href: '/system-requirements', navKey: 'systemRequirements', descKey: 'hardwareChecklist' },
    { href: '/faq', navKey: 'faq', descKey: 'platformsFaq' },
  ],
  delay: [
    { href: '/release-date', navKey: 'releaseDate', descKey: 'windowTrackers' },
    { href: '/faq', navKey: 'faq', descKey: 'quickRelease' },
  ],
  tracker: [
    { href: '/release-date', navKey: 'releaseDate', descKey: 'confirmedVsTrackers' },
    { href: '/faq', navKey: 'faq', descKey: 'quickRelease' },
  ],
  'nintendo-direct': [
    { href: '/release-date', navKey: 'releaseDate', descKey: 'whereDateDrops' },
    { href: '/latest', navKey: 'latest', descKey: 'allNews' },
  ],
  'network test': [
    { href: '/network-test', navKey: 'networkTest', descKey: 'testSchedule' },
    { href: '/system-requirements', navKey: 'systemRequirements', descKey: 'onlineHardware' },
    { href: '/gameplay', navKey: 'gameplay', descKey: 'combatVirtue' },
  ],
  beta: [
    { href: '/network-test', navKey: 'networkTest', descKey: 'testHub' },
    { href: '/gameplay', navKey: 'gameplay', descKey: 'howItPlays' },
  ],
  server: [
    { href: '/network-test', navKey: 'networkTest', descKey: 'testServers' },
    { href: '/system-requirements', navKey: 'systemRequirements', descKey: 'networkHardware' },
  ],
  performance: [
    { href: '/system-requirements', navKey: 'systemRequirements', descKey: 'displayModes' },
    { href: '/gameplay', navKey: 'gameplay', descKey: 'combatFeel' },
  ],
  gameplay: [
    { href: '/gameplay', navKey: 'gameplay', descKey: 'fullGameplay' },
    { href: '/characters', navKey: 'characters', descKey: 'rosterAbilities' },
    { href: '/faq', navKey: 'faq', descKey: 'gameplayFaq' },
  ],
  pvpve: [
    { href: '/gameplay', navKey: 'gameplay', descKey: 'pvpveLoops' },
    { href: '/faq', navKey: 'faq', descKey: 'pvpveInMatches' },
  ],
  guide: [
    { href: '/gameplay', navKey: 'gameplay', descKey: 'evergreenMechanics' },
    { href: '/faq', navKey: 'faq', descKey: 'beginnerAnswers' },
  ],
  beginner: [
    { href: '/gameplay', navKey: 'gameplay', descKey: 'coreLoop' },
    { href: '/system-requirements', navKey: 'systemRequirements', descKey: 'whatYouNeed' },
    { href: '/faq', navKey: 'faq', descKey: 'startHere' },
  ],
  matchmaking: [
    { href: '/gameplay', navKey: 'gameplay', descKey: 'alliancesSigils' },
    { href: '/network-test', navKey: 'networkTest', descKey: 'testMatchmaking' },
  ],
  preview: [
    { href: '/gameplay', navKey: 'gameplay', descKey: 'previewSystems' },
    { href: '/gallery', navKey: 'gallery', descKey: 'shotsAnalysis' },
    { href: '/characters', navKey: 'characters', descKey: 'whoYouPlay' },
  ],
  switch2: [
    { href: '/system-requirements', navKey: 'systemRequirements', descKey: 'switch2Requirements' },
    { href: '/release-date', navKey: 'releaseDate', descKey: 'launchPlatforms' },
  ],
  fromsoftware: [
    { href: '/about', navKey: 'about', descKey: 'projectGlance' },
    { href: '/gameplay', navKey: 'gameplay', descKey: 'fromsoftMultiplayer' },
  ],
};

const DEFAULT_HUBS: Hub[] = [
  { href: '/gameplay', navKey: 'gameplay', descKey: 'combatBuilds' },
  { href: '/release-date', navKey: 'releaseDate', descKey: 'timelineConfirmed' },
  { href: '/faq', navKey: 'faq', descKey: 'playerSearchQs' },
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
  let hubDescs: Record<string, string> | undefined;
  try { hubDescs = tUi.raw('hubs') as Record<string, string>; } catch { hubDescs = undefined; }
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
              <p className="mt-1 text-xs leading-relaxed text-muted">{hubDesc(h.descKey, hubDescs)}</p>
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
