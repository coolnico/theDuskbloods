'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { DOMAIN } from '@/lib/seo';

export default function Footer() {
  const t = useTranslations('nav');

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="shell py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="text-blood" aria-hidden>
                <path d="M9 1 C9 1 1 11 1 14 C1 17.3 4.5 19 9 19 C13.5 19 17 17.3 17 14 C17 11 9 1 9 1 Z" fill="currentColor"/>
              </svg>
              <div className="font-heading text-lg font-bold text-text">
                Duskbloods <span className="text-muted">Guide</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted">
              {t('footerTagline')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">{t('explore')}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/gameplay" className="nav-link">{t('gameplay')}</Link></li>
                <li><Link href="/characters" className="nav-link">{t('characters')}</Link></li>
                <li><Link href="/gallery" className="nav-link">{t('gallery')}</Link></li>
                <li><Link href="/network-test" className="nav-link">{t('networkTest')}</Link></li>
                <li><Link href="/release-date" className="nav-link">{t('releaseDate')}</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">{t('company')}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="nav-link">{t('about')}</Link></li>
                <li><Link href="/faq" className="nav-link">{t('faq')}</Link></li>
                <li><Link href="/contact" className="nav-link">{t('contact')}</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">{t('legal')}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="nav-link">{t('privacy')}</Link></li>
                <li><Link href="/terms" className="nav-link">{t('terms')}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-xs text-muted">
          <p>{t('disclaimer')}</p>
          <p className="mt-2">{t('copyright', { year: 2026 })}</p>
        </div>
      </div>
    </footer>
  );
}
