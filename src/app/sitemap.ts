import type { MetadataRoute } from 'next';
import { DOMAIN, LOCALES } from '@/lib/seo';
import {
  getAllSlugs,
  getArticleHref,
  getSlugSection,
  getTranslatedLocales,
  getArticle,
} from '@/lib/news';

// English served at root (no prefix) + each non-en locale prefixed
const NON_EN = LOCALES.filter((l) => l !== 'en');

/** Site-wide lastmod for hub/legal pages (bump when major content ships). */
const SITE_LASTMOD = '2026-10-19';

const PAGES = [
  { path: '', priority: 1.0, lastmod: SITE_LASTMOD },
  { path: '/gameplay', priority: 0.9, lastmod: SITE_LASTMOD },
  { path: '/characters', priority: 0.9, lastmod: SITE_LASTMOD },
  { path: '/network-test', priority: 0.9, lastmod: SITE_LASTMOD },
  { path: '/release-date', priority: 0.9, lastmod: SITE_LASTMOD },
  { path: '/guides', priority: 0.9, lastmod: SITE_LASTMOD },
  { path: '/gallery', priority: 0.8, lastmod: SITE_LASTMOD },
  { path: '/faq', priority: 0.8, lastmod: SITE_LASTMOD },
  { path: '/latest', priority: 0.8, lastmod: SITE_LASTMOD },
  { path: '/about', priority: 0.6, lastmod: SITE_LASTMOD },
  { path: '/privacy', priority: 0.3, lastmod: SITE_LASTMOD },
  { path: '/terms', priority: 0.3, lastmod: SITE_LASTMOD },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const { path, priority, lastmod } of PAGES) {
    urls.push({
      url: `${DOMAIN}${path}`,
      priority,
      changeFrequency: 'weekly',
      lastModified: lastmod,
    });
    for (const locale of NON_EN) {
      urls.push({
        url: `${DOMAIN}/${locale}${path}`,
        priority,
        changeFrequency: 'weekly',
        lastModified: lastmod,
      });
    }
  }

  // Articles — only include locales with actual translations.
  // Detail URL is /latest/{slug} for news and /guides/{slug} for guides.
  const slugs = getAllSlugs();
  for (const slug of slugs) {
    const href = getArticleHref(slug, getSlugSection(slug));
    const en = getArticle('en', slug);
    const lastmod = en?.modified || en?.date || SITE_LASTMOD;
    urls.push({
      url: `${DOMAIN}${href}`,
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: lastmod,
    });
    for (const locale of getTranslatedLocales(slug)) {
      const locArticle = getArticle(locale, slug);
      urls.push({
        url: `${DOMAIN}/${locale}${href}`,
        priority: 0.7,
        changeFrequency: 'monthly',
        lastModified: locArticle?.modified || locArticle?.date || lastmod,
      });
    }
  }

  return urls;
}
