import { google } from '@/api/auth/utils.ts';
import { env } from '@/core/env.ts';
import { generateCodeVerifier, generateState } from 'arctic';
import type { Context } from 'hono';
import { setCookie } from 'hono/cookie';

const isProd = env.NODE_ENV === 'production';

export function googleLogin(c: Context) {
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
}
