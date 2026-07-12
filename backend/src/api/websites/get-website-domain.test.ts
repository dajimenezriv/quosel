import { app } from '@/app';
import { CustomHostnames } from '@/infra/cloudflare/custom-hostnames';
import { Websites } from '@/infra/postgres/websites';
import { GET_AUTH_REQUEST, calls, deepSpyOn, expectError, expectJson, mockAuthMiddleware } from '@/tests/utils.helper.test';

describe('get-website-domain', () => {
  mockAuthMiddleware();

  const getByIdMock = deepSpyOn(Websites, 'getById');
  const getByHostnameMock = deepSpyOn(CustomHostnames, 'getByHostname');

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites/websiteId/domain');
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 404 if website is not found', async () => {
    // Given
    getByIdMock.mockResolvedValue(null);
    // When
    const res = await app.request('/websites/websiteId/domain', GET_AUTH_REQUEST);
    // Then
    await expectError(res, 404, 'Website not found');
  });

  it('should report none while still on the default domain', async () => {
    // Given
    getByIdMock.mockResolvedValue({ id: 'websiteId', slug: 'slug', domain: 'https://slug.quosel.app' });
    // When
    const res = await app.request('/websites/websiteId/domain', GET_AUTH_REQUEST);
    // Then
    await expectJson(res, 200, { host: 'slug.quosel.app', status: 'none' });
    calls(CustomHostnames.getByHostname).toStrictEqual([]);
  });

  it('should report pending when Cloudflare has no record yet', async () => {
    // Given
    getByIdMock.mockResolvedValue({ id: 'websiteId', slug: 'slug', domain: 'https://www.example.com' });
    getByHostnameMock.mockResolvedValue(null);
    // When
    const res = await app.request('/websites/websiteId/domain', GET_AUTH_REQUEST);
    // Then
    await expectJson(res, 200, { host: 'www.example.com', status: 'pending' });
    calls(CustomHostnames.getByHostname).toStrictEqual('www.example.com');
  });

  it('should report active once the hostname and ssl are both active', async () => {
    // Given
    getByIdMock.mockResolvedValue({ id: 'websiteId', slug: 'slug', domain: 'https://www.example.com' });
    getByHostnameMock.mockResolvedValue({ id: 'chId', status: 'active', ssl: { status: 'active' } });
    // When
    const res = await app.request('/websites/websiteId/domain', GET_AUTH_REQUEST);
    // Then
    await expectJson(res, 200, { host: 'www.example.com', status: 'active' });
  });

  it('should report pending while the ssl is still validating', async () => {
    // Given
    getByIdMock.mockResolvedValue({ id: 'websiteId', slug: 'slug', domain: 'https://www.example.com' });
    getByHostnameMock.mockResolvedValue({ id: 'chId', status: 'active', ssl: { status: 'pending_validation' } });
    // When
    const res = await app.request('/websites/websiteId/domain', GET_AUTH_REQUEST);
    // Then
    await expectJson(res, 200, { host: 'www.example.com', status: 'pending' });
  });

  it('should report pending while the hostname ownership is still pending', async () => {
    // Given
    getByIdMock.mockResolvedValue({ id: 'websiteId', slug: 'slug', domain: 'https://www.example.com' });
    getByHostnameMock.mockResolvedValue({ id: 'chId', status: 'pending', ssl: { status: 'active' } });
    // When
    const res = await app.request('/websites/websiteId/domain', GET_AUTH_REQUEST);
    // Then
    await expectJson(res, 200, { host: 'www.example.com', status: 'pending' });
  });
});
