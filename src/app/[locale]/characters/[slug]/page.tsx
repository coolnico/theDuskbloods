import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { requireValidLocale } from '@/lib/require-locale';
import { isCharacterSlug } from '@/lib/characters';
import { characterJsonLd, characterMetadata, type CharacterSeo, type CharacterSeoTemplates } from '@/lib/character-seo';
import { buildCharacterFaq } from '@/lib/character-faq';
import { notFound } from 'next/navigation';
import CharacterDetailView from '@/components/views/CharacterDetailView';

type FullChar = CharacterSeo & {
  bloodArts: { name: string; desc: string }[];
  powers: { name: string; desc: string }[];
  tips: { title: string; desc: string }[];
  playstyle: string[];
};

async function getCharacter(locale: string, slug: string): Promise<FullChar | null> {
  const t = await getTranslations({ locale, namespace: 'characters' });
  const roster = t.raw('roster') as { items: FullChar[] };
  return roster.items.find((c) => c.slug === slug) ?? null;
}

async function getTemplates(locale: string): Promise<CharacterSeoTemplates> {
  const t = await getTranslations({ locale, namespace: 'characters' });
  const detail = t.raw('detail') as Record<string, string>;
  return { metaTitle: detail.seoMetaTitle, metaDesc: detail.seoMetaDesc, howToName: detail.seoHowTo };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  requireValidLocale(locale);
  if (!isCharacterSlug(slug)) return {};
  const char = await getCharacter(locale, slug);
  if (!char) return {};
  const templates = await getTemplates(locale);
  return characterMetadata({ char, locale, path: `/characters/${slug}`, templates });
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  requireValidLocale(locale);
  if (!isCharacterSlug(slug)) notFound();
  setRequestLocale(locale);
  const char = await getCharacter(locale, slug);
  if (!char) notFound();

  const path = `/characters/${slug}`;
  const t = await getTranslations({ locale, namespace: 'characters' });
  const detail = t.raw('detail') as Record<string, string>;

  const faq = buildCharacterFaq(char, detail, locale);
  const templates = { metaTitle: detail.seoMetaTitle, metaDesc: detail.seoMetaDesc, howToName: detail.seoHowTo };

  const ldNodes = characterJsonLd({ char, locale, path, faq, templates });

  return (
    <>
      {ldNodes.map((node, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }} />
      ))}
      <CharacterDetailView slug={slug} locale={locale} />
    </>
  );
}
