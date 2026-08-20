import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import NetworkTestView from '@/components/views/NetworkTestView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.networkTest', path: '/network-test' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function NetworkTestPage() {
  setRequestLocale('en');
  const breadcrumbLd = makeBreadcrumbLd('en', [
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
