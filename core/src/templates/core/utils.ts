import type { TemplateData } from '../types';

// Live-typing variant: lowercases, strips accents and invalid chars, but keeps a
// trailing hyphen so the user can type "circolo-" on the way to "circolo-bar".
export function slugifyInput(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '');
}

// Canonical slug: same as the input variant but with the trailing hyphen removed.
export function slugify(value: string) {
  return slugifyInput(value).replace(/-+$/, '');
}

export function getNavLinks(data: TemplateData) {
  const navLinks: Array<{ label: string; url: string }> = [];
  for (const b of data.blocks.blocks) {
    if ('nav' in b) {
      navLinks.push({ label: b.nav, url: `#${slugify(b.nav)}` });
    }
  }
  return navLinks;
}
