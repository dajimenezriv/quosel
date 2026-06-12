import type { Blocks } from '@quosel/templates';

type Block = Blocks['blocks'][number];

export type AddableBlockType = Block['type'];

export const addableBlockTypes: { type: AddableBlockType; label: string }[] = [
  { type: 'hero', label: 'Hero' },
  { type: 'stats', label: 'Stats' },
  { type: 'info', label: 'Info' },
  { type: 'cta', label: 'Call to Action' },
  { type: 'gallery', label: 'Gallery' },
  { type: 'reviews', label: 'Reviews' },
  { type: 'services', label: 'Services' },
  { type: 'location', label: 'Location' },
  { type: 'footer', label: 'Footer' },
];

export function createBlock(type: AddableBlockType): Block {
  switch (type) {
    case 'hero':
      return { type: 'hero', firstTitle: '', secondTitle: '', text: '', ctaText: '', ctaLink: '', phone: '', imageUrl: '' };
    case 'stats':
      return { type: 'stats', stats: [{ value: '', label: '' }] };
    case 'info':
      return { type: 'info', nav: 'Info', title: '', text1: '', text2: '', imageUrl: '' };
    case 'cta':
      return { type: 'cta', title: '', text: '', ctaText: '', ctaLink: '', imageUrl: '' };
    case 'gallery':
      return { type: 'gallery', nav: 'Gallery', title: '', text: '', images: [''], ctaText: '', ctaLink: '' };
    case 'reviews':
      return {
        type: 'reviews',
        nav: 'Reviews',
        title: '',
        stats: [{ value: '', label: '' }],
        reviews: [{ text: '', author: '', source: '', url: '' }],
      };
    case 'services':
      return {
        type: 'services',
        nav: 'Services',
        title: '',
        text: '',
        serviceGroups: [{ title: '', services: [{ title: '', text: '', price: '' }] }],
        ctaText: '',
        ctaLink: '',
      };
    case 'location':
      return { type: 'location', nav: 'Location', title: '', formattedAddress: '', phone: '', ctaText: '', ctaLink: '' };
    case 'footer':
      return {
        type: 'footer',
        description: '',
        phone: '',
        address: '',
        links: [],
        legalLinks: [],
      };
  }
}
