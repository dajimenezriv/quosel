import { z } from 'zod';

export const schema = z.object({
  id: z.string(),
  domain: z.string(),
  template: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  place: z.object({
    name: z.string(),
    shortFormattedAddress: z.string(),
    rating: z.number().nullable(),
    userRatingCount: z.number().nullable(),
    googleMapsPlaceUri: z.string(),
  }),
});

export type Website = z.infer<typeof schema>;
