import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ja', 'zh', 'es', 'fr', 'de', 'ko', 'it', 'pt'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'as-needed',
  },
  localeDetection: false,
});
