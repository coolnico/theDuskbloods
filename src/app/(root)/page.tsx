import type { Metadata } from 'next';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import HomeView from '@/components/views/HomeView';

const getMetadata = makePageMetadata({
  namespace: 'Metadata.home',
  path: '/',
});

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function HomePage() {
  const breadcrumbLd = makeBreadcrumbLd('en', [{ name: 'Home' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <HomeView />
    </>
  );
}
