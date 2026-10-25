'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { readConsent, saveConsent, type ConsentInput } from '@/lib/consent';

type Panel = 'banner' | 'customize';

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent('duskbloods:open-consent'));
}

export default function CookieConsent() {
  const t = useTranslations('cookieConsent');
  const [panel, setPanel] = useState<Panel | null>(null);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setPanel('banner');
      return;
    }
    setAnalytics(existing.analytics);
    setAds(existing.ads);
  }, []);

  useEffect(() => {
    const open = () => {
      const existing = readConsent();
      if (existing) {
        setAnalytics(existing.analytics);
        setAds(existing.ads);
      }
      setPanel('customize');
    };
    window.addEventListener('duskbloods:open-consent', open);
    return () => window.removeEventListener('duskbloods:open-consent', open);
  }, []);

  const commit = useCallback((input: ConsentInput) => {
    saveConsent(input);
    setAnalytics(input.analytics);
    setAds(input.ads);
    setPanel(null);
  }, []);

  if (!panel) return null;

  return (
    <div
      role="dialog"
      aria-label={t('title')}
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-border bg-surface/95 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] backdrop-blur"
    >
      <div className="shell py-3 sm:py-4">
        {panel === 'banner' ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text">{t('title')}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {t('body')}{' '}
                <a href="/privacy" className="text-gold underline-offset-2 hover:underline">
                  {t('privacyLink')}
                </a>
              </p>
            </div>
            {/* Accept left, Reject right — both equal size & one click (GDPR). */}
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                type="button"
                className="btn-primary px-4 py-2 text-xs sm:text-sm"
                onClick={() => commit({ analytics: true, ads: true })}
              >
                {t('accept')}
              </button>
              <button
                type="button"
                className="btn-ghost px-4 py-2 text-xs sm:text-sm"
                onClick={() => commit({ analytics: false, ads: false })}
              >
                {t('reject')}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-semibold text-text">{t('settingsTitle')}</p>
              <p className="mt-1 text-xs text-muted">{t('settingsBody')}</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <label className="flex items-start gap-2 rounded-[var(--radius)] border border-border bg-surface-2/60 px-3 py-2">
                <input type="checkbox" checked disabled className="mt-1" />
                <span>
                  <span className="block text-xs font-semibold text-text">{t('essential')}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted">{t('essentialDesc')}</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-2 rounded-[var(--radius)] border border-border bg-surface-2/60 px-3 py-2">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <span className="block text-xs font-semibold text-text">{t('analytics')}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted">{t('analyticsDesc')}</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-2 rounded-[var(--radius)] border border-border bg-surface-2/60 px-3 py-2">
                <input
                  type="checkbox"
                  checked={ads}
                  onChange={(e) => setAds(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <span className="block text-xs font-semibold text-text">{t('ads')}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted">{t('adsDesc')}</span>
                </span>
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="btn-primary px-3 py-2 text-xs sm:text-sm"
                onClick={() => commit({ analytics, ads })}
              >
                {t('save')}
              </button>
              <button
                type="button"
                className="btn-ghost px-3 py-2 text-xs sm:text-sm"
                onClick={() => commit({ analytics: true, ads: true })}
              >
                {t('accept')}
              </button>
              <button
                type="button"
                className="btn-ghost px-3 py-2 text-xs sm:text-sm"
                onClick={() => commit({ analytics: false, ads: false })}
              >
                {t('reject')}
              </button>
              <button
                type="button"
                className="px-3 py-2 text-xs font-semibold text-muted underline-offset-2 hover:underline sm:text-sm"
                onClick={() => setPanel('banner')}
              >
                {t('back')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
