'use client';

import { NextIntlClientProvider } from 'next-intl';
import SetLang from './SetLang';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';

const LOCALES = ['en', 'ja', 'zh', 'zh-TW', 'es', 'fr', 'de', 'ko', 'it', 'pt', 'ru'] as const;
const MESSAGES: Record<string, () => Promise<any>> = {
  en: () => import('@/messages/en.json'),
  ja: () => import('@/messages/ja.json'),
  zh: () => import('@/messages/zh.json'),
  'zh-TW': () => import('@/messages/zh-TW.json'),
  es: () => import('@/messages/es.json'),
  fr: () => import('@/messages/fr.json'),
  de: () => import('@/messages/de.json'),
  ko: () => import('@/messages/ko.json'),
  it: () => import('@/messages/it.json'),
  pt: () => import('@/messages/pt.json'),
  ru: () => import('@/messages/ru.json'),
};

function detectLocale(): string {
  const seg = window.location.pathname.split('/').filter(Boolean)[0];
  return LOCALES.includes(seg as any) ? seg : 'en';
}

export default function LocaleShell({
  children,
  defaultMessages,
  defaultLocale = 'en',
}: {
  children: React.ReactNode;
  defaultMessages: any;
  defaultLocale?: string;
}) {
  const [locale, setLocale] = useState(defaultLocale);
  const [messages, setMessages] = useState(defaultMessages);

  useEffect(() => {
    const detected = detectLocale();
    setLocale(detected);
    if (detected !== 'en') {
      MESSAGES[detected]().then((mod) => setMessages(mod.default || mod));
    }
  }, []);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      <SetLang locale={locale} />
      <div className="site flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="shell py-6 sm:py-10">{children}</div>
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
