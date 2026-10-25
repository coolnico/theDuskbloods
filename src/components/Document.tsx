import type { ReactNode } from 'react';
import GoogleAnalytics from './GoogleAnalytics';
import { CONSENT_DEFAULT_SNIPPET } from '@/lib/consent';

import '@/app/globals.css';

/** Publisher id in ads.txt (pub-8183721371181494) — AdSense code uses ca- prefix. */
const DEFAULT_ADSENSE_CLIENT = 'ca-pub-8183721371181494';

/**
 * One inline block so Consent Mode default=denied always runs before
 * adsbygoogle.js (Next hoists standalone async <script src> tags).
 */
function GoogleHeadScripts({ client }: { client: string }) {
  const html = `${CONSENT_DEFAULT_SNIPPET}
(function(){
  var s=document.createElement('script');
  s.async=true;
  s.crossOrigin='anonymous';
  s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}';
  document.head.appendChild(s);
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Shared <html>/<body> shell. Each root layout supplies its own `lang`. */
export default function Document({ lang, children }: { lang: string; children: ReactNode }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || DEFAULT_ADSENSE_CLIENT;
  return (
    <html lang={lang}>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <GoogleHeadScripts client={client} />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
