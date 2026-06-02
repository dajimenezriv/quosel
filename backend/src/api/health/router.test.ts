import { app } from '@/app.ts';
import { expectJson } from '@/tests/utils.helper.test.ts';

vi.mock(import('@/infra/postgres/websites.ts'));

describe('router', () => {
  it('should return 200 always', async () => {
    // When
    const res = await app.request('/health');
    // Then
    await expectJson(res, 200, { status: 'ok' });
  });
});
