import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd, makeCollectionPageLd } from '@/lib/page-helpers';
import { requireValidLocale } from '@/lib/require-locale';
import { getArticleMetasBySection } from '@/lib/news';
import { LOCALES, DOMAIN } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import NewsList from '@/components/NewsList';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const getMetadata = makePageMetadata({ namespace: 'Metadata.guides', path: '/guides' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  requireValidLocale(locale);
  return getMetadata(locale);
}

// Direct links to the evergreen data pages (not article categories)
const LINK_CARDS = [
  { href: '/gameplay', key: 'gameplay' as const },
  { href: '/characters', key: 'characters' as const },
  { href: '/maps', key: 'maps' as const },
  { href: '/kin', key: 'kin' as const },
];

export default async function GuidesHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  requireValidLocale(locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'guides' });
  const articles = getArticleMetasBySection(locale, 'guides');

  const breadcrumbLd = makeBreadcrumbLd(locale, [
    { name: 'Home', href: '/' },
    { name: t('title') },
  ]);

  const pageUrl = locale === 'en' ? `${DOMAIN}/guides` : `${DOMAIN}/${locale}/guides`;
  const collectionLd = makeCollectionPageLd({
    name: t('title'),
    description: t('lead'),
    url: pageUrl,
    items: articles.map((a) => ({
      name: a.title,
      url: locale === 'en' ? `${DOMAIN}/guides/${a.slug}` : `${DOMAIN}/${locale}/guides/${a.slug}`,
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
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className="h-title mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">{t('title')}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
              {t('lead')}
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
                    {t(`hubLinks.${c.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t(`hubLinks.${c.key}.desc`)}</p>
                  <span className="mt-3 text-sm font-semibold text-gold group-hover:underline underline-offset-4">
                    {t(`hubLinks.${c.key}.cta`)} →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 sm:mt-14">
            <h2 className="h-title mb-5 text-xl font-bold sm:text-2xl">{t('latestTitle')}</h2>
            <NewsList articles={articles} locale={locale} noArticlesText={t('noArticles')} />
          </section>
        </article>
      </main>
    </>
  );
}
