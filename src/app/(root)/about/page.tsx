import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import AboutView from '@/components/views/AboutView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.about', path: '/about' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function AboutPage() {
  setRequestLocale('en');
  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'About' },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <AboutView />
    </>
  );
}
