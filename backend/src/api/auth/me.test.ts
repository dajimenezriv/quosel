import { app } from '@/app.ts';
import { Sessions } from '@/infra/postgres/sessions.ts';
import { deepMocked, expectJson } from '@/tests/utils.helper.test.ts';

vi.mock(import('@/infra/postgres/sessions.ts'));

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
    getSessionByIdMock.mockResolvedValue(undefined);
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
      currentPeriodEnd: new Date('2026-06-01T00:00:00.000Z'),
    };
    getSessionByIdMock.mockResolvedValue({ user });
    // When
    const res = await app.request('/auth/me', { headers: { Cookie: 'session=sessionId' } });
    // Then
    await expectJson(res, 200, {
      user: {
        ...user,
        currentPeriodEnd: '2026-06-01T00:00:00.000Z',
      },
    });
  });

  it('should return user with null nullable fields', async () => {
    // Given
    const user = {
      id: 'userId',
      email: 'user@example.com',
      name: null,
      picture: null,
      subscriptionStatus: null,
      currentPeriodEnd: null,
    };
    getSessionByIdMock.mockResolvedValue({ user });
    // When
    const res = await app.request('/auth/me', { headers: { Cookie: 'session=sessionId' } });
    // Then
    await expectJson(res, 200, { user });
  });
});
