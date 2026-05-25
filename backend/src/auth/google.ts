import { Google } from 'arctic';
import { env } from '../env.ts';

export const google = new Google(env.GOOGLE_OAUTH_CLIENT_ID, env.GOOGLE_OAUTH_CLIENT_SECRET, env.GOOGLE_OAUTH_REDIRECT_URI);
