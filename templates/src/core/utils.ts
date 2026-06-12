import type { WebsiteData } from '../types';

export function getNavLinks(data: WebsiteData) {
  const navLinks: Array<{ label: string; url: string }> = [];
  for (const b of data.blocks.blocks) {
    if ('nav' in b) {
      navLinks.push({ label: b.nav, url: `#${b.nav}` });
    }
  }
  return navLinks;
}
