import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { requireValidLocale } from '@/lib/require-locale';
import { DOMAIN, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo';
import GalleryView from '@/components/views/GalleryView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.gallery', path: '/gallery' });

const BASE = 'https://media.fromsoftware.jp/theduskbloods/resources/images/images/pc';

type FeaturedItem = {
  group: 'main' | 'expansion';
  n: number;
  title: string;
  desc: string;
  keyword: string;
};

function imageSrc(_group: string, n: number) {
  // Featured stills use unique frames from the official main set
  const pad = String(n).padStart(3, '0');
  return `${BASE}/${pad}.png`;
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

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  requireValidLocale(locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'gallery' });
  const featured = t.raw('featured') as { items?: FeaturedItem[]; title?: string; lead?: string };
  const items = featured.items ?? [];
  const url = locale === 'en' ? `${DOMAIN}/gallery` : `${DOMAIN}/${locale}/gallery`;

  const breadcrumbLd = makeBreadcrumbLd(locale, [{ name: 'Home', href: '/' }, { name: 'Gallery' }]);

  const imageGalleryLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: featured.title || 'The Duskbloods screenshot breakdowns',
    description: featured.lead,
    url,
    inLanguage: locale,
    author: { '@type': 'Organization', name: SITE_NAME, url: DOMAIN },
    about: {
      '@type': 'VideoGame',
      name: 'The Duskbloods',
      gamePlatform: 'Nintendo Switch 2',
    },
    image: items.map((item) => ({
      '@type': 'ImageObject',
      contentUrl: imageSrc(item.group, item.n),
      name: item.title,
      description: item.desc,
      keywords: item.keyword,
      creditText: '© FromSoftware / Nintendo',
    })),
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: featured.title || 'The Duskbloods Screenshot Breakdowns',
    description: featured.lead,
    image: items[0] ? imageSrc(items[0].group, items[0].n) : DEFAULT_OG_IMAGE,
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    inLanguage: locale,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: DOMAIN },
    mainEntityOfPage: url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <GalleryView />
    </>
  );
}
