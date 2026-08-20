import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LocaleShell from '@/components/LocaleShell';
import { alternates, DOMAIN, LOCALES, SITE_NAME } from '@/lib/seo';

export const revalidate = 172800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Metadata.root' });
  const path = '';
  const url = locale === 'en' ? `${DOMAIN}/` : `${DOMAIN}/${locale}/`;

  return {
    title: {
      default: t('title'),
      template: `%s | ${SITE_NAME}`,
    },
    description: t('description'),
    alternates: alternates(path, locale),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: t('title'),
      description: t('description'),
      url,
      images: [`${DOMAIN}/og.svg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${DOMAIN}/og.svg`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Metadata.root' });
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return (
    <LocaleShell defaultMessages={messages} defaultLocale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: `${DOMAIN}/`,
            description: t('description'),
            inLanguage: LOCALES,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoGame',
            name: 'The Duskbloods',
            url: `${DOMAIN}/`,
            gamePlatform: 'Nintendo Switch 2',
            genre: ['PvPvE', 'Action', 'RPG'],
            publisher: { '@type': 'Organization', name: 'Nintendo' },
            developer: { '@type': 'Organization', name: 'FromSoftware' },
            datePublished: '2026',
            inLanguage: LOCALES,
            dateModified: '2026-08-20',
          }),
        }}
      />
      {children}
    </LocaleShell>
  );
}
