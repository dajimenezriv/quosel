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

export interface WebsiteData {
  place: {
    name: string;
    internationalPhoneNumber: string;
    formattedAddress: string;
    rating: number | null;
    userRatingCount: number | null;
  };
  tweakcnThemeKey: string;
  isDarkMode: boolean;
  blocks: Blocks;
}
