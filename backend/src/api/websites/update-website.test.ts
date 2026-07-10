import { app } from '@/app';
import { R2 } from '@/infra/cloudflare/r2';
import { Websites } from '@/infra/postgres/websites';
import { calls, deepMocked, expectError, mockAuthMiddleware, putRequest } from '@/tests/utils.helper.test';
import { claudeStyles, emptyBlocks } from '@quosel/core/templates';

vi.mock(import('@/infra/postgres/websites'));
vi.mock(import('@/infra/cloudflare/r2'));

const VALID_BODY = {
  name: 'name',
  context: 'context',
  blocks: emptyBlocks,
  styles: claudeStyles,
};

describe('update-website', () => {
  mockAuthMiddleware();

  const getByIdMock = deepMocked(Websites.getById);

  beforeEach(() => {
    getByIdMock.mockResolvedValue({ id: 'websiteId', slug: 'slug', domain: 'https://slug.quosel.app' });
    deepMocked(R2.list).mockResolvedValue([]);
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites/websiteId', { method: 'PUT' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 400 if body is invalid', async () => {
    // When
    const res = await app.request('/websites/websiteId', putRequest({}));
    // Then
    expect(res.status).toBe(400);
  });

  it('should return 404 if website is not found', async () => {
    // Given
    getByIdMock.mockResolvedValue(null);
    // When
    const res = await app.request('/websites/websiteId', putRequest(VALID_BODY));
    // Then
    await expectError(res, 404, 'Website not found');
  });

  it('should return 204 on success without publishing', async () => {
    // When
    const res = await app.request('/websites/websiteId', putRequest(VALID_BODY));
    // Then
    expect(res.status).toBe(204);
    calls(Websites.update).toStrictEqual(['websiteId', VALID_BODY]);
    calls(R2.upload).toStrictEqual([]);
  });

  it('should return 204 and upload to R2 when publish is true', async () => {
    // Given
    deepMocked(R2.list).mockResolvedValue(['websites/slug/index.html', 'websites/slug/service.html', 'websites/slug/old-service.html']);
    // When
    const res = await app.request('/websites/websiteId?publish=true', putRequest(VALID_BODY));
    // Then
    expect(res.status).toBe(204);
    calls(Websites.update).toStrictEqual(['websiteId', { ...VALID_BODY, publishedAt: expect.any(Date) }]);
    calls(R2.uploadMany).toStrictEqual([
      { key: 'websites/slug/index.html', file: expect.any(File) },
      { key: 'websites/slug/service.html', file: expect.any(File) },
      { key: 'websites/slug/sitemap.xml', file: expect.any(File) },
      { key: 'websites/slug/robots.txt', file: expect.any(File) },
    ]);
    calls(R2.deleteMany).toStrictEqual(['websites/slug/old-service.html']);
  });
});
