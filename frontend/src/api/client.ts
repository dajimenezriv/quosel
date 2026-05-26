import createClient from 'openapi-fetch';
import { env } from '@/core/env';
import type { paths } from './schema';

export const client = createClient<paths>({
  baseUrl: env.VITE_API_URL,
  credentials: 'include',
});
