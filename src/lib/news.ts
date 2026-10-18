import { ARTICLES, type ArticleData, type ArticleSection, type ArticleFaqItem, type ArticleListItem } from './articles-generated';
import { categoryMatchesTags, GUIDES_CATEGORIES } from './guides-categories';
import { LOCALES } from './seo';

export type { ArticleSection, ArticleFaqItem, ArticleListItem };

export interface Article {
  slug: string;
  title: string;
  date: string;
  modified?: string;
  summary: string;
  image?: string;
  tags?: string[];
  section: ArticleSection;
  content: string;
  wordCount: number;
  faq: ArticleFaqItem[];
  listItems: ArticleListItem[];
  locale: string;
  isFallback: boolean;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  modified?: string;
  summary: string;
  image?: string;
  tags?: string[];
  section: ArticleSection;
  wordCount: number;
  locale: string;
}

/** Canonical detail path for an article: /guides/{slug} or /latest/{slug} */
export function getArticleHref(slug: string, section: ArticleSection): string {
  return section === 'guides' ? `/guides/${slug}` : `/latest/${slug}`;
}

/** Section of a slug (from its en entry, falling back to any locale) */
export function getSlugSection(slug: string): ArticleSection {
  const entry = ARTICLES[slug];
  if (!entry) return 'news';
  return (entry.en ?? Object.values(entry)[0])?.section ?? 'news';
}

/** Get all unique slugs */
export function getAllSlugs(): string[] {
  return Object.keys(ARTICLES);
}

/** Get slugs by section */
export function getSlugsBySection(section: ArticleSection): string[] {
  return Object.keys(ARTICLES).filter((slug) => getSlugSection(slug) === section);
}

/** Get slugs that have a root (English) version */
export function getRootSlugs(): string[] {
  return Object.keys(ARTICLES).filter((slug) => ARTICLES[slug]?.en);
}

/** Get locales that have a translation for a given slug (excludes 'en') */
export function getTranslatedLocales(slug: string): string[] {
  const entry = ARTICLES[slug];
  if (!entry) return [];
  return LOCALES.filter((l) => l !== 'en' && entry[l]);
}

function toMeta(slug: string, data: ArticleData, usedLocale: string): ArticleMeta {
  return {
    slug,
    title: data.title,
    date: data.date,
    modified: data.modified || undefined,
    summary: data.summary,
    image: data.image || undefined,
    tags: data.tags,
    section: data.section,
    wordCount: data.wordCount,
    locale: usedLocale,
  };
}

/** Resolve the best ArticleData for a slug/locale, with English fallback */
function resolveData(slug: string, locale: string): { data: ArticleData; usedLocale: string } | null {
  const entry = ARTICLES[slug];
  if (!entry) return null;
  if (locale !== 'en' && entry[locale]) return { data: entry[locale], usedLocale: locale };
  if (entry.en) return { data: entry.en, usedLocale: 'en' };
  return null;
}

/** Get all article metadata for a locale, with English fallback */
export function getAllArticleMetas(locale: string): ArticleMeta[] {
  const metas: ArticleMeta[] = [];
  for (const slug of Object.keys(ARTICLES)) {
    const resolved = resolveData(slug, locale);
    if (resolved) metas.push(toMeta(slug, resolved.data, resolved.usedLocale));
  }
  metas.sort((a, b) => b.date.localeCompare(a.date));
  return metas;
}

/** Get article metadata filtered by section */
export function getArticleMetasBySection(locale: string, section: ArticleSection): ArticleMeta[] {
  return getAllArticleMetas(locale).filter((m) => getSlugSection(m.slug) === section);
}

/** Get guides-article metadata matching a category (by tags) */
export function getArticleMetasByCategory(locale: string, categorySlug: string): ArticleMeta[] {
  return getArticleMetasBySection(locale, 'guides').filter((m) => categoryMatchesTags(categorySlug, m.tags));
}

/** Category counts for the guides hub (guides articles only) */
export function getGuidesCategoryCounts(locale: string): { slug: string; count: number; latest?: ArticleMeta }[] {
  const guides = getArticleMetasBySection(locale, 'guides');
  return GUIDES_CATEGORIES.map((c) => {
    const matched = guides.filter((m) => categoryMatchesTags(c.slug, m.tags));
    return { slug: c.slug, count: matched.length, latest: matched[0] };
  });
}

/** Get a single article by slug for a locale, with English fallback */
export function getArticle(locale: string, slug: string): Article | null {
  const resolved = resolveData(slug, locale);
  if (!resolved) return null;
  const { data, usedLocale } = resolved;
  return {
    slug,
    title: data.title,
    date: data.date,
    modified: data.modified || undefined,
    summary: data.summary,
    image: data.image || undefined,
    tags: data.tags,
    section: data.section,
    content: data.content,
    wordCount: data.wordCount,
    faq: data.faq ?? [],
    listItems: data.listItems ?? [],
    locale: usedLocale,
    isFallback: usedLocale !== locale,
  };
}

/** Get all static params for [slug] detail routes */
export function getAllStaticParams(): { locale: string; slug: string }[] {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const slug of slugs) {
    for (const locale of LOCALES) {
      params.push({ locale, slug });
    }
  }
  return params;
}
