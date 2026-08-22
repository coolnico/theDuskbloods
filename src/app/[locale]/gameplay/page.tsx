import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { DOMAIN, SITE_NAME } from '@/lib/seo';
import GameplayView from '@/components/views/GameplayView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.gameplay', path: '/gameplay' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getMetadata(locale);
}

export default async function GameplayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: 'Metadata.gameplay' });
  const tGameplay = await getTranslations({ locale, namespace: 'gameplay' });
  const url = locale === 'en' ? `${DOMAIN}/gameplay` : `${DOMAIN}/${locale}/gameplay`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tMeta('title'),
    description: tMeta('description'),
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    inLanguage: locale,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: DOMAIN,
    },
    mainEntityOfPage: url,
    about: {
      '@type': 'VideoGame',
      name: 'The Duskbloods',
      gamePlatform: 'Nintendo Switch 2',
      publisher: { '@type': 'Organization', name: 'Nintendo' },
      developer: { '@type': 'Organization', name: 'FromSoftware' },
      datePublished: '2026',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.speakable'],
    },
  };

  // FAQPage schema from faq section
  let faqLd = null;
  try {
    const faqData = tGameplay.raw('faq') as { items?: { q: string; a: string }[] };
    if (faqData?.items?.length) {
      faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url,
        mainEntity: faqData.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      };
    }
  } catch { /* faq section may not exist in all locales */ }

  const breadcrumbLd = makeBreadcrumbLd(locale, [
    { name: 'Home', href: '/' },
    { name: 'Gameplay' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <GameplayView />
    </>
  );
}
