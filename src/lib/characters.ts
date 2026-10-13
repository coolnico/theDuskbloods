/** Stable character slugs for routes + sitemap. Keep in sync with messages/roster items. */
export const CHARACTER_SLUGS = [
  'albert',
  'bloodhand-jan',
  'trang-lanh',
  'sniper-layla',
  'senator-samir-patres',
  'zork',
] as const;

export type CharacterSlug = (typeof CHARACTER_SLUGS)[number];

export function isCharacterSlug(value: string): value is CharacterSlug {
  return (CHARACTER_SLUGS as readonly string[]).includes(value);
}
