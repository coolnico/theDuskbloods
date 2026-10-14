/** Placeholder fill for localized sentence templates, e.g. "{name} uses {melee}...". */
export function fillTemplate(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match);
}

/** Locale-aware conjunction joining: zh "A和B", ja "AとB", ru "A и B", en "A and B". */
export function joinAnd(locale: string, items: string[]): string {
  try {
    return new Intl.ListFormat(locale, { type: 'conjunction' }).format(items);
  } catch {
    return items.join(' and ');
  }
}

export type FaqChar = {
  name: string;
  role: string;
  tagline: string;
  melee: string;
  ranged: string;
  bloodArts: { name: string }[];
  powers: { name: string }[];
  playstyle: string[];
};

/**
 * Localized FAQ Q/A for a character detail page.
 * Shared by the server (JSON-LD) and the client view so both render identical text.
 * Answer templates live in messages under characters.detail (faqRoleA/faqWeaponsA/faqArtsA);
 * missing keys fall back to the English composition.
 */
export function buildCharacterFaq(
  char: FaqChar,
  detail: Record<string, string>,
  locale: string,
): { q: string; a: string }[] {
  const arts = joinAnd(locale, char.bloodArts.map((b) => b.name));
  const powers = joinAnd(locale, char.powers.map((p) => p.name));
  return [
    {
      q: (detail.faqRoleQ || 'What is {name}’s role in The Duskbloods?').replace('{name}', char.name),
      a: fillTemplate(detail.faqRoleA || '{name} is a {role} Bloodsworn in The Duskbloods. {tagline}', {
        name: char.name,
        role: char.role,
        tagline: char.tagline,
      }),
    },
    {
      q: (detail.faqWeaponsQ || 'What weapons does {name} use?').replace('{name}', char.name),
      a: fillTemplate(detail.faqWeaponsA || '{name} uses {melee} in melee and {ranged} at range.', {
        name: char.name,
        melee: char.melee,
        ranged: char.ranged,
      }),
    },
    {
      q: (detail.faqArtsQ || 'What are {name}’s Blood Arts?').replace('{name}', char.name),
      a: fillTemplate(detail.faqArtsA || '{name}’s Blood Arts are {arts}. Aspects: {powers}.', {
        name: char.name,
        arts,
        powers,
      }),
    },
    {
      q: (detail.faqHowQ || 'How do you play {name}?').replace('{name}', char.name),
      a: char.playstyle[0] || char.tagline,
    },
  ];
}
