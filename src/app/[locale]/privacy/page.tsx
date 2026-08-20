import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import StaticView from '@/components/views/StaticView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.privacy', path: '/privacy' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getMetadata(locale);
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const breadcrumbLd = makeBreadcrumbLd(locale, [{ name: 'Home', href: '/' }, { name: 'Privacy' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <StaticView namespace="privacy" />
    </>
  );
}
