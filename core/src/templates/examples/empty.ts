import type { Blocks } from '../types';

export const emptyBlocks: Blocks = {
  schemaVersion: 4,
  name: 'Empty',
  address: '',
  phone: '',
  metaTitle: '',
  metaDescription: '',
  logoUrl: '',
  nav: {
    ctaText: '',
    ctaLink: '',
  },
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
