import { WEEKDAYS, type Address, type ExtendedTemplateData, type OpeningHours, type TemplateData } from '../types';

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

// The visible address line, derived from the structured parts so it can never disagree with the
// PostalAddress we emit in JSON-LD. Postcode sits next to the locality ("London W1T 1HX"); every
// other part is comma-separated, and empty parts drop out.
export function formatAddress(address: Address) {
  const cityLine = [address.locality, address.postalCode].filter(Boolean).join(' ');
  return [address.street, cityLine, address.region, address.country].filter(Boolean).join(', ');
}

// Builds a Google Maps search href from an address, so the address doubles as a "get directions" link.
export function addressHref(address: Address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress(address))}`;
}

// "Monday — Friday" for a contiguous run, otherwise "Monday, Thursday". A run of two stays listed
// ("Saturday, Sunday" reads better than "Saturday — Sunday").
export function formatDays(days: OpeningHours['days']) {
  const indexes = days.map((day) => WEEKDAYS.indexOf(day)).sort((a, b) => a - b);
  const first = indexes.at(0);
  const last = indexes.at(-1);
  if (first === undefined || last === undefined) return '';

  // Sorted distinct indexes are contiguous exactly when they span no more slots than they fill.
  const contiguous = last - first === indexes.length - 1;
  if (contiguous && indexes.length > 2) return `${WEEKDAYS[first]} — ${WEEKDAYS[last]}`;

  return indexes.map((i) => WEEKDAYS[i]).join(', ');
}

// "10:00 — 14:00 · 16:00 — 20:00", or the closed label when there are no intervals.
export function formatIntervals(intervals: OpeningHours['intervals'], closedLabel: string) {
  if (intervals.length === 0) return closedLabel;
  return intervals.map((interval) => `${interval.opens} — ${interval.closes}`).join(' · ');
}

export function pageHref(data: ExtendedTemplateData, slug: string) {
  return `${data.domain}/${slug}`;
}

export function parseRawData(rawData: TemplateData): ExtendedTemplateData {
  return {
    ...rawData,
    formattedAddress: formatAddress(rawData.blocks.address),
  };
}
