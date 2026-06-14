import { randomBytes } from 'node:crypto';
import { Sessions } from '@/infra/postgres/sessions';
import { decodeIdToken, OAuth2RequestError } from 'arctic';
import type { Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { ApiError } from '../../core/api/errors';
import { env } from '../../core/env';
import { logger } from '../../core/logger';
import { Users } from '../../infra/postgres/users';
import { Resend } from '../../infra/resend/resend';
import { google } from './utils';

const isProd = env.NODE_ENV === 'production';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

type GoogleIdTokenClaims = {
  sub: string;
  email: string;
  name: string | undefined;
  givenName: string | undefined;
  familyName: string | undefined;
  picture: string | undefined;
};

export async function googleCallback(c: Context) {
  const code = c.req.query('code');
  const state = c.req.query('state');
  const storedState = getCookie(c, 'google_state');
  const verifier = getCookie(c, 'google_verifier');

  if (!code || !state || !storedState || !verifier || state !== storedState) {
    throw new ApiError(400, 'Invalid OAuth callback');
  }

  deleteCookie(c, 'google_state', { path: '/' });
  deleteCookie(c, 'google_verifier', { path: '/' });

  let claims: GoogleIdTokenClaims;
  try {
    const tokens = await google.validateAuthorizationCode(code, verifier);
    claims = decodeIdToken(tokens.idToken()) as GoogleIdTokenClaims;
  } catch (error) {
    if (error instanceof OAuth2RequestError) throw new ApiError(400, 'OAuth error');
    throw error;
  }

  const googleId = claims.sub;
  const { user, created } = await Users.createOrUpdate(googleId, {
    email: claims.email,
    name: claims.name ?? '',
    givenName: claims.givenName ?? '',
    familyName: claims.familyName ?? '',
    picture: claims.picture ?? '',
  });

  const userId = user.id;

  if (created) {
    const { error } = await Resend.sendWelcome(user.email, user.givenName);
    if (error) {
      logger.error('Failed to send welcome email', { userId, error });
    }
  }

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
