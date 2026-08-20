import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import NetworkTestView from '@/components/views/NetworkTestView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.networkTest', path: '/network-test' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getMetadata(locale);
}

export default async function NetworkTestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbLd = makeBreadcrumbLd(locale, [
    { name: 'Home', href: '/' },
    { name: 'Network Test' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <NetworkTestView />
    </>
  );
}
