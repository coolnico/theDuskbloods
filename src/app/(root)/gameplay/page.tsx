import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import GameplayView from '@/components/views/GameplayView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.gameplay', path: '/gameplay' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function GameplayPage() {
  setRequestLocale('en');
  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'Gameplay' },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <GameplayView />
    </>
  );
}
