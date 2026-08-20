import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import HomeView from '@/components/views/HomeView';

const getMetadata = makePageMetadata({
  namespace: 'Metadata.home',
  path: '/',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getMetadata(locale);
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbLd = makeBreadcrumbLd(locale, [{ name: 'Home' }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <HomeView />
    </>
  );
}
