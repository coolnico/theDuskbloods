import type { MetadataRoute } from 'next';
import { DOMAIN } from '@/lib/seo';

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_CRAWLERS, allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${DOMAIN}/sitemap.xml`,
    host: DOMAIN,
  };
}
