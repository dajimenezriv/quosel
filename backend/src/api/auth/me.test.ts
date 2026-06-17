import { app } from '@/app';
import { Sessions } from '@/infra/postgres/sessions';
import { deepMocked, expectJson } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/sessions'));

describe('me', () => {
  const getSessionByIdMock = deepMocked(Sessions.getById);

  it('should return null if no session cookie', async () => {
    // When
    const res = await app.request('/auth/me');
    // Then
    await expectJson(res, 200, { user: null });
  });

  it('should return null if session not found in db', async () => {
    // Given
    getSessionByIdMock.mockResolvedValue(null);
    // When
    const res = await app.request('/auth/me', { headers: { Cookie: 'session=sessionId' } });
    // Then
    await expectJson(res, 200, { user: null });
  });

  it('should return user if session is valid', async () => {
    // Given
    const user = {
      id: 'userId',
      email: 'user@example.com',
      name: 'Test User',
      picture: 'https://example.com/pic.jpg',
      subscriptionStatus: 'active',
    };
    getSessionByIdMock.mockResolvedValue({ user });
    // When
    const res = await app.request('/auth/me', { headers: { Cookie: 'session=sessionId' } });
    // Then
    await expectJson(res, 200, { user });
  });
});
