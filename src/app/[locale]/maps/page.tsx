import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { requireValidLocale } from '@/lib/require-locale';
import MapsView from '@/components/views/MapsView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.maps', path: '/maps' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  requireValidLocale(locale);
  return getMetadata(locale);
}

export default async function MapsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  requireValidLocale(locale);
  setRequestLocale(locale);

  const breadcrumbLd = makeBreadcrumbLd(locale, [{ name: 'Home', href: '/' }, { name: 'Maps' }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <MapsView />
    </>
  );
}
