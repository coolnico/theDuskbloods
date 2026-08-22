import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import GalleryView from '@/components/views/GalleryView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.gallery', path: '/gallery' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function GalleryPage() {
  setRequestLocale('en');
  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Gallery' },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <GalleryView />
    </>
  );
}
