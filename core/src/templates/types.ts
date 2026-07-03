import z from 'zod';

export type HeroBlock = z.infer<typeof heroBlockSchema>;
const heroBlockSchema = z.object({
  type: z.literal('hero'),
  title: z.string().default(''),
  text: z.string(),
  ctaText: z.string(),
  ctaLink: z.string(),
  imageUrl: z.string(),
  imageAlt: z.string().default(''),
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
  imageAlt: z.string().default(''),
});

export type CtaBlock = z.infer<typeof ctaBlockSchema>;
const ctaBlockSchema = z.object({
  type: z.literal('cta'),
  title: z.string(),
  text: z.string(),
  ctaText: z.string(),
  ctaLink: z.string(),
  imageUrl: z.string(),
  imageAlt: z.string().default(''),
});

export type GalleryBlock = z.infer<typeof galleryBlockSchema>;
const galleryBlockSchema = z.object({
  type: z.literal('gallery'),
  nav: z.string(),
  title: z.string(),
  text: z.string(),
  images: z.array(
    z.object({
      url: z.string(),
      alt: z.string().default(''),
    }),
  ),
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
  details: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .default([]),
  schedule: z
    .object({
      title: z.string(),
      items: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      ),
    })
    .default({ title: '', items: [] }),
  mapUrl: z.string().default(''),
  ctaText: z.string(),
  ctaLink: z.string(),
});

export type FooterBlock = z.infer<typeof footerBlockSchema>;
const footerBlockSchema = z.object({
  type: z.literal('footer'),
  description: z.string(),
  navigateTitle: z.string().default('Navigate'),
  contactTitle: z.string().default('Contact'),
  linksTitle: z.string().default('Booking & Social'),
  links: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    }),
  ),
  legalLinks: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    }),
  ),
});

export type Homepage = z.infer<typeof homepageSchema>;
const homepageSchema = z.object({
  hero: heroBlockSchema,
  blocks: z.array(
    z.union([
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

export type Blocks = z.infer<typeof blocksSchema>;
export const blocksSchema = z.object({
  schemaVersion: z.literal(4),
  name: z.string(),
  address: z.string().default(''),
  phone: z.string().default(''),
  metaTitle: z.string().default(''),
  metaDescription: z.string().default(''),
  logoUrl: z.string().default(''),
  nav: z.object({
    ctaText: z.string(),
    ctaLink: z.string(),
  }),
  footer: footerBlockSchema,
  homepage: homepageSchema,
});

export type Styles = z.infer<typeof stylesSchema>;
export const stylesSchema = z.object({
  background: z.string(),
  foreground: z.string(),
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

export interface TemplateData {
  blocks: Blocks;
  styles: Styles;
  canonicalUrl: string;
}
