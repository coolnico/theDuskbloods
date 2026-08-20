'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <img src="/favicon.svg" width="32" height="32" alt="" aria-hidden className="h-8 w-8" />
          <span className="font-heading text-lg font-bold tracking-tight text-text">
            Duskbloods <span className="text-muted">Guide</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/gameplay" className="nav-link">{t('gameplay')}</Link>
          <Link href="/characters" className="nav-link">{t('characters')}</Link>
          <Link href="/network-test" className="nav-link">{t('networkTest')}</Link>
          <Link href="/release-date" className="nav-link">{t('releaseDate')}</Link>
          <Link href="/faq" className="nav-link">{t('faq')}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <Link href="/gameplay" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('gameplay')}</Link>
        <Link href="/characters" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('characters')}</Link>
        <Link href="/network-test" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('networkTest')}</Link>
        <Link href="/release-date" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('releaseDate')}</Link>
        <Link href="/faq" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('faq')}</Link>
      </nav>
    </header>
  );
}
