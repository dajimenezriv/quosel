import z from 'zod';

export type HeroBlock = z.infer<typeof heroBlockSchema>;
const heroBlockSchema = z.object({
  type: z.literal('hero'),
  firstTitle: z.string(),
  secondTitle: z.string(),
  text: z.string(),
  ctaText: z.string(),
  ctaLink: z.string(),
  phone: z.string(),
  imageUrl: z.string(),
});

export type StatsBlock = z.infer<typeof statsBlockSchema>;

const statsBlockSchema = z.object({
  type: z.literal('stats'),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
});

export type InfoBlock = z.infer<typeof infoBlockSchema>;
const infoBlockSchema = z.object({
  type: z.literal('info'),
  nav: z.string(),
  title: z.string(),
  text1: z.string(),
  text2: z.string(),
  imageUrl: z.string(),
});

export type CtaBlock = z.infer<typeof ctaBlockSchema>;
const ctaBlockSchema = z.object({
  type: z.literal('cta'),
  title: z.string(),
  text: z.string(),
  ctaText: z.string(),
  ctaLink: z.string(),
  imageUrl: z.string(),
});

export type GalleryBlock = z.infer<typeof galleryBlockSchema>;
const galleryBlockSchema = z.object({
  type: z.literal('gallery'),
  nav: z.string(),
  title: z.string(),
  text: z.string(),
  images: z.array(z.string()),
  ctaText: z.string(),
  ctaLink: z.string(),
});

export type ReviewsBlock = z.infer<typeof reviewsBlockSchema>;
const reviewsBlockSchema = z.object({
  type: z.literal('reviews'),
  nav: z.string(),
  title: z.string(),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
  reviews: z.array(
    z.object({
      text: z.string(),
      author: z.string(),
      source: z.string(),
      url: z.string(),
    }),
  ),
});

export type ServicesBlock = z.infer<typeof servicesBlockSchema>;
const servicesBlockSchema = z.object({
  type: z.literal('services'),
  nav: z.string(),
  title: z.string(),
  text: z.string(),
  serviceGroups: z.array(
    z.object({
      title: z.string(),
      services: z.array(
        z.object({
          title: z.string(),
          text: z.string(),
          price: z.string(),
        }),
      ),
    }),
  ),
  ctaText: z.string(),
  ctaLink: z.string(),
});

export type LocationBlock = z.infer<typeof locationBlockSchema>;
const locationBlockSchema = z.object({
  type: z.literal('location'),
  nav: z.string(),
  title: z.string(),
  formattedAddress: z.string(),
  phone: z.string().optional(),
  ctaText: z.string(),
  ctaLink: z.string(),
});

export type Blocks = z.infer<typeof blocksSchema>;
export const blocksSchema = z.object({
  schemaVersion: z.literal(1),
  name: z.string(),
  nav: z.object({
    name: z.string(),
    ctaText: z.string(),
    ctaLink: z.string(),
  }),
  blocks: z.array(
    z.union([
      heroBlockSchema,
      statsBlockSchema,
      infoBlockSchema,
      ctaBlockSchema,
      galleryBlockSchema,
      reviewsBlockSchema,
      servicesBlockSchema,
      locationBlockSchema,
    ]),
  ),
});

export type Styles = z.infer<typeof stylesSchema>;
export const stylesSchema = z.object({
  background: z.string(),
  foreground: z.string(),
  'card-foreground': z.string(),
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
