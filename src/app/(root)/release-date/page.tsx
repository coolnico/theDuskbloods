import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { DOMAIN, SITE_NAME } from '@/lib/seo';
import ReleaseDateView from '@/components/views/ReleaseDateView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.releaseDate', path: '/release-date' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default async function ReleaseDatePage() {
  setRequestLocale('en');
  const t = await getTranslations({ locale: 'en', namespace: 'releaseDate' });
  const tMeta = await getTranslations({ locale: 'en', namespace: 'Metadata.releaseDate' });

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tMeta('title'),
    description: tMeta('description'),
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: DOMAIN,
    },
    mainEntityOfPage: `${DOMAIN}/release-date`,
    about: {
      '@type': 'VideoGame',
      name: 'The Duskbloods',
      gamePlatform: 'Nintendo Switch 2',
      publisher: { '@type': 'Organization', name: 'Nintendo' },
      developer: { '@type': 'Organization', name: 'FromSoftware' },
      datePublished: '2026',
    },
  };

  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Release Date' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ReleaseDateView />
    </>
  );
}
