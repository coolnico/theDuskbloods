import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { DOMAIN } from '@/lib/seo';
import FaqView from '@/components/views/FaqView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.faq', path: '/faq' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getMetadata(locale);
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });
  const groups = (await t.raw('groups')) as { title: string; items: { q: string; a: string }[] }[];
  const url = locale === 'en' ? `${DOMAIN}/faq` : `${DOMAIN}/${locale}/faq`;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url,
    mainEntity: groups.flatMap((g) =>
      g.items.map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a },
      }))
    ),
  };

  const breadcrumbLd = makeBreadcrumbLd(locale, [{ name: 'Home', href: '/' }, { name: 'FAQ' }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <FaqView />
    </>
  );
}
