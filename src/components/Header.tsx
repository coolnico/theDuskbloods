'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import NavLink from './NavLink';

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
          <NavLink href="/latest" className="nav-link">{t('latest')}</NavLink>
          <NavLink href="/gameplay" className="nav-link">{t('gameplay')}</NavLink>
          <NavLink href="/characters" className="nav-link">{t('characters')}</NavLink>
          <NavLink href="/gallery" className="nav-link">{t('gallery')}</NavLink>
          <NavLink href="/network-test" className="nav-link">{t('networkTest')}</NavLink>
          <NavLink href="/release-date" className="nav-link">{t('releaseDate')}</NavLink>
          <NavLink href="/faq" className="nav-link">{t('faq')}</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <NavLink href="/latest" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('latest')}</NavLink>
        <NavLink href="/gameplay" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('gameplay')}</NavLink>
        <NavLink href="/characters" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('characters')}</NavLink>
        <NavLink href="/gallery" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('gallery')}</NavLink>
        <NavLink href="/network-test" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('networkTest')}</NavLink>
        <NavLink href="/release-date" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('releaseDate')}</NavLink>
        <NavLink href="/faq" className="nav-link shrink-0 whitespace-nowrap px-2 py-1 text-xs">{t('faq')}</NavLink>
      </nav>
    </header>
  );
}
