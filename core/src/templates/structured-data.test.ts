import { circoloPopolareBlocks } from './examples/circolo-popolare';
import { renderHomepageJsonLd, renderServicePageJsonLd } from './structured-data';
import { claudeStyles } from './styles';
import type { Blocks, ServicePage, TemplateData } from './types';

const data: TemplateData = {
  blocks: circoloPopolareBlocks,
  styles: claudeStyles,
  domain: 'https://www.circolopopolare.com',
};

const withBlocks = (overrides: Partial<Blocks>): TemplateData => ({ ...data, blocks: { ...circoloPopolareBlocks, ...overrides } });

const homepage = () => JSON.parse(renderHomepageJsonLd(data));

describe('LocalBusiness node', () => {
  it('uses the configured business subtype rather than the generic LocalBusiness', () => {
    expect(homepage()['@type']).toBe('Restaurant');
    expect(JSON.parse(renderHomepageJsonLd(withBlocks({ businessType: 'HairSalon' })))['@type']).toBe('HairSalon');
  });

  it('identifies the business with a stable @id and url', () => {
    expect(homepage()['@id']).toBe('https://www.circolopopolare.com#business');
    expect(homepage().url).toBe('https://www.circolopopolare.com');
  });

  it('emits the address as PostalAddress components, not a flat string', () => {
    expect(homepage().address).toStrictEqual({
      '@type': 'PostalAddress',
      streetAddress: '40-41 Rathbone Pl',
      addressLocality: 'London',
      postalCode: 'W1T 1HX',
      addressCountry: 'UK',
    });
  });

  it('omits address components that were never filled in', () => {
    expect(homepage().address).not.toHaveProperty('addressRegion');
  });

  it('emits geo coordinates as numbers', () => {
    expect(homepage().geo).toStrictEqual({ '@type': 'GeoCoordinates', latitude: 51.517189, longitude: -0.134513 });
  });

  it('emits one OpeningHoursSpecification per interval, so split shifts survive', () => {
    expect(homepage().openingHoursSpecification).toStrictEqual([
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '14:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '16:00',
        closes: '20:00',
      },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '14:00' },
    ]);
  });

  it('omits closed days entirely rather than inventing an interval for them', () => {
    const days = homepage().openingHoursSpecification.flatMap((spec: { dayOfWeek: string[] }) => spec.dayOfWeek);
    expect(days).not.toContain('Sunday');
  });

  it('links the site to its other profiles with sameAs', () => {
    expect(homepage().sameAs).toStrictEqual(['https://www.instagram.com/circolopopolare', 'https://www.circolopopolare.com']);
  });

  it('carries the price range, phone and image', () => {
    expect(homepage().priceRange).toBe('££');
    expect(homepage().telephone).toBe('+44 20 3893 6800');
    expect(homepage().image).toContain('cdn.sanity.io');
  });
});

describe('incomplete data', () => {
  it('omits geo when a coordinate is blank or non-numeric', () => {
    expect(JSON.parse(renderHomepageJsonLd(withBlocks({ geo: { latitude: '51.5', longitude: '' } })))).not.toHaveProperty('geo');
    expect(JSON.parse(renderHomepageJsonLd(withBlocks({ geo: { latitude: 'north', longitude: 'west' } })))).not.toHaveProperty('geo');
  });

  it('omits address entirely when no component is filled in', () => {
    const blank = { street: '', locality: '', region: '', postalCode: '', country: '' };
    expect(JSON.parse(renderHomepageJsonLd(withBlocks({ address: blank })))).not.toHaveProperty('address');
  });

  it('omits openingHoursSpecification when there are no hours', () => {
    expect(JSON.parse(renderHomepageJsonLd(withBlocks({ hours: [] })))).not.toHaveProperty('openingHoursSpecification');
  });
});

describe('service page graph', () => {
  const page: ServicePage = {
    ...circoloPopolareBlocks.pages[0]!,
    slug: 'private-dining-london',
    h1: 'Private Dining in London',
  };

  const graph = () => JSON.parse(renderServicePageJsonLd(data, page))['@graph'];

  it('describes the business once and references it by @id from the Service', () => {
    const [business, service] = graph();
    expect(business['@type']).toBe('Restaurant');
    expect(service.provider).toStrictEqual({ '@id': 'https://www.circolopopolare.com#business' });
  });

  it('sets areaServed from the locality', () => {
    const [, service] = graph();
    expect(service.areaServed).toStrictEqual({ '@type': 'City', name: 'London' });
  });

  it('still emits a breadcrumb back to the homepage', () => {
    const breadcrumb = graph()[2];
    expect(breadcrumb['@type']).toBe('BreadcrumbList');
    expect(breadcrumb.itemListElement[1].item).toBe('https://www.circolopopolare.com/private-dining-london');
  });

  it('inlines the provider when there is no domain to build an @id from', () => {
    const [, service] = JSON.parse(renderServicePageJsonLd({ ...data, domain: '' }, page))['@graph'];
    expect(service.provider['@type']).toBe('Restaurant');
  });
});
