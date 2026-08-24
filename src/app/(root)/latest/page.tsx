import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { getAllArticleMetas } from '@/lib/news';
import NewsList from '@/components/NewsList';

const getMetadata = makePageMetadata({ namespace: 'Metadata.news', path: '/latest' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function NewsPage() {
  setRequestLocale('en');
  const articles = getAllArticleMetas('en');
  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Latest' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="relative z-10">
        <article className="shell py-10 sm:py-16">
          <header className="mb-8 sm:mb-12">
            <span className="eyebrow">News</span>
            <h1 className="h-title mt-3 text-2xl font-bold sm:text-4xl">Latest Articles</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
              Updates, guides, and news about The Duskbloods.
            </p>
          </header>
          <NewsList articles={articles} locale="en" noArticlesText="No articles yet. Check back soon." />
        </article>
      </main>
    </>
  );
}
