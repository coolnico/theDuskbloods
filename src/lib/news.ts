import { ARTICLES, type ArticleData } from './articles-generated';
import { LOCALES } from './seo';

export interface Article {
  slug: string;
  title: string;
  date: string;
  modified?: string;
  summary: string;
  image?: string;
  tags?: string[];
  content: string;
  wordCount: number;
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
  wordCount: number;
  locale: string;
}

/** Get all unique slugs */
export function getAllSlugs(): string[] {
  return Object.keys(ARTICLES);
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

/** Get all article metadata for a locale, with English fallback */
export function getAllArticleMetas(locale: string): ArticleMeta[] {
  const metas: ArticleMeta[] = [];

  for (const slug of Object.keys(ARTICLES)) {
    const entry = ARTICLES[slug];
    let data: ArticleData | undefined;
    let usedLocale = 'en';

    if (locale !== 'en' && entry[locale]) {
      data = entry[locale];
      usedLocale = locale;
    } else if (entry.en) {
      data = entry.en;
      usedLocale = 'en';
    }

    if (data) {
      metas.push({
        slug,
        title: data.title,
        date: data.date,
        modified: data.modified || undefined,
        summary: data.summary,
        image: data.image || undefined,
        tags: data.tags,
        wordCount: data.wordCount,
        locale: usedLocale,
      });
    }
  }

  metas.sort((a, b) => b.date.localeCompare(a.date));
  return metas;
}

/** Get a single article by slug for a locale, with English fallback */
export function getArticle(locale: string, slug: string): Article | null {
  const entry = ARTICLES[slug];
  if (!entry) return null;

  if (locale !== 'en' && entry[locale]) {
    const data = entry[locale];
    return {
      slug,
      title: data.title,
      date: data.date,
      modified: data.modified || undefined,
      summary: data.summary,
      image: data.image || undefined,
      tags: data.tags,
      content: data.content,
      wordCount: data.wordCount,
      locale,
      isFallback: false,
    };
  }

  if (entry.en) {
    const data = entry.en;
    return {
      slug,
      title: data.title,
      date: data.date,
      modified: data.modified || undefined,
      summary: data.summary,
      image: data.image || undefined,
      tags: data.tags,
      content: data.content,
      wordCount: data.wordCount,
      locale: 'en',
      isFallback: locale !== 'en',
    };
  }

  return null;
}

/** Get all static params for [locale]/latest/[slug] */
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
