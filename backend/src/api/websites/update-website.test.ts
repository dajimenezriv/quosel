import { app } from '@/app';
import { R2 } from '@/infra/cloudflare/r2';
import { Websites } from '@/infra/postgres/websites';
import { calls, deepMocked, expectError, putRequest } from '@/tests/utils.helper.test';
import { claudeStyles, emptyBlocks } from '@quosel/templates';

vi.mock(import('@/infra/postgres/websites'));
vi.mock(import('@/infra/cloudflare/r2'));

const VALID_BODY = {
  name: 'name',
  slug: 'slug',
  context: 'context',
  blocks: emptyBlocks,
  styles: claudeStyles,
};

describe('update-website', () => {
  const getByIdMock = deepMocked(Websites.getById);

  beforeEach(() => {
    getByIdMock.mockResolvedValue({ id: 'websiteId', slug: 'slug' });
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
    // When
    const res = await app.request('/websites/websiteId?publish=true', putRequest(VALID_BODY));
    // Then
    expect(res.status).toBe(204);
    calls(Websites.update).toStrictEqual(['websiteId', { ...VALID_BODY, publishedAt: expect.any(Date) }]);
    calls(R2.upload).toStrictEqual(['websites/slug.html', expect.any(File)]);
  });
});
