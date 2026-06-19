import { app } from '@/app';
import { Websites } from '@/infra/postgres/websites';
import { calls, deepMocked, expectError, mockAuthMiddleware, putRequest } from '@/tests/utils.helper.test';
import { claudeStyles, emptyBlocks } from '@quosel/core/templates';

vi.mock(import('@/infra/postgres/websites'));

const VALID_BODY = {
  name: 'name',
  context: 'context',
  blocks: emptyBlocks,
  styles: claudeStyles,
};

describe('update-website', () => {
  mockAuthMiddleware();

  beforeEach(() => {
    deepMocked(Websites.getByEditToken).mockResolvedValue({ id: 'websiteId' });
  });

  it('should return 400 if body is invalid', async () => {
    // When
    const res = await app.request('/websites/public/token', putRequest({}));
    // Then
    expect(res.status).toBe(400);
  });

  it('should return 404 if website is not found', async () => {
    // Given
    vi.mocked(Websites.getByEditToken).mockResolvedValue(null);
    // When
    const res = await app.request('/websites/public/token', putRequest(VALID_BODY));
    // Then
    await expectError(res, 404, 'Website not found');
  });

  it('should not update if it is demo website', async () => {
    // Given
    deepMocked(Websites.getByEditToken).mockResolvedValue({ id: '9acafda9-c93c-4a78-9351-44b0367cc4c9' });
    // When
    const res = await app.request('/websites/public/token', putRequest(VALID_BODY));
    // Then
    expect(res.status).toBe(204);
    calls(Websites.update).toStrictEqual([]);
  });

  it('should return 204 on success', async () => {
    // When
    const res = await app.request('/websites/public/token', putRequest(VALID_BODY));
    // Then
    expect(res.status).toBe(204);
    calls(Websites.update).toStrictEqual(['websiteId', VALID_BODY]);
  });
});
