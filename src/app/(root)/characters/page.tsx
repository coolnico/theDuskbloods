import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import CharactersView from '@/components/views/CharactersView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.characters', path: '/characters' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function CharactersPage() {
  setRequestLocale('en');
  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Characters' },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <CharactersView />
    </>
  );
}
