import z from "zod";

export type Blocks = z.infer<typeof blocksSchema>;
export const blocksSchema = z.object({
  schemaVersion: z.literal(1),
  nav: z.object({
    logo: z.string(),
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
