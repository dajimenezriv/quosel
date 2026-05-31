import { call, calls } from '@/tests/utils.ts';
import { generateCodeVerifier, generateState } from 'arctic';
import type { Context } from 'hono';
import { setCookie } from 'hono/cookie';
import { mock } from 'vitest-mock-extended';
import { google } from '../../auth/google.ts';
import { googleLogin } from './google-login.ts';

vi.mock(import('@/auth/google.ts'));
vi.mock(import('@/core/env.ts'));
vi.mock(import('hono/cookie'));
vi.mock(import('arctic'));

describe('google-login', () => {
  const generateStateMock = vi.mocked(generateState);
  const generateCodeVerifierMock = vi.mocked(generateCodeVerifier);
  const createAuthorizationURLMock = vi.mocked(google.createAuthorizationURL);

  const c = mock<Context>();

  beforeEach(() => {
    generateStateMock.mockReturnValue('mockState');
    generateCodeVerifierMock.mockReturnValue('mockVerifier');
    createAuthorizationURLMock.mockReturnValue(new URL('https://accounts.google.com/o/oauth2/auth'));
  });

  const cookieOpts = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax' as const,
    maxAge: 600,
    path: '/',
  };

  it('should work', () => {
    // When
    googleLogin(c);
    // Then
    calls(setCookie).toStrictEqual([
      [c, 'google_state', 'mockState', cookieOpts],
      [c, 'google_verifier', 'mockVerifier', cookieOpts],
    ]);
    call(createAuthorizationURLMock).toStrictEqual(['mockState', 'mockVerifier', ['openid', 'email', 'profile']]);
    call(c.redirect).toStrictEqual('https://accounts.google.com/o/oauth2/auth');
  });
});
