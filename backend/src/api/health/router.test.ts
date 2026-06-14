import { app } from '@/app';
import { expectJson } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/client'));

describe('router', () => {
  it('should return 200 always', async () => {
    // When
    const res = await app.request('/healthz');
    // Then
    await expectJson(res, 200, { status: 'ok' });
  });
});
