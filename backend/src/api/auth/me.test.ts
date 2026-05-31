import { Sessions } from '@/infra/postgres/sessions.ts';
import { deepMocked } from '@/tests/utils.helper.test.ts';
import { authRouter } from './router.ts';

vi.mock(import('@/infra/postgres/sessions.ts'));

describe('me', () => {
  const getSessionByIdMock = deepMocked(Sessions.getById);

  it('should return null if no session cookie', async () => {
    // When
    const res = await authRouter.request('/auth/me');
    // Then
    expect(res.status).toBe(200);
    expect(await res.json()).toStrictEqual({ user: null });
  });

  it('should return null if session not found in db', async () => {
    // Given
    getSessionByIdMock.mockResolvedValue(undefined);
    // When
    const res = await authRouter.request('/auth/me', { headers: { Cookie: 'session=sessionId' } });
    // Then
    expect(res.status).toBe(200);
    expect(await res.json()).toStrictEqual({ user: null });
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
    const res = await authRouter.request('/auth/me', { headers: { Cookie: 'session=sessionId' } });
    // Then
    expect(res.status).toBe(200);
    expect(await res.json()).toStrictEqual({
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
    const res = await authRouter.request('/auth/me', { headers: { Cookie: 'session=sessionId' } });
    // Then
    expect(res.status).toBe(200);
    expect(await res.json()).toStrictEqual({ user });
  });
});
