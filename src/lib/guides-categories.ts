/** Guides category definitions — tags here match article frontmatter tags.
 *  Display titles/descriptions live in messages under `guides.categories.{slug}`.
 *  Category pages share the /guides/[slug] URL space with articles:
 *  a slug listed here renders as a category page, anything else falls through to articles. */
export interface GuidesCategory {
  slug: string;
  tags: string[];
}

export const GUIDES_CATEGORIES: GuidesCategory[] = [
  { slug: 'tier-lists', tags: ['tier-list', 'characters'] },
  { slug: 'weapons', tags: ['weapons', 'loadout', 'builds'] },
  { slug: 'maps', tags: ['maps'] },
  { slug: 'mechanics', tags: ['gameplay', 'mechanics', 'virtue', 'pvpve', 'tips'] },
  { slug: 'comparisons', tags: ['comparison', 'vs', 'buying', 'preorder'] },
  { slug: 'progression', tags: ['ending', 'trophies', 'patch', 'progression'] },
];

export function getCategorySlugs(): string[] {
  return GUIDES_CATEGORIES.map((c) => c.slug);
}

export function isCategorySlug(slug: string): boolean {
  return GUIDES_CATEGORIES.some((c) => c.slug === slug);
}

export function categoryMatchesTags(categorySlug: string, tags: string[] | undefined): boolean {
  const cat = GUIDES_CATEGORIES.find((c) => c.slug === categorySlug);
  if (!cat || !tags?.length) return false;
  return cat.tags.some((t) => tags.includes(t));
}
