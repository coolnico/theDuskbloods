import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { CHARACTER_SLUGS, isCharacterSlug } from '@/lib/characters';
import { characterJsonLd, characterMetadata, type CharacterSeo } from '@/lib/character-seo';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isCharacterSlug(slug)) return {};
  const char = await getCharacter(slug);
  if (!char) return {};
  return characterMetadata({ char, locale: 'en', path: `/characters/${slug}` });
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

  const faq = [
    {
      q: (detail.faqRoleQ || 'What is {name}’s role in The Duskbloods?').replace('{name}', char.name),
      a: `${char.name} is a ${char.role.toLowerCase()} Bloodsworn in The Duskbloods. ${char.tagline}`,
    },
    {
      q: (detail.faqWeaponsQ || 'What weapons does {name} use?').replace('{name}', char.name),
      a: `${char.name} uses ${char.melee} in melee and ${char.ranged} at range.`,
    },
    {
      q: (detail.faqArtsQ || 'What are {name}’s Blood Arts?').replace('{name}', char.name),
      a: `${char.name}’s Blood Arts are ${char.bloodArts.map((b) => b.name).join(' and ')}. Aspects: ${char.powers.map((p) => p.name).join(' and ')}.`,
    },
    {
      q: (detail.faqHowQ || 'How do you play {name}?').replace('{name}', char.name),
      a: char.playstyle[0] || char.tagline,
    },
  ];

  const ldNodes = characterJsonLd({ char, locale: 'en', path, faq });

  return (
    <>
      {ldNodes.map((node, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }} />
      ))}
      <CharacterDetailView slug={slug} />
    </>
  );
}
