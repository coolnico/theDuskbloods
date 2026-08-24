import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { LOCALES } from './seo';

export interface Article {
  slug: string;
  title: string;
  date: string;
  modified?: string;
  summary: string;
  image?: string;
  tags?: string[];
  content: string; // rendered HTML
  wordCount: number;
  locale: string;
  isFallback: boolean; // true if showing English content due to missing translation
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

const CONTENT_DIR = path.join(process.cwd(), 'content');

function getLocaleDir(locale: string): string {
  return path.join(CONTENT_DIR, locale);
}

interface Frontmatter {
  title: string;
  date: string;
  modified?: string;
  summary: string;
  image?: string;
  tags?: string[];
}

function readMdFile(filePath: string): { data: Frontmatter; content: string } | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return matter(raw) as unknown as { data: Frontmatter; content: string };
  } catch {
    return null;
  }
}

function countWords(text: string): number {
  // Count CJK characters individually, count Latin words by spaces
  const cjk = (text.match(/[一-鿿぀-ゟ゠-ヿ]/g) || []).length;
  const latin = text.replace(/[一-鿿぀-ゟ゠-ヿ]/g, ' ').split(/\s+/).filter(Boolean).length;
  return cjk + latin;
}

function getSlugsFromDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

/** Get all unique slugs (from root + all locale directories) */
export function getAllSlugs(): string[] {
  const slugs = new Set(getSlugsFromDir(CONTENT_DIR));
  for (const locale of LOCALES) {
    if (locale === 'en') continue;
    for (const slug of getSlugsFromDir(getLocaleDir(locale))) {
      slugs.add(slug);
    }
  }
  return Array.from(slugs);
}

/** Get slugs only from root content directory (English articles) */
export function getRootSlugs(): string[] {
  return getSlugsFromDir(CONTENT_DIR);
}

/** Get all article metadata for a locale, with English fallback from root */
export function getAllArticleMetas(locale: string): ArticleMeta[] {
  const rootSlugs = getSlugsFromDir(CONTENT_DIR);
  const localeDir = getLocaleDir(locale);
  const isEn = locale === 'en';

  const metas: ArticleMeta[] = [];

  for (const slug of rootSlugs) {
    let file = null;
    let usedLocale = 'en';

    // Try locale-specific version first
    if (!isEn) {
      file = readMdFile(path.join(localeDir, `${slug}.md`));
      if (file) usedLocale = locale;
    }

    // Fallback to root (English)
    if (!file) {
      file = readMdFile(path.join(CONTENT_DIR, `${slug}.md`));
      usedLocale = 'en';
    }

    if (file) {
      metas.push({
        slug,
        title: file.data.title,
        date: file.data.date,
        modified: file.data.modified,
        summary: file.data.summary,
        image: file.data.image,
        tags: file.data.tags,
        wordCount: countWords(file.content),
        locale: usedLocale,
      });
    }
  }

  // Also pick up locale-specific articles not in root
  if (!isEn) {
    const localeSlugs = getSlugsFromDir(localeDir);
    const rootSlugSet = new Set(rootSlugs);
    for (const slug of localeSlugs) {
      if (rootSlugSet.has(slug)) continue;
      const file = readMdFile(path.join(localeDir, `${slug}.md`));
      if (file) {
        metas.push({
          slug,
          title: file.data.title,
          date: file.data.date,
          modified: file.data.modified,
          summary: file.data.summary,
          image: file.data.image,
          tags: file.data.tags,
          wordCount: countWords(file.content),
          locale,
        });
      }
    }
  }

  // Sort by date descending
  metas.sort((a, b) => b.date.localeCompare(a.date));
  return metas;
}

/** Get a single article by slug for a locale, with English fallback from root */
export function getArticle(locale: string, slug: string): Article | null {
  const localeDir = getLocaleDir(locale);

  // Try locale-specific version first
  if (locale !== 'en') {
    const file = readMdFile(path.join(localeDir, `${slug}.md`));
    if (file) {
      return {
        slug,
        title: file.data.title,
        date: file.data.date,
        modified: file.data.modified,
        summary: file.data.summary,
        image: file.data.image,
        tags: file.data.tags,
        content: marked.parse(file.content) as string,
        wordCount: countWords(file.content),
        locale,
        isFallback: false,
      };
    }
  }

  // Fallback to root (English)
  const file = readMdFile(path.join(CONTENT_DIR, `${slug}.md`));
  if (file) {
    return {
      slug,
      title: file.data.title,
      date: file.data.date,
      modified: file.data.modified,
      summary: file.data.summary,
      image: file.data.image,
      tags: file.data.tags,
      content: marked.parse(file.content) as string,
      wordCount: countWords(file.content),
      locale: 'en',
      isFallback: locale !== 'en',
    };
  }

  return null;
}

/** Get locales that have a translation for a given slug (excludes 'en') */
export function getTranslatedLocales(slug: string): string[] {
  const locales: string[] = [];
  for (const locale of LOCALES) {
    if (locale === 'en') continue;
    const filePath = path.join(getLocaleDir(locale), `${slug}.md`);
    if (fs.existsSync(filePath)) {
      locales.push(locale);
    }
  }
  return locales;
}

/** Get all static params for [locale]/latest/[slug] — all locales × all slugs */
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
