import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { getArticleMetasBySection, getGuidesCategoryCounts } from '@/lib/news';
import { GUIDES_CATEGORIES } from '@/lib/guides-categories';
import { Link } from '@/i18n/navigation';
import NewsList from '@/components/NewsList';
import GuidesCategoryGrid from '@/components/GuidesCategoryGrid';

const getMetadata = makePageMetadata({ namespace: 'Metadata.guides', path: '/guides' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

// Direct links to the evergreen data pages (not article categories)
const LINK_CARDS = [
  {
    href: '/characters',
    title: 'Characters',
    desc: 'Full Bloodsworn roster — weapons, Blood Arts, Aspects, and lore.',
    cta: 'Open Characters',
  },
  {
    href: '/maps',
    title: 'Maps',
    desc: 'Lowanro City landmarks, regional features, and map tools.',
    cta: 'Open Maps',
  },
];

const CATEGORY_TITLES: Record<string, string> = {
  'tier-lists': 'Tier Lists & Who to Pick',
  weapons: 'Weapons & Loadouts',
  maps: 'Maps & Routes',
  mechanics: 'Gameplay Mechanics',
  comparisons: 'Comparisons & Buying',
  progression: 'Progression & Endgame',
};

const CATEGORY_DESCS: Record<string, string> = {
  'tier-lists': 'Bloodsworn tier lists, beginner picks, and roster updates.',
  weapons: 'Best weapons, Blood Arts loadouts, and build recommendations.',
  maps: 'Routes, farming spots, and map strategy guides.',
  mechanics: 'Virtue, combat, matchmaking, and core systems explained.',
  comparisons: 'How The Duskbloods stacks up, and whether to buy.',
  progression: 'Endings, trophies, builds, and post-launch updates.',
};

export default function GuidesHubPage() {
  setRequestLocale('en');
  const articles = getArticleMetasBySection('en', 'guides');
  const counts = getGuidesCategoryCounts('en');
  const categories = GUIDES_CATEGORIES.map((c) => {
    const stat = counts.find((s) => s.slug === c.slug);
    return {
      slug: c.slug,
      title: CATEGORY_TITLES[c.slug],
      desc: CATEGORY_DESCS[c.slug],
      count: stat?.count ?? 0,
      latestTitle: stat?.latest?.title,
    };
  });

  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Guides' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="relative z-10">
        <article className="shell py-10 sm:py-16">
          <header className="mb-8 sm:mb-12">
            <span className="eyebrow">Guides</span>
            <h1 className="h-title mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
              The Duskbloods Guides
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
              Evergreen guides for The Duskbloods — tier lists, weapons, maps, mechanics, and more.
              Browse by category or jump into the latest guides below.
            </p>
          </header>

          <section aria-label="Data sections" className="mb-8 sm:mb-10">
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
              {LINK_CARDS.map((c) => (
                <Link
                  key={c.href}
                  href={c.href as never}
                  className="card group flex flex-col transition hover:border-gold"
                >
                  <h3 className="font-heading text-base font-bold text-text group-hover:text-gold transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
                  <span className="mt-3 text-sm font-semibold text-gold group-hover:underline underline-offset-4">
                    {c.cta} →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section aria-label="Guide categories">
            <GuidesCategoryGrid categories={categories} locale="en" />
          </section>

          <section className="mt-10 sm:mt-14">
            <h2 className="h-title mb-5 text-xl font-bold sm:text-2xl">Latest Guides</h2>
            <NewsList articles={articles} locale="en" noArticlesText="No guides yet. Check back soon." />
          </section>
        </article>
      </main>
    </>
  );
}
