import z from 'zod';

export type Blocks = z.infer<typeof blocksSchema>;
export const blocksSchema = z.object({
  schemaVersion: z.literal(1),
  nav: z.object({
    ctaText: z.string(),
    ctaLink: z.string(),
  }),
  hero: z.object({
    firstTitle: z.string(),
    secondTitle: z.string(),
    text: z.string(),
    ctaText: z.string(),
    ctaLink: z.string(),
    phone: z.string(),
    imageUrl: z.string(),
  }),
  aboutUs: z.object({
    nav: z.string(),
    title: z.string(),
    text1: z.string(),
    text2: z.string(),
    imageUrl: z.string(),
  }),
  gallery: z.object({
    nav: z.string(),
    title: z.string(),
    text: z.string(),
    ctaText: z.string(),
    ctaLink: z.string(),
  }),
  reviews: z.object({
    nav: z.string(),
    title: z.string(),
  }),
  services: z.object({
    nav: z.string(),
    title: z.string(),
    text: z.string(),
    ctaText: z.string(),
    ctaLink: z.string(),
  }),
  location: z.object({
    nav: z.string(),
    title: z.string(),
    address: z.string(),
    ctaText: z.string(),
    ctaLink: z.string(),
  }),
});

export type Styles = z.infer<typeof stylesSchema>;
export const stylesSchema = z.object({
  schemaVersion: z.literal(1),
  background: z.string().default('#262624'),
  foreground: z.string().default('#c3c0b6'),
  card: z.string().default('#262624'),
  'card-foreground': z.string().default('#faf9f5'),
  popover: z.string().default('#30302e'),
  'popover-foreground': z.string().default('#e5e5e2'),
  primary: z.string().default('#d97757'),
  'primary-foreground': z.string().default('#ffffff'),
  secondary: z.string().default('#faf9f5'),
  'secondary-foreground': z.string().default('#30302e'),
  muted: z.string().default('#1b1b19'),
  'muted-foreground': z.string().default('#b7b5a9'),
  accent: z.string().default('#1a1915'),
  'accent-foreground': z.string().default('#f5f4ee'),
  border: z.string().default('#3e3e38'),
  ring: z.string().default('#d97757'),
});

export interface WebsiteData {
  place: {
    name: string;
    internationalPhoneNumber: string;
    formattedAddress: string;
    rating: number | null;
    userRatingCount: number | null;
  };
  blocks: Blocks;
  styles: Styles;
}
