import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { DOMAIN, SITE_NAME } from '@/lib/seo';
import ReleaseDateView from '@/components/views/ReleaseDateView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.releaseDate', path: '/release-date' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getMetadata(locale);
}

export default async function ReleaseDatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: 'Metadata.releaseDate' });
  const url = locale === 'en' ? `${DOMAIN}/release-date` : `${DOMAIN}/${locale}/release-date`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tMeta('title'),
    description: tMeta('description'),
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    inLanguage: locale,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: DOMAIN,
    },
    mainEntityOfPage: url,
    about: {
      '@type': 'VideoGame',
      name: 'The Duskbloods',
      gamePlatform: 'Nintendo Switch 2',
      publisher: { '@type': 'Organization', name: 'Nintendo' },
      developer: { '@type': 'Organization', name: 'FromSoftware' },
      datePublished: '2026',
    },
  };

  const breadcrumbLd = makeBreadcrumbLd(locale, [
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
