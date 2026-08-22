import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import ContactView from '@/components/views/ContactView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.contact', path: '/contact' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function ContactPage() {
  setRequestLocale('en');
  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Contact' },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ContactView />
    </>
  );
}
