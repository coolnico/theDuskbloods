import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import MapsView from '@/components/views/MapsView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.maps', path: '/maps' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function MapsPage() {
  setRequestLocale('en');
  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Maps' },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <MapsView />
    </>
  );
}
