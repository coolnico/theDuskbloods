import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import StaticView from '@/components/views/StaticView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.terms', path: '/terms' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function TermsPage() {
  setRequestLocale('en');
  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Terms' },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <StaticView namespace="terms" />
    </>
  );
}
