type Loose = Record<string, unknown>;

const defaultHero = { type: 'hero', title: '', text: '', ctaText: '', ctaLink: '', imageUrl: '' };

// v1 stored a flat `blocks` array with the hero as an element. v2 pulls the hero into
// a mandatory `homepage.hero` and keeps the remaining blocks in `homepage.blocks`.
export function v1ToV2(raw: Loose): Loose {
  const list = (Array.isArray(raw.blocks) ? raw.blocks : []) as Loose[];
  const hero = list.find((b) => b.type === 'hero') ?? defaultHero;
  const rest = list.filter((b) => b.type !== 'hero');

  const next: Loose = { ...raw, schemaVersion: 2, homepage: { hero, blocks: rest } };
  delete next.blocks;
  return next;
}
