import { Sessions } from '@/infra/postgres/sessions.ts';
import { call, calls } from '@/tests/utils.ts';
import { authRouter } from './router.ts';

vi.mock(import('@/infra/postgres/sessions.ts'));

describe('logout', () => {
  it('should work', async () => {
    // When
    const res = await authRouter.request('/auth/logout', { method: 'POST' });
    // Then
    expect(res.status).toBe(204);
    expect(res.headers.getSetCookie()).toStrictEqual(['session=; Max-Age=0; Path=/']);
  });

  it('should delete session in db if cookie is set', async () => {
    // When
    await authRouter.request('/auth/logout', { method: 'POST', headers: { Cookie: 'session=sessionId' } });
    // Then
    call(Sessions.deleteById).toBe('sessionId');
  });

  it('should not delete session in db if cookie is not set', async () => {
    // When
    await authRouter.request('/auth/logout', { method: 'POST' });
    // Then
    calls(Sessions.deleteById).toHaveLength(0);
  });
});
