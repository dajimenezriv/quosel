import type { Blocks } from '../types';

export const emptyBlocks: Blocks = {
  schemaVersion: 5,
  name: 'Empty',
  address: '',
  phone: '',
  metaTitle: '',
  metaDescription: '',
  logoUrl: '',
  nav: {
    logoUrl: '',
    ctaText: '',
    ctaLink: '',
  },
  footer: {
    type: 'footer',
    description: '',
    contactTitle: 'Contact',
    linksTitle: 'Booking & Social',
    links: [],
    legalLinks: [],
  },
  homepage: {
    hero: { type: 'hero', title: '', text: '', ctaText: '', ctaLink: '', imageUrl: '', imageAlt: '' },
    blocks: [],
  },
  pages: [
    {
      type: 'service',
      slug: 'service',
      h1: 'Service',
      metaTitle: '',
      metaDescription: '',
      heroImageUrl: '',
      heroImageAlt: '',
      intro: '',
      body: '',
      ctaText: '',
      ctaLink: '',
    },
  ],
};
