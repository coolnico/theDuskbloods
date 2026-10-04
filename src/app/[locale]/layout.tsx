import type { Metadata, Viewport } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Document from '@/components/Document';
import LocaleShell from '@/components/LocaleShell';
import { alternates, DOMAIN, LOCALES, SITE_NAME } from '@/lib/seo';
import { makeRootMetadata, viewport as rootViewport } from '@/lib/root-metadata';
import enMessages from '@/messages/en.json';

export const revalidate = 172800;

export const viewport: Viewport = rootViewport;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!LOCALES.includes(locale as any)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Metadata.root' });
  const path = '';
  const url = locale === 'en' ? `${DOMAIN}/` : `${DOMAIN}/${locale}/`;
  const root = await makeRootMetadata();

  return {
    ...root,
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
  const isValid = (LOCALES as readonly string[]).includes(locale);
  const lang = isValid ? locale : 'en';

  setRequestLocale(lang);
  const t = await getTranslations({ locale: lang, namespace: 'Metadata.root' });
  const messages = isValid
    ? (await import(`@/messages/${locale}.json`)).default
    : enMessages;

  return (
    <Document lang={lang}>
      <LocaleShell defaultMessages={messages} defaultLocale={lang}>
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
    </Document>
  );
}
