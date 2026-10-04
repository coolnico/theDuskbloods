import type { ReactNode } from 'react';
import GoogleAnalytics from './GoogleAnalytics';

import '@/app/globals.css';

/** Shared <html>/<body> shell. Each root layout supplies its own `lang`. */
export default function Document({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html lang={lang}>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
