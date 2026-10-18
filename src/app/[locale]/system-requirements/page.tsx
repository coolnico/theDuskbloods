import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { requireValidLocale } from '@/lib/require-locale';
import { DOMAIN, SITE_NAME, LOCALES } from '@/lib/seo';
import SystemRequirementsView from '@/components/views/SystemRequirementsView';

const getMetadata = makePageMetadata({
  namespace: 'Metadata.systemRequirements',
  path: '/system-requirements',
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  requireValidLocale(locale);
  return getMetadata(locale);
}

export default async function SystemRequirementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  requireValidLocale(locale);
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: 'Metadata.systemRequirements' });
  const url = locale === 'en' ? `${DOMAIN}/system-requirements` : `${DOMAIN}/${locale}/system-requirements`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tMeta('title'),
    description: tMeta('description'),
    datePublished: '2026-10-11',
    dateModified: '2026-10-11',
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
    },
  };

  const breadcrumbLd = makeBreadcrumbLd(locale, [
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
