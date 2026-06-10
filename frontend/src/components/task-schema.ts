import { z } from 'zod';

export const schema = z.object({
  id: z.string(),
  domain: z.string().nullable(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Website = z.infer<typeof schema>;
