import { app } from '@/app';
import { Sessions } from '@/infra/postgres/sessions';
import { deepMocked, expectJson } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/sessions'));

describe('me', () => {
  it('should return null if no session cookie', async () => {
    // When
    const res = await app.request('/auth/me');
    // Then
    await expectJson(res, 200, { user: null });
  });

  it('should return null if session not found in db', async () => {
    // Given
    vi.mocked(Sessions.getById).mockResolvedValue(null);
    // When
    const res = await app.request('/auth/me', { headers: { Cookie: 'session=sessionId' } });
    // Then
    await expectJson(res, 200, { user: null });
  });

  it('should return user if session is valid', async () => {
    // Given
    const user = {
      id: 'id',
      email: 'email',
      name: 'name',
      picture: 'https://example.com/pic.jpg',
      subscriptionStatus: 'active',
    };
    deepMocked(Sessions.getById).mockResolvedValue({ user });
    // When
    const res = await app.request('/auth/me', { headers: { Cookie: 'session=sessionId' } });
    // Then
    await expectJson(res, 200, { user });
  });
});
