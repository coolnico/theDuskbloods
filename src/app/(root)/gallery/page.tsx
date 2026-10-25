import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import { DOMAIN, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo';
import GalleryView from '@/components/views/GalleryView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.gallery', path: '/gallery' });

const BASE = 'https://img.duskbloods.net/dusk/gallery';
const V = '?v=2';

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
  return `${BASE}/${pad}.png${V}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getMetadata('en');
  return {
    ...meta,
    // Orphaned from nav/sitemap — keep out of the index (AdSense/SEO).
    robots: { index: false, follow: false },
  };
}

export default async function GalleryPage() {
  setRequestLocale('en');
  const t = await getTranslations({ locale: 'en', namespace: 'gallery' });
  const featured = t.raw('featured') as { items?: FeaturedItem[]; title?: string; lead?: string; sourceNote?: string };
  const items = featured.items ?? [];

  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Gallery' },
  ]);

  const imageGalleryLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: featured.title || 'The Duskbloods screenshot breakdowns',
    description: featured.lead,
    url: `${DOMAIN}/gallery`,
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
      creditText: '（权利归原权利人）',
      license: 'https://duskbloods.net/terms',
    })),
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Duskbloods Screenshot Breakdowns',
    description: featured.lead,
    image: items[0] ? imageSrc(items[0].group, items[0].n) : DEFAULT_OG_IMAGE,
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: DOMAIN },
    mainEntityOfPage: `${DOMAIN}/gallery`,
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
