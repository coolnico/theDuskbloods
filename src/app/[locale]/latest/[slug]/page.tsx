import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makeBreadcrumbLd } from '@/lib/page-helpers';
import { getArticle, getAllStaticParams, getTranslatedLocales } from '@/lib/news';
import { DOMAIN, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, Clock, Tag } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return getAllStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(locale, slug);
  if (!article) return {};

  const enUrl = `${DOMAIN}/latest/${slug}`;
  const localeUrl = locale === 'en' ? enUrl : `${DOMAIN}/${locale}/latest/${slug}`;
  const images = article.image ? [article.image] : [DEFAULT_OG_IMAGE];

  // Fallback pages: noindex, canonical to English, no hreflang
  if (article.isFallback) {
    return {
      title: article.title,
      description: article.summary,
      robots: { index: false, follow: true },
      alternates: {
        canonical: enUrl,
      },
    };
  }

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: localeUrl,
      languages: Object.fromEntries([
        ['en', enUrl],
        ...getTranslatedLocales(slug).map((l) => [l, `${DOMAIN}/${l}/latest/${slug}`]),
        ['x-default', enUrl],
      ]),
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.summary,
      url: localeUrl,
      siteName: SITE_NAME,
      publishedTime: article.date,
      ...(article.modified ? { modifiedTime: article.modified } : {}),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'news' });
  const article = getArticle(locale, slug);
  if (!article) notFound();

  const articleUrl = locale === 'en' ? `${DOMAIN}/latest/${slug}` : `${DOMAIN}/${locale}/latest/${slug}`;
  const breadcrumbLd = makeBreadcrumbLd(locale, [
    { name: 'Home', href: '/' },
    { name: t('title'), href: '/latest' },
    { name: article.title },
  ]);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: article.image || undefined,
    datePublished: article.date,
    dateModified: article.modified || article.date,
    inLanguage: locale,
    wordCount: article.wordCount,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: DOMAIN,
      logo: { '@type': 'ImageObject', url: `${DOMAIN}/favicon.svg` },
    },
    mainEntityOfPage: articleUrl,
    ...(article.tags?.length ? { keywords: article.tags.join(', ') } : {}),
    about: {
      '@type': 'VideoGame',
      name: 'The Duskbloods',
      gamePlatform: 'Nintendo Switch 2',
    },
  };

  const readingTime = Math.max(1, Math.ceil(article.wordCount / 200));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="relative z-10">
        <article className="shell py-10 sm:py-16" itemScope itemType="https://schema.org/Article">
          <Link href="/latest" locale={locale} className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-text transition-colors">
            <ArrowLeft className="h-4 w-4" /> {t('backToList')}
          </Link>
          {article.isFallback && (
            <div className="mb-6 rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold">
              {t('fallbackNotice')}
            </div>
          )}
          <header>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={article.date} itemProp="datePublished">
                  {new Date(article.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </span>
              {article.modified && article.modified !== article.date && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{t('updatedOn')} <time dateTime={article.modified} itemProp="dateModified">
                    {new Date(article.modified).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time></span>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{t('readingTime', { min: readingTime })}</span>
              </span>
            </div>
            <h1 className="h-title mt-3 text-2xl font-bold sm:text-4xl" itemProp="headline">{article.title}</h1>
            <p className="mt-3 text-muted" itemProp="description">{article.summary}</p>
            {article.tags && article.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-muted" />
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">{tag}</span>
                ))}
              </div>
            )}
          </header>
          <div className="prose-article mt-8" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
      </main>
    </>
  );
}
