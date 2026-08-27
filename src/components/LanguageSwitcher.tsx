'use client';

import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'ko', label: '한국어' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский' },
];

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

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
    // Remove any existing locale prefix (including zh-TW)
    const clean = pathname.replace(/^\/(zh-TW|ja|zh|ko|es|fr|de|it|pt|ru)(?=\/|$)/, '') || '/';
    const target = code === 'en' ? clean : `/${code}${clean}`;
    window.location.href = target;
  };

  const currentLabel = LOCALES.find((l) => l.code === locale)?.label || 'English';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface-2 hover:text-text"
        aria-label="Switch language"
      >
        <GlobeIcon className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">{currentLabel}</span>
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
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
