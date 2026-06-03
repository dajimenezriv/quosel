import { app } from '@/app';
import { Sessions } from '@/infra/postgres/sessions';
import { call, calls } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/sessions'));

describe('logout', () => {
  it('should delete cookie', async () => {
    // When
    const res = await app.request('/auth/logout', { method: 'POST' });
    // Then
    expect(res.status).toBe(204);
    expect(res.headers.getSetCookie()).toStrictEqual(['session=; Max-Age=0; Path=/']);
  });

  it('should delete session in db if cookie is set', async () => {
    // When
    const res = await app.request('/auth/logout', {
      method: 'POST',
      headers: { Cookie: 'session=sessionId' },
    });
    // Then
    expect(res.status).toBe(204);
    call(Sessions.deleteById).toBe('sessionId');
  });

  it('should not delete session in db if cookie is not set', async () => {
    // When
    const res = await app.request('/auth/logout', { method: 'POST' });
    // Then
    expect(res.status).toBe(204);
    calls(Sessions.deleteById).toHaveLength(0);
  });
});
