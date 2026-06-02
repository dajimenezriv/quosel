import { app } from '@/app';
import { expectJson } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/websites'));

describe('router', () => {
  it('should return 200 always', async () => {
    // When
    const res = await app.request('/health');
    // Then
    await expectJson(res, 200, { status: 'ok' });
  });
});
