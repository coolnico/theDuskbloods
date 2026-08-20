import { getTranslations, setRequestLocale } from 'next-intl/server';
import LocaleShell from '@/components/LocaleShell';
import { DOMAIN, LOCALES, SITE_NAME } from '@/lib/seo';
import enMessages from '@/messages/en.json';

export async function generateStaticParams() {
  return [];
}

export default async function RootGroupLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale('en');
  const t = await getTranslations({ locale: 'en', namespace: 'Metadata.root' });

  return (
    <LocaleShell defaultMessages={enMessages} defaultLocale="en">
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
