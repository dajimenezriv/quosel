import type { ExtendedTemplateData, TemplateData } from '../types';

// Live-typing variant: lowercases, strips accents and invalid chars, but keeps a
// trailing hyphen so the user can type "circolo-" on the way to "circolo-bar".
export function slugifyInput(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-/, '');
}

// Canonical slug: same as the input variant but with the trailing hyphen removed.
export function slugify(value: string) {
  return slugifyInput(value).replace(/-$/, '');
}

// Builds a `tel:` href from a display phone number, stripping whitespace so
// spaces don't become %20 (which breaks the dialer).
export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`;
}

export function pageHref(data: ExtendedTemplateData, slug: string) {
  return `${data.canonicalUrl}/${slug}`;
}

export function parseRawData(rawData: TemplateData): ExtendedTemplateData {
  return {
    ...rawData,
    homeUrl: rawData.canonicalUrl,
  };
}
