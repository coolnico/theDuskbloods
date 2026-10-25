'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { PROD_HOSTNAMES } from '@/lib/seo';
import { applyConsentToGtag, readConsent, type ConsentState } from '@/lib/consent';

// NEXT_PUBLIC_* must be inlined at build time. Fallback keeps GA alive if the
// env var is missing from the OpenNext/Cloudflare build (empty string breaks GA).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-0QELYVWG7M';

function applyCurrent() {
  applyConsentToGtag(readConsent());
}

/**
 * Loads gtag.js on prod with Consent Mode v2 defaults (set in Document head).
 * Denied consent still sends cookieless pings; granted upgrades to full GA.
 */
export default function GoogleAnalytics() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { hostname } = window.location;
    if (PROD_HOSTNAMES.includes(hostname)) {
      setLoaded(true);
    }
    // gtag may still be loading — safe no-op until window.gtag exists.
    applyCurrent();
    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent).detail as ConsentState | undefined;
      applyConsentToGtag(detail ?? readConsent());
    };
    window.addEventListener('duskbloods:consent', onConsent);
    return () => window.removeEventListener('duskbloods:consent', onConsent);
  }, []);

  if (!loaded || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
        // Replay stored choice once gtag.js is actually present.
        onLoad={applyCurrent}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            allow_ad_personalization_signals: false,
            cookie_flags: 'SameSite=Lax;Secure'
          });
          try {
            var raw = localStorage.getItem('duskbloods_consent_v1');
            if (raw) {
              var c = JSON.parse(raw);
              gtag('consent', 'update', {
                analytics_storage: c.analytics ? 'granted' : 'denied',
                ad_storage: c.ads ? 'granted' : 'denied',
                ad_user_data: c.ads ? 'granted' : 'denied',
                ad_personalization: c.ads ? 'granted' : 'denied'
              });
            }
          } catch (e) {}
        `}
      </Script>
    </>
  );
}
