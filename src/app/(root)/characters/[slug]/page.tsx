import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { CHARACTER_SLUGS, isCharacterSlug } from '@/lib/characters';
import { characterJsonLd, characterMetadata, type CharacterSeo, type CharacterSeoTemplates } from '@/lib/character-seo';
import { buildCharacterFaq } from '@/lib/character-faq';
import { notFound } from 'next/navigation';
import CharacterDetailView from '@/components/views/CharacterDetailView';

export function generateStaticParams() {
  return CHARACTER_SLUGS.map((slug) => ({ slug }));
}

type FullChar = CharacterSeo & {
  bloodArts: { name: string; desc: string }[];
  powers: { name: string; desc: string }[];
  tips: { title: string; desc: string }[];
  playstyle: string[];
};

async function getCharacter(slug: string): Promise<FullChar | null> {
  const t = await getTranslations({ locale: 'en', namespace: 'characters' });
  const roster = t.raw('roster') as { items: FullChar[] };
  return roster.items.find((c) => c.slug === slug) ?? null;
}

async function getTemplates(): Promise<CharacterSeoTemplates> {
  const t = await getTranslations({ locale: 'en', namespace: 'characters' });
  const detail = t.raw('detail') as Record<string, string>;
  return { metaTitle: detail.seoMetaTitle, metaDesc: detail.seoMetaDesc, howToName: detail.seoHowTo };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isCharacterSlug(slug)) return {};
  const char = await getCharacter(slug);
  if (!char) return {};
  const templates = await getTemplates();
  return characterMetadata({ char, locale: 'en', path: `/characters/${slug}`, templates });
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  setRequestLocale('en');
  const { slug } = await params;
  if (!isCharacterSlug(slug)) notFound();
  const char = await getCharacter(slug);
  if (!char) notFound();

  const path = `/characters/${slug}`;
  const t = await getTranslations({ locale: 'en', namespace: 'characters' });
  const detail = t.raw('detail') as Record<string, string>;

  const faq = buildCharacterFaq(char, detail, 'en');
  const templates = { metaTitle: detail.seoMetaTitle, metaDesc: detail.seoMetaDesc, howToName: detail.seoHowTo };

  const ldNodes = characterJsonLd({ char, locale: 'en', path, faq, templates });

  return (
    <>
      {ldNodes.map((node, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }} />
      ))}
      <CharacterDetailView slug={slug} />
    </>
  );
}
