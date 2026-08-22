import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { DOMAIN, SITE_NAME } from '@/lib/seo';
import GameplayView from '@/components/views/GameplayView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.gameplay', path: '/gameplay' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default async function GameplayPage() {
  setRequestLocale('en');
  const tMeta = await getTranslations({ locale: 'en', namespace: 'Metadata.gameplay' });
  const tGameplay = await getTranslations({ locale: 'en', namespace: 'gameplay' });

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tMeta('title'),
    description: tMeta('description'),
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: DOMAIN,
    },
    mainEntityOfPage: `${DOMAIN}/gameplay`,
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
        url: `${DOMAIN}/gameplay`,
        mainEntity: faqData.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      };
    }
  } catch { /* faq section may not exist in all locales */ }

  const breadcrumbLd = makeBreadcrumbLd('en', [
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
