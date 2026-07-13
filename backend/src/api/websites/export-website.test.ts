import { app } from '@/app';
import { Websites } from '@/infra/postgres/websites';
import { deepMocked, expectError, GET_AUTH_REQUEST, mockAuthMiddleware } from '@/tests/utils.helper.test';
import { claudeStyles, emptyBlocks } from '@quosel/core/templates';
import { unzipSync } from 'fflate';

vi.mock(import('@/infra/postgres/websites'));

describe('export-website', () => {
  mockAuthMiddleware({ subscriptionStatus: 'active' });

  const getByIdMock = deepMocked(Websites.getById);

  beforeEach(() => {
    getByIdMock.mockResolvedValue({
      id: 'websiteId',
      slug: 'slug',
      domain: 'https://slug.quosel.app',
      blocks: emptyBlocks,
      styles: claudeStyles,
    });
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites/websiteId/export');
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 404 if website is not found', async () => {
    // Given
    getByIdMock.mockResolvedValue(null);
    // When
    const res = await app.request('/websites/websiteId/export', GET_AUTH_REQUEST);
    // Then
    await expectError(res, 404, 'Website not found');
  });

  it('should return a zip with the homepage, the service pages and the seo files', async () => {
    // When
    const res = await app.request('/websites/websiteId/export', GET_AUTH_REQUEST);
    // Then
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('application/zip');
    expect(res.headers.get('Content-Disposition')).toBe('attachment; filename="slug.zip"');

    const zip = unzipSync(new Uint8Array(await res.arrayBuffer()));
    expect(Object.keys(zip)).toStrictEqual(['index.html', 'service.html', 'sitemap.xml', 'robots.txt']);
    expect(new TextDecoder().decode(zip['index.html'])).toContain('<!DOCTYPE html>');
  });
});

describe('export-website without an active subscription', () => {
  mockAuthMiddleware();

  it('should return 403', async () => {
    // When
    const res = await app.request('/websites/websiteId/export', GET_AUTH_REQUEST);
    // Then
    await expectError(res, 403, 'An active subscription is required');
  });
});
