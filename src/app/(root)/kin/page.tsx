import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import KinView from '@/components/views/KinView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.kin', path: '/kin' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function KinPage() {
  setRequestLocale('en');
  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Kin' },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <KinView />
    </>
  );
}
