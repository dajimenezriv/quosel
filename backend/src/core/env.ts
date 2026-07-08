import 'dotenv/config';
import { z } from '@hono/zod-openapi';
import { logger } from './logger';

const EnvSchema = z.object({
  CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
  CLOUDFLARE_API_TOKEN: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  DEEPSEEK_API_KEY: z.string().min(1),
  DOMAINS_KV_NAMESPACE_ID: z.string().min(1),
  FRONTEND_URL: z.url(),
  GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
  GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1),
  GOOGLE_OAUTH_REDIRECT_URI: z.url(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().int(),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_BUCKET_NAME: z.string().min(1),
  R2_PUBLIC_URL: z.url(),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  SENTRY_DSN: z.string().min(1),
  STRIPE_PRICE_ID: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error('Invalid environment variables', { error: z.treeifyError(parsed.error) });
  process.exit(1);
}

export const env = parsed.data;
