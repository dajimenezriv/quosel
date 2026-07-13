import type { Address, Geo, OpeningHours, ServicePage, TemplateData } from './types';

type JsonLd = Record<string, unknown>;

// Only the components the owner actually filled in. A half-known address is still valid
// schema.org; a guessed one is not, so we never infer the parts we were not given.
function buildAddress(address: Address): JsonLd | undefined {
  const parts: JsonLd = {
    streetAddress: address.street,
    addressLocality: address.locality,
    addressRegion: address.region,
    postalCode: address.postalCode,
    addressCountry: address.country,
  };

  const filled = Object.entries(parts).filter(([, value]) => value);
  if (filled.length === 0) return undefined;

  return { '@type': 'PostalAddress', ...Object.fromEntries(filled) };
}

function buildGeo(geo: Geo): JsonLd | undefined {
  const latitude = Number(geo.latitude);
  const longitude = Number(geo.longitude);
  if (!geo.latitude || !geo.longitude || !Number.isFinite(latitude) || !Number.isFinite(longitude)) return undefined;

  return { '@type': 'GeoCoordinates', latitude, longitude };
}

// One spec per interval, so a split shift becomes two entries for the same days. Closed days have
// no intervals and drop out entirely: schema.org has no "closed" marker, and absence is exactly how
// a day is read as closed.
function buildOpeningHours(hours: OpeningHours[]): JsonLd[] {
  return hours.flatMap((entry) =>
    entry.intervals.map((interval) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.days,
      opens: interval.opens,
      closes: interval.closes,
    })),
  );
}

export function buildLocalBusiness(data: TemplateData): JsonLd {
  const { blocks, domain } = data;

  const address = buildAddress(blocks.address);
  const geo = buildGeo(blocks.geo);
  const openingHours = buildOpeningHours(blocks.hours);
  const image = blocks.homepage.hero.imageUrl;

  return {
    '@type': blocks.businessType,
    ...(domain && { '@id': `${domain}#business`, url: domain }),
    name: blocks.name,
    ...(image && { image }),
    ...(blocks.phone && { telephone: blocks.phone }),
    ...(address && { address }),
    ...(geo && { geo }),
    ...(openingHours.length > 0 && { openingHoursSpecification: openingHours }),
    ...(blocks.priceRange && { priceRange: blocks.priceRange }),
    ...(blocks.sameAs.length > 0 && { sameAs: blocks.sameAs }),
  };
}

export function renderHomepageJsonLd(data: TemplateData): string {
  return JSON.stringify({ '@context': 'https://schema.org', ...buildLocalBusiness(data) });
}

export function renderServicePageJsonLd(data: TemplateData, page: ServicePage): string {
  const { blocks, domain } = data;
  const business = buildLocalBusiness(data);
  const businessId = business['@id'];
  const { locality } = blocks.address;

  const service: JsonLd = {
    '@type': 'Service',
    name: page.h1,
    ...(page.metaDescription && { description: page.metaDescription }),
    // Point at the business node by @id when we have one, so the graph describes a single entity
    // rather than two copies of it that a crawler has to reconcile.
    provider: businessId ? { '@id': businessId } : business,
    ...(locality && { areaServed: { '@type': 'City', name: locality } }),
  };

  const breadcrumb: JsonLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: blocks.name, item: domain },
      { '@type': 'ListItem', position: 2, name: page.h1, item: domain ? `${domain}/${page.slug}` : '' },
    ],
  };

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [business, service, breadcrumb] });
}
