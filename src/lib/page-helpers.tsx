import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { alternates, DOMAIN, DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo';

type PageOpts = {
  namespace: string;
  path: string;
  ogImages?: string[];
  card?: 'summary' | 'summary_large_image';
};

export function makePageMetadata({ namespace, path, ogImages, card = 'summary_large_image' }: PageOpts) {
  return async function generateMetadata(locale: string): Promise<Metadata> {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace });
    const cleanPath = path === '/' ? '' : path;
    const ogUrl = locale === 'en' ? `${DOMAIN}${cleanPath}` : `${DOMAIN}/${locale}${cleanPath}`;
    const images = ogImages || [DEFAULT_OG_IMAGE];

    return {
      title: t('title'),
      description: t('description'),
      alternates: alternates(path, locale),
      openGraph: {
        type: 'website',
        title: t('title'),
        description: t('description'),
        url: ogUrl,
        siteName: SITE_NAME,
        images,
      },
      twitter: {
        card,
        title: t('title'),
        description: t('description'),
        images,
      },
    };
  };
}

export function makeBreadcrumbLd(locale: string, items: { name: string; href?: string }[]) {
  const clean = (href: string) =>
    href === '/' || href === ''
      ? locale === 'en'
        ? `${DOMAIN}/`
        : `${DOMAIN}/${locale}`
      : locale === 'en'
        ? `${DOMAIN}${href}`
        : `${DOMAIN}/${locale}${href}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: clean(item.href) } : {}),
    })),
  };
}

export function makeFaqPageLd(
  faq: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function makeItemListLd(opts: {
  name: string;
  url: string;
  items: { position: number; name: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    url: opts.url,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
    })),
  };
}

export function makeCollectionPageLd(opts: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string; date?: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: item.url,
        ...(item.date ? { datePublished: item.date } : {}),
      })),
    },
  };
}
