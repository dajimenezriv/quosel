import { randomBytes } from 'node:crypto';
import { Sessions } from '@/infra/postgres/sessions.ts';
import { decodeIdToken, OAuth2RequestError } from 'arctic';
import type { Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { google } from '../../auth/google.ts';
import { env } from '../../core/env.ts';
import { Users } from '../../infra/postgres/users.ts';

const isProd = env.NODE_ENV === 'production';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

type GoogleIdTokenClaims = {
  sub: string;
  email: string;
  name: string | undefined;
  picture: string | undefined;
};

export async function googleCallback(c: Context) {
  const code = c.req.query('code');
  const state = c.req.query('state');
  const storedState = getCookie(c, 'google_state');
  const verifier = getCookie(c, 'google_verifier');

  if (!code || !state || !storedState || !verifier || state !== storedState) {
    return c.text('Invalid OAuth callback', 400);
  }

  deleteCookie(c, 'google_state', { path: '/' });
  deleteCookie(c, 'google_verifier', { path: '/' });

  let claims: GoogleIdTokenClaims;
  try {
    const tokens = await google.validateAuthorizationCode(code, verifier);
    claims = decodeIdToken(tokens.idToken()) as GoogleIdTokenClaims;
  } catch (error) {
    if (error instanceof OAuth2RequestError) return c.text('OAuth error', 400);
    throw error;
  }

  const googleId = claims.sub;
  let user = await Users.getUserByGoogleId(googleId);

  if (!user) user = await Users.createUser({ ...claims, googleId });

  if (!user) return c.text('Failed to create user', 500);

  const userId = user.id;
  const sessionId = randomBytes(20).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await Sessions.create({ id: sessionId, expiresAt, userId });

  setCookie(c, 'session', sessionId, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'Lax',
    expires: expiresAt,
    path: '/',
  });

  return c.redirect(env.FRONTEND_URL);
}
