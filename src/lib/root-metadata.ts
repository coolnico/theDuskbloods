import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DOMAIN, LOCALES, SITE_NAME } from '@/lib/seo';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0c0a0e',
} as const;

/** Shared document metadata used by both root layouts. */
export async function makeRootMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Metadata.root' });

  return {
    metadataBase: new URL(DOMAIN),
    title: {
      default: t('title'),
      template: `%s | ${SITE_NAME}`,
    },
    description: t('description'),
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: t('title'),
      description: t('description'),
      url: `${DOMAIN}/`,
      images: [`${DOMAIN}/og.svg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${DOMAIN}/og.svg`],
    },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    },
    alternates: {
      languages: Object.fromEntries([
        ...LOCALES.map((l) => [l, l === 'en' ? `${DOMAIN}/` : `${DOMAIN}/${l}`]),
        ['x-default', `${DOMAIN}/`],
      ]),
    },
  };
}
