import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { makeBreadcrumbLd } from '@/lib/page-helpers';
import { requireValidLocale } from '@/lib/require-locale';
import {
  getArticle,
  getArticleMetasByCategory,
  getSlugSection,
  getSlugsBySection,
  getTranslatedLocales,
} from '@/lib/news';
import { isCategorySlug, getCategorySlugs } from '@/lib/guides-categories';
import { DOMAIN, SITE_NAME, DEFAULT_OG_IMAGE, LOCALES } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, Clock, Tag } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import NewsList from '@/components/NewsList';
import RelatedHubs from '@/components/RelatedHubs';

// Shared /guides/[slug] route: category pages + guide articles
const HUB_PROMO_SLUGS = new Set(['maps']);
const PROMO_HREFS: Record<string, string> = { maps: '/maps' };

export function generateStaticParams() {
  const slugs = [...getCategorySlugs(), ...getSlugsBySection('guides')];
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  requireValidLocale(locale);

  if (isCategorySlug(slug)) {
    const t = await getTranslations({ locale, namespace: 'guides' });
    const title = t(`categories.${slug}.title`);
    const desc = t(`categories.${slug}.desc`);
    const enUrl = `${DOMAIN}/guides/${slug}`;
    const localeUrl = locale === 'en' ? enUrl : `${DOMAIN}/${locale}/guides/${slug}`;
    return {
      title: `${title} | The Duskbloods Guides`,
      description: desc,
      alternates: {
        canonical: localeUrl,
        languages: Object.fromEntries([
          ['en', enUrl],
          ...LOCALES.filter((l) => l !== 'en').map((l) => [l, `${DOMAIN}/${l}/guides/${slug}`]),
          ['x-default', enUrl],
        ]),
      },
      openGraph: {
        type: 'website',
        title: `${title} | The Duskbloods Guides`,
        description: desc,
        url: localeUrl,
        siteName: SITE_NAME,
      },
    };
  }

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

  // --- Category page ---
  if (isCategorySlug(slug)) {
    const title = t(`categories.${slug}.title`);
    const articles = getArticleMetasByCategory(locale, slug);
    const breadcrumbLd = makeBreadcrumbLd(locale, [
      { name: 'Home', href: '/' },
      { name: t('title'), href: '/guides' },
      { name: title },
    ]);
    const promoHref = HUB_PROMO_SLUGS.has(slug) ? PROMO_HREFS[slug] : null;

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        <main className="relative z-10">
          <article className="shell py-10 sm:py-16">
            <Link href="/guides" className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-text transition-colors">
              <ArrowLeft className="h-4 w-4" /> {t('backToHub')}
            </Link>
            <header className="mb-8 sm:mb-12">
              <span className="eyebrow">{t('eyebrow')}</span>
              <h1 className="h-title mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">{title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
                {t(`categories.${slug}.desc`)}
              </p>
            </header>
            {promoHref && (
              <Link href={promoHref as never} className="card mb-8 block transition hover:border-gold sm:mb-10">
                <p className="text-xs uppercase tracking-wider text-gold">{t('hubPromo.maps.title')}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t('hubPromo.maps.desc')}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-blood hover:underline underline-offset-4">
                  {t('hubPromo.maps.cta')} →
                </span>
              </Link>
            )}
            <NewsList articles={articles} locale={locale} noArticlesText={t('noCategoryArticles')} />
          </article>
        </main>
      </>
    );
  }

  // --- Article page ---
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
    author: { '@type': 'Organization', name: SITE_NAME },
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="relative z-10">
        <article className="shell py-10 sm:py-16" itemScope itemType="https://schema.org/Article">
          <Link href="/guides" className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-text transition-colors">
            <ArrowLeft className="h-4 w-4" /> {tn('backToList')}
          </Link>
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
          <div className="prose-article mt-8" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: article.content }} />
          <RelatedHubs tags={article.tags} slug={slug} />
        </article>
      </main>
    </>
  );
}
