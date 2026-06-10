import { app } from '@/app';
import { Websites } from '@/infra/postgres/websites';
import { R2 } from '@/infra/r2/r2';
import { calls, deepMocked, expectError, loggerFn, mockAuthMiddleware, putRequest } from '@/tests/utils.helper.test';
import { circoloPopolareBlocks, claudeStyles } from '@quosel/templates';

vi.mock(import('@/infra/postgres/websites'));
vi.mock(import('@/infra/r2/r2'));

const VALID_BODY = { blocks: circoloPopolareBlocks, styles: claudeStyles };

describe('update-website', () => {
  mockAuthMiddleware();

  const getByIdMock = deepMocked(Websites.getById);

  beforeEach(() => {
    getByIdMock.mockResolvedValue({ id: 'websiteId' });
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
    calls(R2.upload).toStrictEqual([]);
  });

  it('should return 204 and upload to R2 when publish is true', async () => {
    // When
    const res = await app.request('/websites/websiteId?publish=true', putRequest(VALID_BODY));
    // Then
    expect(res.status).toBe(204);
    calls(R2.upload).toStrictEqual(['websites/websiteId.html', expect.any(File)]);
  });
});
