import { env } from '@/core/env';
import createClient from 'openapi-fetch';
import type { paths } from './schema';

export const client = createClient<paths>({
  baseUrl: env.VITE_API_URL,
  credentials: 'include',
});
