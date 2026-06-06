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
      firstTitle: 'Your italian restaurant,',
      secondTitle: 'Circolo Popolare',
      ctaText: 'Book a Table',
      ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
      imageUrl:
        'https://cdn.sanity.io/images/aa3sekul/production/d229986a2fe1430dd3ef952a4c294ed56441794d-7243x4831.jpg?w=3072&fit=crop&auto=format',
      phone: '',
      text: 'This is Circolo Popolare, our stunning trattoria in the heart of Fitzrovia, where the atmosphere is as warm as the Sicilian sun and food is the love language. Grab a glass of Prosecco and a twisted cocktail, you just landed on the Island of the Sun.',
    },
  };

  return blocks;
}
