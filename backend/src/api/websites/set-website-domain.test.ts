import { app } from '@/app';
import { KV } from '@/infra/cloudflare/kv';
import { Websites } from '@/infra/postgres/websites';
import { calls, deepMocked, expectError, mockAuthMiddleware, putRequest } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/websites'));
vi.mock(import('@/infra/cloudflare/kv'));

describe('set-website-domain', () => {
  mockAuthMiddleware();

  const getByIdMock = deepMocked(Websites.getById);

  beforeEach(() => {
    getByIdMock.mockResolvedValue({ id: 'websiteId', slug: 'slug', domain: 'https://slug.quosel.app' });
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites/websiteId/domain', { method: 'PUT' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 400 if the domain is not a valid host', async () => {
    // When
    const res = await app.request('/websites/websiteId/domain', putRequest({ domain: 'not-a-domain' }));
    // Then
    expect(res.status).toBe(400);
  });

  it('should return 400 if the domain is a reserved quosel.app host', async () => {
    // When
    const res = await app.request('/websites/websiteId/domain', putRequest({ domain: 'acme.quosel.app' }));
    // Then
    expect(res.status).toBe(400);
  });

  it('should return 404 if website is not found', async () => {
    // Given
    getByIdMock.mockResolvedValue(null);
    // When
    const res = await app.request('/websites/websiteId/domain', putRequest({ domain: 'example.com' }));
    // Then
    await expectError(res, 404, 'Website not found');
  });

  it('should return 204, store the domain and map the host to the slug in KV', async () => {
    // When
    const res = await app.request('/websites/websiteId/domain', putRequest({ domain: 'example.com' }));
    // Then
    expect(res.status).toBe(204);
    calls(Websites.update).toStrictEqual(['websiteId', { domain: 'https://example.com' }]);
    calls(KV.put).toStrictEqual(['example.com', 'slug']);
    calls(KV.delete).toStrictEqual([]);
  });

  it('should normalize a scheme/path in the input down to the bare host', async () => {
    // When
    const res = await app.request('/websites/websiteId/domain', putRequest({ domain: 'HTTPS://Example.com/foo' }));
    // Then
    expect(res.status).toBe(204);
    calls(Websites.update).toStrictEqual(['websiteId', { domain: 'https://example.com' }]);
    calls(KV.put).toStrictEqual(['example.com', 'slug']);
  });

  it('should drop the previous custom host mapping when the domain changes', async () => {
    // Given
    getByIdMock.mockResolvedValue({ id: 'websiteId', slug: 'slug', domain: 'https://old.com' });
    // When
    const res = await app.request('/websites/websiteId/domain', putRequest({ domain: 'example.com' }));
    // Then
    expect(res.status).toBe(204);
    calls(KV.put).toStrictEqual(['example.com', 'slug']);
    calls(KV.delete).toStrictEqual('old.com');
  });
});
