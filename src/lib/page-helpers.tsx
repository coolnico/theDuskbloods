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
