import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makeBreadcrumbLd, makeFaqPageLd, makeItemListLd, makeHowToLd } from '@/lib/page-helpers';
import { requireValidLocale } from '@/lib/require-locale';
import {
  getArticle,
  getSlugSection,
  getSlugsBySection,
  getTranslatedLocales,
} from '@/lib/news';
import { DOMAIN, SITE_NAME, DEFAULT_OG_IMAGE, LOCALES } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, Clock, Tag, User } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import RelatedHubs from '@/components/RelatedHubs';

// /guides/[slug] route: guide articles only (category pages removed until product-ready)
export function generateStaticParams() {
  const slugs = getSlugsBySection('guides');
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  requireValidLocale(locale);

  if (getSlugSection(slug) !== 'guides') return {};
  const article = getArticle(locale, slug);
  if (!article) return {};

  const enUrl = `${DOMAIN}/guides/${slug}`;
  const localeUrl = locale === 'en' ? enUrl : `${DOMAIN}/${locale}/guides/${slug}`;
  const images = article.image ? [article.image] : [DEFAULT_OG_IMAGE];

  if (article.isFallback) {
    return {
      title: article.title,
      description: article.summary,
      robots: { index: false, follow: true },
      alternates: { canonical: enUrl },
    };
  }

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: localeUrl,
      languages: Object.fromEntries([
        ['en', enUrl],
        ...getTranslatedLocales(slug).map((l) => [l, `${DOMAIN}/${l}/guides/${slug}`]),
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

export default async function GuidesSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  requireValidLocale(locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'guides' });

  if (getSlugSection(slug) !== 'guides') notFound();
  const article = getArticle(locale, slug);
  if (!article) notFound();

  const tn = await getTranslations({ locale, namespace: 'news' });
  const breadcrumbLd = makeBreadcrumbLd(locale, [
    { name: 'Home', href: '/' },
    { name: t('title'), href: '/guides' },
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
    author: { '@type': 'Organization', name: article.author || SITE_NAME, url: DOMAIN },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: DOMAIN,
      logo: { '@type': 'ImageObject', url: `${DOMAIN}/favicon.svg` },
    },
    mainEntityOfPage: locale === 'en' ? `${DOMAIN}/guides/${slug}` : `${DOMAIN}/${locale}/guides/${slug}`,
    ...(article.tags?.length ? { keywords: article.tags.join(', ') } : {}),
    about: {
      '@type': 'VideoGame',
      name: 'The Duskbloods',
      gamePlatform: 'Nintendo Switch 2',
    },
  };

  const readingTime = Math.max(1, Math.ceil(article.wordCount / 200));
  const pageUrl = locale === 'en' ? `${DOMAIN}/guides/${slug}` : `${DOMAIN}/${locale}/guides/${slug}`;

  const extraLd = [
    ...(article.faq?.length ? [makeFaqPageLd(article.faq)] : []),
    ...(article.listItems?.length
      ? [makeItemListLd({ name: article.title, url: pageUrl, items: article.listItems })]
      : []),
    ...(article.howTo?.steps?.length
      ? [
          makeHowToLd({
            name: article.howTo.name,
            description: article.summary,
            image: article.image || undefined,
            url: pageUrl,
            steps: article.howTo.steps,
          }),
        ]
      : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {extraLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <main className="relative z-10">
        <article className="shell py-10 sm:py-16" itemScope itemType="https://schema.org/Article">
          <Link href="/guides" className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-text transition-colors">
            <ArrowLeft className="h-4 w-4" /> {t('backToHub')}
          </Link>
          {article.isFallback && (
            <div className="mb-6 rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold">
              {tn('fallbackNotice')}
            </div>
          )}
          <header>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span itemProp="author">{article.author || SITE_NAME}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={article.date} itemProp="datePublished">
                  {new Date(article.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </span>
              {article.modified && article.modified !== article.date && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{tn('updatedOn')} <time dateTime={article.modified} itemProp="dateModified">
                    {new Date(article.modified).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time></span>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{tn('readingTime', { min: readingTime })}</span>
              </span>
            </div>
            <h1 className="h-title mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl" itemProp="headline">{article.title}</h1>
            <p className="mt-3 text-body" itemProp="description">{article.summary}</p>
            {article.tags && article.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-muted" />
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">{tag}</span>
                ))}
              </div>
            )}
          </header>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              width={1200}
              height={675}
              className="mt-6 w-full rounded-[var(--radius)] border border-border object-cover"
              itemProp="image"
            />
          )}
          <div className="prose-article mt-8" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: article.content }} />
          <RelatedHubs tags={article.tags} slug={slug} />
        </article>
      </main>
    </>
  );
}
