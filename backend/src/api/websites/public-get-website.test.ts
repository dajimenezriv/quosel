import { app } from '@/app';
import { Websites } from '@/infra/postgres/websites';
import { deepMocked, expectError } from '@/tests/utils.helper.test';
import { claudeStyles, emptyBlocks } from '@quosel/core/templates';

vi.mock(import('@/infra/postgres/websites'));

describe('public-get-website', () => {
  it('should return 404 when website is not found', async () => {
    // Given
    vi.mocked(Websites.getByEditToken).mockResolvedValue(null);
    // When
    const res = await app.request('/websites/public/token');
    // Then
    await expectError(res, 404, 'Website not found');
  });

  it('should return 200 with the full website details', async () => {
    // Given
    deepMocked(Websites.getByEditToken).mockResolvedValue({
      id: 'websiteId',
      name: 'name',
      slug: 'slug',
      context: 'context',
      blocks: emptyBlocks,
      styles: claudeStyles,
    });
    // When
    const res = await app.request('/websites/public/token');
    // Then
    expect(res.status).toBe(200);
  });
});
