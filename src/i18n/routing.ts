import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ja', 'zh', 'zh-TW', 'es', 'fr', 'de', 'ko', 'it', 'pt', 'ru'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'as-needed',
  },
  localeDetection: false,
});
