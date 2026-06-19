import { app } from '@/app';
import { Websites } from '@/infra/postgres/websites';
import { calls, deepMocked, expectError, expectJson, mockAuthMiddleware, postRequest } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/websites'));

describe('share-link', () => {
  mockAuthMiddleware();

  beforeEach(() => {
    vi.mocked(Websites.regenerateEditToken).mockResolvedValue('newToken');
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites/websiteId/share-link', { method: 'POST' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 404 if website is not found', async () => {
    // Given
    deepMocked(Websites.getById).mockResolvedValue(null);
    // When
    const res = await app.request('/websites/websiteId/share-link', postRequest());
    // Then
    await expectError(res, 404, 'Website not found');
  });

  it('should return 200 with the rotated token', async () => {
    // Given
    deepMocked(Websites.getById).mockResolvedValue({ id: 'websiteId' });
    // When
    const res = await app.request('/websites/websiteId/share-link', postRequest());
    // Then
    await expectJson(res, 200, { token: 'newToken' });
    calls(Websites.regenerateEditToken).toStrictEqual(['userId', 'websiteId']);
  });
});
