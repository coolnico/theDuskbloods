import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { DOMAIN, SITE_NAME } from '@/lib/seo';
import SystemRequirementsView from '@/components/views/SystemRequirementsView';

const getMetadata = makePageMetadata({
  namespace: 'Metadata.systemRequirements',
  path: '/system-requirements',
});

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default async function SystemRequirementsPage() {
  setRequestLocale('en');
  const tMeta = await getTranslations({ locale: 'en', namespace: 'Metadata.systemRequirements' });

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tMeta('title'),
    description: tMeta('description'),
    datePublished: '2026-10-11',
    dateModified: '2026-10-11',
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: DOMAIN,
    },
    mainEntityOfPage: `${DOMAIN}/system-requirements`,
    about: {
      '@type': 'VideoGame',
      name: 'The Duskbloods',
      gamePlatform: 'Nintendo Switch 2',
      publisher: { '@type': 'Organization', name: 'Nintendo' },
      developer: { '@type': 'Organization', name: 'FromSoftware' },
    },
  };

  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'System Requirements' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SystemRequirementsView />
    </>
  );
}
