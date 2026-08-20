export const DOMAIN = 'https://duskbloods.net';
export const SITE_NAME = 'Duskbloods Guide';
export const LOCALES = ['en', 'ja', 'zh', 'es', 'fr', 'de', 'ko', 'it', 'pt'] as const;
export const DEFAULT_OG_IMAGE = `${DOMAIN}/og.svg`;
export const PROD_HOSTNAMES = ['duskbloods.net', 'www.duskbloods.net'];

export function alternates(path: string, locale: string) {
  const cleanPath = path === '/' ? '' : path;
  const canonical =
    locale === 'en' ? `${DOMAIN}${cleanPath}` : `${DOMAIN}/${locale}${cleanPath}`;
  return {
    canonical,
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l, l === 'en' ? `${DOMAIN}${cleanPath}` : `${DOMAIN}/${l}${cleanPath}`])
      ),
      'x-default': `${DOMAIN}${cleanPath}`,
    },
  };
}
