import type { Blocks } from '@quosel/templates';

export const templateBlocks = transformPlaceToBlocks();

export function transformPlaceToBlocks() {
  const blocks: Blocks = {
    schemaVersion: 1,
    nav: {
      ctaLink: '',
      ctaText: '',
      logo: '',
    },
    hero: {
      firstTitle: 'Tu barbero,',
      secondTitle: 'Test',
      ctaText: 'Test',
      ctaLink: '',
      imageUrl:
        'https://cdn.sanity.io/images/aa3sekul/production/d229986a2fe1430dd3ef952a4c294ed56441794d-7243x4831.jpg?w=3072&fit=crop&auto=format',
      phone: '',
      text: 'Test',
    },
  };

  return blocks;
}
