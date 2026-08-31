'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { PROD_HOSTNAMES } from '@/lib/seo';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export default function GoogleAnalytics() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { hostname } = window.location;
    if (PROD_HOSTNAMES.includes(hostname)) {
      setLoaded(true);
    }
  }, []);

  if (!loaded || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
