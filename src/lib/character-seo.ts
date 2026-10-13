import type { Metadata } from 'next';
import { alternates, DOMAIN, DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo';

export type CharacterSeo = {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  melee: string;
  ranged: string;
  image?: string;
  difficulty?: number;
};

/** Primary role (before slash) keeps titles within SERP length. */
function primaryRole(role: string): string {
  return role.split('/')[0].trim();
}

/** Keyword-rich title; site name is appended by the layout title template. */
export function characterTitle(char: CharacterSeo): string {
  let title = `${char.name} Build Guide — ${primaryRole(char.role)}`;
  // Keep under ~60 chars before the site-name template suffix
  if (title.length > 58) {
    title = `${char.name} Build & Tips — ${primaryRole(char.role)}`;
  }
  return title;
}

function articleFor(role: string): string {
  return /^[aeiou]/i.test(role.trim()) ? 'an' : 'a';
}

/** Description with weapons, role, and game name for SERP + AI answers. */
export function characterDescription(char: CharacterSeo): string {
  const base = `${char.name} is ${articleFor(char.role)} ${char.role.toLowerCase()} Bloodsworn in The Duskbloods, wielding ${char.melee} and ${char.ranged}.`;
  const tag = char.tagline.trim();
  const full = `${base} ${tag}`;
  if (full.length <= 165) return full;

  // Prefer: base sentence + as much tagline as fits in ~155–165 chars
  const room = 165 - base.length - 1;
  if (room >= 40) {
    const tagSlice = tag.slice(0, room);
    const clause = tagSlice.lastIndexOf(' — ');
    const sentence = Math.max(tagSlice.lastIndexOf('. '), tagSlice.lastIndexOf('! '), tagSlice.lastIndexOf('? '));
    const cutAt = sentence > 20 ? sentence + 1 : clause > 20 ? clause : tagSlice.replace(/\s+\S*$/, '').length;
    let tagPart = tagSlice.slice(0, cutAt).trim().replace(/[,;:]$/, '');
    // Don't end on a dangling conjunction
    tagPart = tagPart.replace(/\s+(and|or|but|und|et|y|и|と|と、)$/i, '').replace(/[,;:]$/, '');
    const out = `${base} ${tagPart}`.replace(/\s+/g, ' ').trim();
    return /[.!?…]$/.test(out) ? out : out + '.';
  }

  return base;
}

export function characterMetadata({
  char,
  locale,
  path,
}: {
  char: CharacterSeo;
  locale: string;
  path: string;
}): Metadata {
  const title = characterTitle(char);
  const description = characterDescription(char);
  const images = char.image ? [char.image] : [DEFAULT_OG_IMAGE];
  const alt = alternates(path, locale);

  return {
    title,
    description,
    alternates: alt,
    openGraph: {
      type: 'article',
      title,
      description,
      url: alt.canonical,
      siteName: SITE_NAME,
      images,
      ...(locale !== 'en' ? { locale } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}

/**
 * Structured data stack for GEO/AEO:
 * BreadcrumbList + Article + Person(character) + VideoGame + FAQPage.
 * Entity @ids keep the graph consistent for AI crawlers.
 */
export function characterJsonLd({
  char,
  locale,
  path,
  faq,
}: {
  char: CharacterSeo & {
    bloodArts?: { name: string; desc: string }[];
    powers?: { name: string; desc: string }[];
    tips?: { title: string; desc: string }[];
  };
  locale: string;
  path: string;
  faq?: { q: string; a: string }[];
}) {
  const url = alternates(path, locale).canonical;
  const gameId = `${DOMAIN}/#videogame`;
  const personId = `${url}#character`;
  const articleId = `${url}#article`;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: locale === 'en' ? `${DOMAIN}/` : `${DOMAIN}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Characters', item: locale === 'en' ? `${DOMAIN}/characters` : `${DOMAIN}/${locale}/characters` },
      { '@type': 'ListItem', position: 3, name: char.name, item: url },
    ],
  };

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: char.name,
    alternateName: [char.name, `${char.name} Bloodsworn`, `${char.name} The Duskbloods`],
    description: characterDescription(char),
    jobTitle: char.role,
    image: char.image || undefined,
    url,
    subjectOf: { '@id': articleId },
    // Game-lore role is not a real job; keep as knowsAbout for GEO extractability
    knowsAbout: [
      'The Duskbloods',
      'Bloodsworn',
      char.melee,
      char.ranged,
      ...(char.bloodArts?.map((b) => b.name) ?? []),
      ...(char.powers?.map((p) => p.name) ?? []),
    ],
  };

  const videoGame = {
    '@type': 'VideoGame',
    '@id': gameId,
    name: 'The Duskbloods',
    gamePlatform: 'Nintendo Switch 2',
    publisher: { '@type': 'Organization', name: 'Nintendo' },
    developer: { '@type': 'Organization', name: 'FromSoftware' },
    character: { '@id': personId },
  };

  const article = {
    '@type': 'Article',
    '@id': articleId,
    headline: characterTitle(char),
    description: characterDescription(char),
    image: char.image || undefined,
    datePublished: '2026-10-11',
    dateModified: '2026-10-11',
    inLanguage: locale,
    author: { '@type': 'Organization', name: SITE_NAME, url: DOMAIN },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: DOMAIN },
    mainEntityOfPage: url,
    mainEntity: { '@id': personId },
    about: [{ '@id': personId }, { '@id': gameId }],
  };

  const nodes: unknown[] = [breadcrumb, person, videoGame, article];

  // HowTo: tips as steps — GEO extractable "how to play X"
  if (char.tips && char.tips.length) {
    nodes.push({
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: `How to play ${char.name} in The Duskbloods`,
      description: char.tagline,
      image: char.image || undefined,
      supply: [
        { '@type': 'HowToSupply', name: char.melee },
        { '@type': 'HowToSupply', name: char.ranged },
      ],
      tool: [
        { '@type': 'HowToTool', name: 'Nintendo Switch 2' },
        ...(char.bloodArts?.map((b) => ({ '@type': 'HowToTool' as const, name: b.name })) ?? []),
      ],
      step: char.tips.map((tip, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: tip.title,
        text: tip.desc,
        url: `${url}#tip-${i + 1}`,
      })),
    });
  }

  if (faq && faq.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  return nodes;
}
