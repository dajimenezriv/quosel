import { app } from '@/app';
import { calls } from '@/tests/utils.helper.test';
import { generateCodeVerifier, generateState } from 'arctic';
import { google } from './utils';

vi.mock(import('@/api/auth/utils'));
vi.mock(import('arctic'));

describe('google-login', () => {
  beforeEach(() => {
    vi.mocked(generateState).mockReturnValue('mockState');
    vi.mocked(generateCodeVerifier).mockReturnValue('mockVerifier');
    vi.mocked(google.createAuthorizationURL).mockReturnValue(new URL('https://accounts.google.com/o/oauth2/auth'));
  });

  it('should set cookies and redirect', async () => {
    // When
    const res = await app.request('/auth/google');
    // THen
    expect(res.status).toBe(302);
    expect(res.headers.get('Location')).toBe('https://accounts.google.com/o/oauth2/auth');
    expect(res.headers.getSetCookie()).toStrictEqual([
      'google_state=mockState; Max-Age=600; Path=/; HttpOnly; SameSite=Lax',
      'google_verifier=mockVerifier; Max-Age=600; Path=/; HttpOnly; SameSite=Lax',
    ]);
    calls(google.createAuthorizationURL).toStrictEqual(['mockState', 'mockVerifier', ['openid', 'email', 'profile']]);
  });
});
