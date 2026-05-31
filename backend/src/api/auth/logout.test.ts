import { Sessions } from '@/infra/postgres/sessions.ts';
import { call } from '@/tests/utils.ts';
import type { Context } from 'hono';
import { deleteCookie, getCookie } from 'hono/cookie';
import { mock } from 'vitest-mock-extended';
import { logout } from './logout.ts';

vi.mock(import('@/infra/postgres/sessions.ts'));
vi.mock(import('hono/cookie'));

describe('logout', () => {
  const getCookieMock = vi.mocked(getCookie);

  const c = mock<Context>();

  it('should work', async () => {
    // When
    await logout(c);
    // Then
    call(getCookie).toStrictEqual([c, 'session']);
    call(deleteCookie).toStrictEqual([c, 'session', { path: '/' }]);
    call(c.body).toStrictEqual([null, 204]);
  });

  it('should delete session in db if cookie is set', async () => {
    // Given
    getCookieMock.mockReturnValue('sessionId');
    // When
    await logout(c);
    // Then
    call(Sessions.deleteById).toStrictEqual('sessionId');
  });

  it('should not delete session in db if cookie is not set', async () => {
    // When
    await logout(c);
    // Then
    call(deleteCookie).toStrictEqual([c, 'session', { path: '/' }]);
    call(c.body).toStrictEqual([null, 204]);
  });
});
