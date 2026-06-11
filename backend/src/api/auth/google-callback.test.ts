import { google } from '@/api/auth/utils';
import { app } from '@/app';
import { Sessions } from '@/infra/postgres/sessions';
import { Users } from '@/infra/postgres/users';
import { calls, deepMocked, expectError, loggerFn } from '@/tests/utils.helper.test';
import { decodeIdToken, OAuth2RequestError } from 'arctic';

vi.mock(import('@/api/auth/utils'));
vi.mock(import('@/infra/postgres/users'));
vi.mock(import('@/infra/postgres/sessions'));
vi.mock(import('arctic'));

const VALID_COOKIES = 'google_state=mockState; google_verifier=mockVerifier';
const VALID_QUERY = '/auth/google/callback?code=mockCode&state=mockState';

describe('google-callback', () => {
  const validateAuthorizationCodeMock = deepMocked(google.validateAuthorizationCode);

  beforeEach(() => {
    validateAuthorizationCodeMock.mockResolvedValue({ idToken: () => 'mockIdToken' });
    vi.mocked(decodeIdToken).mockReturnValue({ sub: 'googleSub' });
    deepMocked(Users.createOrUpdate).mockResolvedValue({ id: 'userId' });
  });

  it('should return 400 if code is missing', async () => {
    // When
    const res = await app.request('/auth/google/callback?state=mockState', {
      headers: { Cookie: VALID_COOKIES },
    });
    // Then
    await expectError(res, 400, 'Invalid OAuth callback');
  });

  it('should return 400 if state is missing', async () => {
    // When
    const res = await app.request('/auth/google/callback?code=mockCode', {
      headers: { Cookie: VALID_COOKIES },
    });
    // Then
    await expectError(res, 400, 'Invalid OAuth callback');
  });

  it('should return 400 if state cookie is missing', async () => {
    // When
    const res = await app.request(VALID_QUERY, {
      headers: { Cookie: 'google_verifier=mockVerifier' },
    });
    // Then
    await expectError(res, 400, 'Invalid OAuth callback');
  });

  it('should return 400 if verifier cookie is missing', async () => {
    // When
    const res = await app.request(VALID_QUERY, {
      headers: { Cookie: 'google_state=mockState' },
    });
    // Then
    await expectError(res, 400, 'Invalid OAuth callback');
  });

  it('should return 400 if state does not match stored state', async () => {
    // When
    const res = await app.request('/auth/google/callback?code=mockCode&state=wrongState', {
      headers: { Cookie: VALID_COOKIES },
    });
    // Then
    await expectError(res, 400, 'Invalid OAuth callback');
  });

  it('should return 400 on OAuth2RequestError', async () => {
    // Given
    validateAuthorizationCodeMock.mockRejectedValue(new OAuth2RequestError('bad_request', null, null, null));
    // When
    const res = await app.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    await expectError(res, 400, 'OAuth error');
  });

  it('should return 500 for unknown errors', async () => {
    // Given
    const error = new Error('unexpected');
    validateAuthorizationCodeMock.mockRejectedValue(error);
    // When
    const res = await app.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    await expectError(res, 500, 'Internal Server Error');
    calls(loggerFn).toMatchObject([
      ['Unhandled error', { error }],
      ['Request', { method: 'GET', path: '/auth/google/callback', status: 500 }],
    ]);
  });

  it('should set session cookie and redirect on success', async () => {
    // When
    const res = await app.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    expect(res.status).toBe(302);
    calls(Users.createOrUpdate).toMatchObject(['googleSub', {}]);
    calls(Sessions.create).toMatchObject({ userId: 'userId' });
    expect(res.headers.getSetCookie()).toStrictEqual([
      'google_state=; Max-Age=0; Path=/',
      'google_verifier=; Max-Age=0; Path=/',
      expect.stringMatching(/^session=[^;]+; Path=\/; Expires=.+; HttpOnly; SameSite=Lax$/),
    ]);
  });
});
