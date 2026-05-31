import { google } from '@/auth/google.ts';
import { Sessions } from '@/infra/postgres/sessions.ts';
import { Users } from '@/infra/postgres/users.ts';
import { call, calls, deepMocked } from '@/tests/utils.helper.test.ts';
import { decodeIdToken, OAuth2RequestError } from 'arctic';
import { authRouter } from './router.ts';

vi.mock(import('@/auth/google.ts'));
vi.mock(import('@/infra/postgres/users.ts'));
vi.mock(import('@/infra/postgres/sessions.ts'));
vi.mock(import('@/core/env.ts'));
vi.mock(import('arctic'));

const VALID_COOKIES = 'google_state=mockState; google_verifier=mockVerifier';
const VALID_QUERY = '/auth/google/callback?code=mockCode&state=mockState';

const mockClaims = {
  sub: 'googleSub',
  email: 'user@example.com',
  name: 'User',
  picture: null,
};

describe('google-callback', () => {
  const validateAuthorizationCodeMock = deepMocked(google.validateAuthorizationCode);
  const getUserByGoogleIdMock = deepMocked(Users.getUserByGoogleId);
  const createUserMock = deepMocked(Users.createUser);

  beforeEach(() => {
    validateAuthorizationCodeMock.mockResolvedValue({ idToken: () => 'mockIdToken' });
    vi.mocked(decodeIdToken).mockReturnValue(mockClaims);
  });

  it('should return 400 if code is missing', async () => {
    // When
    const res = await authRouter.request('/auth/google/callback?state=mockState', {
      headers: { Cookie: VALID_COOKIES },
    });
    // Then
    expect(res.status).toBe(400);
    expect(await res.text()).toBe('Invalid OAuth callback');
  });

  it('should return 400 if state is missing', async () => {
    // When
    const res = await authRouter.request('/auth/google/callback?code=mockCode', {
      headers: { Cookie: VALID_COOKIES },
    });
    // Then
    expect(res.status).toBe(400);
    expect(await res.text()).toBe('Invalid OAuth callback');
  });

  it('should return 400 if state cookie is missing', async () => {
    // When
    const res = await authRouter.request(VALID_QUERY, {
      headers: { Cookie: 'google_verifier=mockVerifier' },
    });
    // Then
    expect(res.status).toBe(400);
    expect(await res.text()).toBe('Invalid OAuth callback');
  });

  it('should return 400 if verifier cookie is missing', async () => {
    // When
    const res = await authRouter.request(VALID_QUERY, {
      headers: { Cookie: 'google_state=mockState' },
    });
    // Then
    expect(res.status).toBe(400);
    expect(await res.text()).toBe('Invalid OAuth callback');
  });

  it('should return 400 if state does not match stored state', async () => {
    // When
    const res = await authRouter.request('/auth/google/callback?code=mockCode&state=wrongState', {
      headers: { Cookie: VALID_COOKIES },
    });
    // Then
    expect(res.status).toBe(400);
    expect(await res.text()).toBe('Invalid OAuth callback');
  });

  it('should return 400 on OAuth2RequestError', async () => {
    // Given
    validateAuthorizationCodeMock.mockRejectedValue(new OAuth2RequestError('bad_request', null, null, null));
    // When
    const res = await authRouter.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    expect(res.status).toBe(400);
    expect(await res.text()).toBe('OAuth error');
  });

  it('should return 500 for unknown errors', async () => {
    // Given
    validateAuthorizationCodeMock.mockRejectedValue(new Error('unexpected'));
    // When
    const res = await authRouter.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    expect(res.status).toBe(500);
  });

  it('should return user if exists', async () => {
    // Given
    getUserByGoogleIdMock.mockResolvedValue({ id: 'mockExistsId' });
    // When
    const res = await authRouter.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    expect(res.status).toBe(302);
    calls(Users.createUser).toHaveLength(0);
  });

  it('should create user if not found', async () => {
    // Given
    getUserByGoogleIdMock.mockResolvedValue(undefined);
    createUserMock.mockResolvedValue({ id: 'mockCreateId' });
    // When
    const res = await authRouter.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    expect(res.status).toBe(302);
    call(Users.createUser).toStrictEqual({ ...mockClaims, googleId: 'googleSub' });
  });

  it('should return 500 if user creation fails', async () => {
    // Given
    getUserByGoogleIdMock.mockResolvedValue(undefined);
    createUserMock.mockResolvedValue(undefined);
    // When
    const res = await authRouter.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
    // Then
    expect(res.status).toBe(500);
    expect(await res.text()).toBe('Failed to create user');
  });

  it('should set session cookie and redirect on success', async () => {
    // Given
    getUserByGoogleIdMock.mockResolvedValue({ id: 'mockExistsId' });
    // When
    const res = await authRouter.request(VALID_QUERY, { headers: { Cookie: VALID_COOKIES } });
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
