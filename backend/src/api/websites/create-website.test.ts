import { app } from '@/app';
import { Websites } from '@/infra/postgres/websites';
import { calls, deepMocked, expectError, expectJson, mockAuthMiddleware, postRequest } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/websites'));

describe('create-website', () => {
  mockAuthMiddleware();

  beforeEach(() => {
    deepMocked(Websites.create).mockResolvedValue({ id: 'websiteId' });
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites', { method: 'POST' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 400 if body is invalid', async () => {
    // When
    const res = await app.request('/websites', postRequest({}));
    // Then
    expect(res.status).toBe(400);
  });

  it('should return 201 with the created website id', async () => {
    // When
    const res = await app.request('/websites', postRequest({ name: 'Website' }));
    // Then
    await expectJson(res, 201, { id: 'websiteId' });
    calls(Websites.create).toStrictEqual(['userId', 'Website']);
  });
});
