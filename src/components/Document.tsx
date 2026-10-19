import type { ReactNode } from 'react';
import GoogleAnalytics from './GoogleAnalytics';

import '@/app/globals.css';

/**
 * Optional third-party head snippets (e.g. Google AdSense).
 * Set NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX to enable.
 * Leave unset during AdSense application review until the account is approved.
 */
function AdSenseSnippet() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}

/** Shared <html>/<body> shell. Each root layout supplies its own `lang`. */
export default function Document({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html lang={lang}>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <AdSenseSnippet />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
