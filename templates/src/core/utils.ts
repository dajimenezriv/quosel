import type { WebsiteData } from '../types';

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getNavLinks(data: WebsiteData) {
  const navLinks: Array<{ label: string; url: string }> = [];
  for (const b of data.blocks.blocks) {
    if ('nav' in b) {
      navLinks.push({ label: b.nav, url: `#${slugify(b.nav)}` });
    }
  }
  return navLinks;
}
