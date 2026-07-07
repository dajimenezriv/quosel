import { blocksSchema } from '../types';
import { migrateBlocks } from './index';

const v4Site = {
  schemaVersion: 4,
  name: 'Acme',
  address: '',
  phone: '',
  metaTitle: '',
  metaDescription: '',
  logoUrl: '',
  nav: { ctaText: '', ctaLink: '' },
  footer: {
    type: 'footer',
    description: '',
    navigateTitle: 'Navigate',
    contactTitle: 'Contact',
    linksTitle: 'Booking & Social',
    links: [],
    legalLinks: [],
  },
  homepage: {
    hero: { type: 'hero', title: '', text: '', ctaText: '', ctaLink: '', imageUrl: '', imageAlt: '' },
    blocks: [],
  },
};

describe('v4 -> v5 migration', () => {
  it('upgrades a v4 site to v5 with an empty pages array', () => {
    const migrated = migrateBlocks(v4Site);
    expect(migrated.schemaVersion).toBe(5);
    expect(migrated.pages).toStrictEqual([]);
  });

  it('leaves the homepage untouched', () => {
    const migrated = migrateBlocks(v4Site);
    expect(migrated.homepage).toStrictEqual(v4Site.homepage);
  });

  it('accepts a v5 site carrying a service page', () => {
    const parsed = blocksSchema.parse({
      ...v4Site,
      schemaVersion: 5,
      pages: [{ type: 'service', slug: 'teeth-whitening-barcelona', h1: 'Teeth Whitening in Barcelona' }],
    });
    expect(parsed.pages[0]).toStrictEqual({
      type: 'service',
      slug: 'teeth-whitening-barcelona',
      h1: 'Teeth Whitening in Barcelona',
      metaTitle: '',
      metaDescription: '',
      heroImageUrl: '',
      heroImageAlt: '',
      intro: '',
      body: '',
      ctaText: '',
      ctaLink: '',
    });
  });
});
