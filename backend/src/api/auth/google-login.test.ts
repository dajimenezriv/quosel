import { call } from '@/tests/utils.helper.test.ts';
import { generateCodeVerifier, generateState } from 'arctic';
import { google } from '../../auth/google.ts';
import { authRouter } from './router.ts';

vi.mock(import('@/auth/google.ts'));
vi.mock(import('@/core/env.ts'));
vi.mock(import('arctic'));

describe('google-login', () => {
  beforeEach(() => {
    vi.mocked(generateState).mockReturnValue('mockState');
    vi.mocked(generateCodeVerifier).mockReturnValue('mockVerifier');
    vi.mocked(google.createAuthorizationURL).mockReturnValue(new URL('https://accounts.google.com/o/oauth2/auth'));
  });

  it('should set cookies and redirect', async () => {
    // When
    const res = await authRouter.request('/auth/google');
    // THen
    expect(res.status).toBe(302);
    expect(res.headers.get('Location')).toBe('https://accounts.google.com/o/oauth2/auth');
    expect(res.headers.getSetCookie()).toStrictEqual([
      'google_state=mockState; Max-Age=600; Path=/; HttpOnly; SameSite=Lax',
      'google_verifier=mockVerifier; Max-Age=600; Path=/; HttpOnly; SameSite=Lax',
    ]);
    call(google.createAuthorizationURL).toStrictEqual(['mockState', 'mockVerifier', ['openid', 'email', 'profile']]);
  });
});
