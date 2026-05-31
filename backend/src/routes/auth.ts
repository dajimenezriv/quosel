import { decodeIdToken, generateCodeVerifier, generateState, OAuth2RequestError } from 'arctic';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { google } from '../auth/google.ts';
import { createSession, deleteSession, validateSession } from '../auth/session.ts';
import { env } from '../core/env.ts';
import { db } from '../infra/postgres/client.ts';
import { users } from '../infra/postgres/schema.ts';

export const authRouter = new Hono();

const isProd = env.NODE_ENV === 'production';
const frontendUrl = env.FRONTEND_URL;

type GoogleIdTokenClaims = {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
};

authRouter.get('/auth/google', (c) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, ['openid', 'email', 'profile']);

  const cookieOpts = {
    httpOnly: true,
    secure: isProd,
    sameSite: 'Lax' as const,
    maxAge: 60 * 10,
    path: '/',
  };
  setCookie(c, 'google_state', state, cookieOpts);
  setCookie(c, 'google_verifier', codeVerifier, cookieOpts);

  return c.redirect(url.toString());
});

authRouter.get('/auth/google/callback', async (c) => {
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
    if (error instanceof OAuth2RequestError) {
      return c.text('OAuth error', 400);
    }
    throw error;
  }

  const existing = await db.select().from(users).where(eq(users.googleId, claims.sub));

  let user = existing[0];

  if (!user) {
    const tmp = await db
      .insert(users)
      .values({
        googleId: claims.sub,
        email: claims.email,
        name: claims.name ?? '',
        picture: claims.picture ?? '',
        subscriptionStatus: '',
        subscriptionPriceId: '',
      })
      .returning();
    user = tmp[0];
  }

  if (!user) return c.text('Failed to create user', 500);

  const session = await createSession(user.id);
  setCookie(c, 'session', session.id, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'Lax',
    expires: session.expiresAt,
    path: '/',
  });

  return c.redirect(frontendUrl);
});

authRouter.post('/auth/logout', async (c) => {
  const id = getCookie(c, 'session');
  if (id) await deleteSession(id);
  deleteCookie(c, 'session', { path: '/' });
  return c.body(null, 204);
});

authRouter.get('/auth/me', async (c) => {
  const id = getCookie(c, 'session');
  if (!id) return c.json({ user: null });
  const row = await validateSession(id);
  if (!row) return c.json({ user: null });
  const { user } = row;
  return c.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      subscriptionStatus: user.subscriptionStatus,
      currentPeriodEnd: user.currentPeriodEnd,
    },
  });
});
