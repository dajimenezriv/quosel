import { google } from '@/api/auth/utils';
import { app } from '@/app';
import { Sessions } from '@/infra/postgres/sessions';
import { Users } from '@/infra/postgres/users';
import { call, calls, deepMocked, expectError } from '@/tests/utils.helper.test';
import { decodeIdToken, OAuth2RequestError } from 'arctic';

vi.mock(import('@/api/auth/utils'));
vi.mock(import('@/infra/postgres/users'));
vi.mock(import('@/infra/postgres/sessions'));
vi.mock(import('@/core/env'));
vi.mock(import('arctic'));

const VALID_COOKIES = 'google_state=mockState; google_verifier=mockVerifier';
const VALID_QUERY = '/auth/google/callback?code=mockCode&state=mockState';

describe('google-callback', () => {
  const validateAuthorizationCodeMock = deepMocked(google.validateAuthorizationCode);
  const getByGoogleIdMock = deepMocked(Users.getByGoogleId);
  const createUserMock = deepMocked(Users.create);

  beforeEach(() => {
    validateAuthorizationCodeMock.mockResolvedValue({ idToken: () => 'mockIdToken' });
    vi.mocked(decodeIdToken).mockReturnValue({ sub: 'googleSub' });
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
    validateAuthorizationCodeMock.mockRejectedValue(new Error('unexpected'));
    // When
    const res = await app.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    await expectError(res, 500, 'Internal Server Error');
  });

  it('should return user if exists', async () => {
    // Given
    getByGoogleIdMock.mockResolvedValue({ id: 'mockExistsId' });
    // When
    const res = await app.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    expect(res.status).toBe(302);
    calls(Users.create).toHaveLength(0);
  });

  it('should create user if not found', async () => {
    // Given
    getByGoogleIdMock.mockResolvedValue(null);
    createUserMock.mockResolvedValue({ id: 'mockCreateId' });
    // When
    const res = await app.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    expect(res.status).toBe(302);
    call(Users.create).toMatchObject({ googleId: 'googleSub' });
  });

  it('should set session cookie and redirect on success', async () => {
    // Given
    getByGoogleIdMock.mockResolvedValue({ id: 'mockExistsId' });
    // When
    const res = await app.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    expect(res.status).toBe(302);
    call(Sessions.create).toMatchObject({ userId: 'mockExistsId' });
    expect(res.headers.getSetCookie()).toStrictEqual([
      'google_state=; Max-Age=0; Path=/',
      'google_verifier=; Max-Age=0; Path=/',
      expect.stringMatching(/^session=[^;]+; Path=\/; Expires=.+; HttpOnly; SameSite=Lax$/),
    ]);
  });
});
