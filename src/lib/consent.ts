export type ConsentState = {
  analytics: boolean;
  ads: boolean;
  decidedAt: string;
};

export type ConsentInput = {
  analytics: boolean;
  ads: boolean;
};

const STORAGE_KEY = 'duskbloods_consent_v1';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      analytics: !!parsed.analytics,
      ads: !!parsed.ads,
      decidedAt: parsed.decidedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveConsent(input: ConsentInput): ConsentState {
  const next: ConsentState = {
    analytics: input.analytics,
    ads: input.ads,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // private mode — still apply for this page view
  }
  applyConsentToGtag(next);
  window.dispatchEvent(new CustomEvent('duskbloods:consent', { detail: next }));
  return next;
}

export function applyConsentToGtag(state: ConsentState | null) {
  const gtag = window.gtag;
  if (typeof gtag !== 'function') return;
  gtag('consent', 'update', {
    analytics_storage: state?.analytics ? 'granted' : 'denied',
    ad_storage: state?.ads ? 'granted' : 'denied',
    ad_user_data: state?.ads ? 'granted' : 'denied',
    ad_personalization: state?.ads ? 'granted' : 'denied',
  });
}

/** Inline in <head> before gtag.js — Consent Mode v2 default = denied. */
export const CONSENT_DEFAULT_SNIPPET = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  wait_for_update:500
});
`;
