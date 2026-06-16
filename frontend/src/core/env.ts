import { z } from 'zod';

const EnvSchema = z.object({
  VITE_API_URL: z.string().min(1),
});

const parsed = EnvSchema.safeParse(import.meta.env);

if (!parsed.success) {
  // throw new Error("Invalid environment variables", {
  //   error: z.treeifyError(parsed.error),
  // });
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
