import { app } from '@/app';
import { Websites } from '@/infra/postgres/websites';
import { deepMocked, expectError, GET_AUTH_REQUEST, mockAuthMiddleware } from '@/tests/utils.helper.test';
import { claudeStyles, emptyBlocks } from '@quosel/core/templates';

vi.mock(import('@/infra/postgres/websites'));

describe('get-website', () => {
  mockAuthMiddleware();

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites/websiteId');
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 404 when website is not found', async () => {
    // Given
    vi.mocked(Websites.getById).mockResolvedValue(null);
    // When
    const res = await app.request('/websites/websiteId', GET_AUTH_REQUEST);
    // Then
    await expectError(res, 404, 'Website not found');
  });

  it('should return 200 with the full website details', async () => {
    // Given
    deepMocked(Websites.getById).mockResolvedValue({
      id: 'websiteId',
      userId: 'userId',
      name: 'name',
      slug: 'slug',
      context: 'context',
      blocks: emptyBlocks,
      styles: claudeStyles,
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z'),
      publishedAt: null,
    });
    // When
    const res = await app.request('/websites/websiteId', GET_AUTH_REQUEST);
    // Then
    expect(res.status).toBe(200);
  });
});
