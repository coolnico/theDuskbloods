import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd, makeCollectionPageLd } from '@/lib/page-helpers';
import { getArticleMetasBySection } from '@/lib/news';
import { DOMAIN } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import NewsList from '@/components/NewsList';

const getMetadata = makePageMetadata({ namespace: 'Metadata.guides', path: '/guides' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

// Direct links to the evergreen data pages (not article categories)
const LINK_CARDS = [
  {
    href: '/gameplay',
    title: 'Gameplay',
    desc: 'Combat, Virtue, matchmaking, and core systems.',
    cta: 'Open Gameplay',
  },
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
  {
    href: '/kin',
    title: 'Kin',
    desc: 'Kin compacts, summoning circles, and advancement rules.',
    cta: 'Open Kin',
  },
];

export default function GuidesHubPage() {
  setRequestLocale('en');
  const articles = getArticleMetasBySection('en', 'guides');

  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Guides' },
  ]);

  const collectionLd = makeCollectionPageLd({
    name: 'The Duskbloods Guides',
    description: 'Evergreen guides for The Duskbloods — tier lists, weapons, maps, mechanics, and more.',
    url: `${DOMAIN}/guides`,
    items: articles.map((a) => ({
      name: a.title,
      url: `${DOMAIN}/guides/${a.slug}`,
      date: a.date,
    })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <main className="relative z-10">
        <article className="shell py-10 sm:py-16">
          <header className="mb-8 sm:mb-12">
            <span className="eyebrow">Guides</span>
            <h1 className="h-title mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
              The Duskbloods Guides
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
              Evergreen guides for The Duskbloods — tier lists, weapons, maps, mechanics, and more.
              Jump into a section below or start from the latest guides.
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

          <section className="mt-10 sm:mt-14">
            <h2 className="h-title mb-5 text-xl font-bold sm:text-2xl">Latest Guides</h2>
            <NewsList articles={articles} locale="en" noArticlesText="No guides yet. Check back soon." />
          </section>
        </article>
      </main>
    </>
  );
}
