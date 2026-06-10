import { app } from '@/app';
import { WebsiteImages } from '@/infra/postgres/website-images';
import { Websites } from '@/infra/postgres/websites';
import { deepMocked, expectError, mockAuthMiddleware } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/website-images'));
vi.mock(import('@/infra/postgres/websites'));
vi.mock(import('@/infra/cloudflare/r2'));

describe('upload-image', () => {
  mockAuthMiddleware();

  const file = makeFile('image/jpeg', 1024);

  function makeRequest(file: File, websiteId = 'websiteId') {
    const form = new FormData();
    form.append('file', file);
    form.append('websiteId', websiteId);
    return { method: 'POST', headers: { Cookie: 'session=sessionId' }, body: form };
  }

  function makeFile(type: string, sizeBytes: number) {
    return new File([new Uint8Array(sizeBytes)], 'image', { type });
  }

  beforeEach(() => {
    deepMocked(Websites.getById).mockResolvedValue({ id: 'websiteId', userId: 'userId' });
    vi.mocked(WebsiteImages.getUrl).mockReturnValue('https://asssets.quosel.com/images/userId/image.png');
    deepMocked(WebsiteImages.create).mockResolvedValue({
      id: 'imageId',
      userId: 'userId',
      websiteId: 'websiteId',
      sizeBytes: 1024,
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
    });
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/images/upload', { method: 'POST' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 404 when the website does not exist', async () => {
    // Given
    deepMocked(Websites.getById).mockResolvedValue(null);
    // When
    const res = await app.request('/images/upload', makeRequest(file));
    // Then
    await expectError(res, 404, 'Website not found');
  });

  it('should return 404 when the website belongs to another user', async () => {
    // Given
    deepMocked(Websites.getById).mockResolvedValue({ id: 'websiteId', userId: 'otherUserId' });
    // When
    const res = await app.request('/images/upload', makeRequest(file));
    // Then
    await expectError(res, 404, 'Website not found');
  });

  it('should return 400 when file type is not allowed', async () => {
    // When
    const res = await app.request('/images/upload', makeRequest(makeFile('image/bmp', 100)));
    // Then
    await expectError(res, 400, 'Invalid file type');
  });

  it('should return 400 when file exceeds 5 MB', async () => {
    // When
    const res = await app.request('/images/upload', makeRequest(makeFile('image/jpeg', 5 * 1024 * 1024 + 1)));
    // Then
    await expectError(res, 400, 'File too large (max 5 MB)');
  });

  it('should return 201 with the created image', async () => {
    // When
    const res = await app.request('/images/upload', makeRequest(file));
    // Then
    expect(res.status).toBe(201);
  });

  it('should return 429 when exceeding the rate limit', async () => {
    // When
    for (let i = 0; i < 10; i++) await app.request('/images/upload', makeRequest(file));
    const res = await app.request('/images/upload', makeRequest(file));
    // Then
    await expectError(res, 429, 'Too many requests');
  });
});
