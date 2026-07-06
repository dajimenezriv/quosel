import { app } from '@/app';
import { R2 } from '@/infra/cloudflare/r2';
import { Websites } from '@/infra/postgres/websites';
import { calls, deepMocked, DELETE_AUTH_REQUEST, expectError, mockAuthMiddleware } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/websites'));
vi.mock(import('@/infra/cloudflare/r2'));

describe('delete-website', () => {
  mockAuthMiddleware();

  beforeEach(() => {
    deepMocked(Websites.getById).mockResolvedValue({ userId: 'userId', publishedAt: null });
    deepMocked(R2.list).mockResolvedValue([]);
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites/websiteId', { method: 'DELETE' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 404 if website is not found', async () => {
    // Given
    vi.mocked(Websites.getById).mockResolvedValue(null);
    // When
    const res = await app.request('/websites/websiteId', DELETE_AUTH_REQUEST);
    // Then
    await expectError(res, 404, 'Website not found');
    calls(Websites.delete).toStrictEqual([]);
  });

  it('should return 204 when website is deleted', async () => {
    // When
    const res = await app.request('/websites/websiteId', DELETE_AUTH_REQUEST);
    // Then
    expect(res.status).toBe(204);
    calls(Websites.delete).toStrictEqual(['userId', 'websiteId']);
    calls(R2.deleteMany).toStrictEqual([]);
  });

  it('should return 204 and delete the whole site prefix when website was published', async () => {
    // Given
    deepMocked(Websites.getById).mockResolvedValue({ userId: 'userId', slug: 'websiteSlug', publishedAt: new Date() });
    deepMocked(R2.list).mockResolvedValue(['websites/websiteSlug/index.html', 'websites/websiteSlug/service.html']);
    // When
    const res = await app.request('/websites/websiteId', DELETE_AUTH_REQUEST);
    // Then
    expect(res.status).toBe(204);
    calls(R2.list).toBe('websites/websiteSlug/');
    calls(R2.deleteMany).toStrictEqual(['websites/websiteSlug/index.html', 'websites/websiteSlug/service.html']);
  });
});
