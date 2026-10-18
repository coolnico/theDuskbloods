import type { Metadata } from 'next';
import { LOCALES } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { requireValidLocale } from '@/lib/require-locale';
import StaticView from '@/components/views/StaticView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.terms', path: '/terms' });

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  requireValidLocale(locale);
  return getMetadata(locale);
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  requireValidLocale(locale);
  setRequestLocale(locale);
  const breadcrumbLd = makeBreadcrumbLd(locale, [{ name: 'Home', href: '/' }, { name: 'Terms' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <StaticView namespace="terms" />
    </>
  );
}
