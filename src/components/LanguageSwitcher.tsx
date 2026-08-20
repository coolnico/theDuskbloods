'use client';

import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';

const LOCALES = [
  { code: 'en', label: 'English', flag: 'us' },
  { code: 'ja', label: '日本語', flag: 'jp' },
  { code: 'zh', label: '中文', flag: 'cn' },
  { code: 'ko', label: '한국어', flag: 'kr' },
  { code: 'es', label: 'Español', flag: 'es' },
  { code: 'fr', label: 'Français', flag: 'fr' },
  { code: 'de', label: 'Deutsch', flag: 'de' },
  { code: 'it', label: 'Italiano', flag: 'it' },
  { code: 'pt', label: 'Português', flag: 'pt' },
];

const FLAG_URL = (code: string) => `https://flagcdn.com/w20/${code}.png`;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLocale = (code: string) => {
    document.cookie = `NEXT_LOCALE=${code}; Path=/; SameSite=lax; Max-Age=31536000`;
    const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
    const clean = pathname.replace(/^\/(ja|zh|ko|es|fr|de|it|pt)(?=\/|$)/, '') || '/';
    const target = code === 'en' ? clean : `/${code}${clean}`;
    window.location.href = target;
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface-2 hover:text-text"
        aria-label="Switch language"
      >
        <img
          src={FLAG_URL(LOCALES.find((l) => l.code === locale)?.flag || 'us')}
          alt=""
          width={18}
          height={12}
          className="shrink-0 rounded-[2px] object-cover"
        />
        <span className="hidden sm:inline">{LOCALES.find((l) => l.code === locale)?.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[150px] rounded-lg border border-border bg-surface py-1 shadow-lg">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-surface-2 ${
                l.code === locale ? 'bg-surface-2 font-bold text-text' : 'text-muted'
              }`}
            >
              <img
                src={FLAG_URL(l.flag)}
                alt=""
                width={18}
                height={12}
                className="shrink-0 rounded-[2px] object-cover"
              />
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
