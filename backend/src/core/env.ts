import 'dotenv/config';
import { z } from '@hono/zod-openapi';
import { logger } from './logger';

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  FRONTEND_URL: z.url().default('http://localhost:5173'),
  GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
  GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1),
  GOOGLE_OAUTH_REDIRECT_URI: z.url(),
  GOOGLE_PLACES_API_KEY: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().int(),
  STRIPE_PRICE_ID: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  R2_ACCOUNT_ID: z.string().min(1),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET_NAME: z.string().min(1),
  R2_PUBLIC_URL: z.url(),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  throw logger.error('Invalid environment variables', { error: z.treeifyError(parsed.error) });
}

export const env = parsed.data;
