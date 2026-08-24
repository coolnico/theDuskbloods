import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { getAllArticleMetas } from '@/lib/news';
import { LOCALES } from '@/lib/seo';
import NewsList from '@/components/NewsList';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const getMetadata = makePageMetadata({ namespace: 'Metadata.news', path: '/latest' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getMetadata(locale);
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'news' });
  const articles = getAllArticleMetas(locale);
  const breadcrumbLd = makeBreadcrumbLd(locale, [
    { name: 'Home', href: '/' },
    { name: t('title') },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="relative z-10">
        <article className="shell py-10 sm:py-16">
          <header className="mb-8 sm:mb-12">
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className="h-title mt-3 text-2xl font-bold sm:text-4xl">{t('title')}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
              {t('lead')}
            </p>
          </header>
          <NewsList articles={articles} locale={locale} noArticlesText={t('noArticles')} />
        </article>
      </main>
    </>
  );
}
