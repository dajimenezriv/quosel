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
  background: z.string(),
  foreground: z.string(),
  card: z.string(),
  'card-foreground': z.string(),
  popover: z.string(),
  'popover-foreground': z.string(),
  primary: z.string(),
  'primary-foreground': z.string(),
  secondary: z.string(),
  'secondary-foreground': z.string(),
  muted: z.string(),
  'muted-foreground': z.string(),
  accent: z.string(),
  'accent-foreground': z.string(),
  border: z.string(),
  ring: z.string(),
});

export interface WebsiteData {
  blocks: Blocks;
  styles: Styles;
}
