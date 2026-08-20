import type { MetadataRoute } from 'next';
import { DOMAIN, LOCALES } from '@/lib/seo';

// English served at root (no prefix) + each non-en locale prefixed
const NON_EN = LOCALES.filter((l) => l !== 'en');

const PAGES = [
  { path: '', priority: 1.0 },
  { path: '/gameplay', priority: 0.9 },
  { path: '/characters', priority: 0.9 },
  { path: '/network-test', priority: 0.9 },
  { path: '/release-date', priority: 0.9 },
  { path: '/faq', priority: 0.8 },
  { path: '/about', priority: 0.6 },
  { path: '/privacy', priority: 0.3 },
  { path: '/terms', priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const { path, priority } of PAGES) {
    urls.push({ url: `${DOMAIN}${path}`, priority, changeFrequency: 'weekly' });
    for (const locale of NON_EN) {
      urls.push({ url: `${DOMAIN}/${locale}${path}`, priority, changeFrequency: 'weekly' });
    }
  }

  return urls;
}
