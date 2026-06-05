import { app } from '@/app';
import { WebsiteImages } from '@/infra/postgres/website-images';
import { deepMocked, expectError, mockAuthMiddleware } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/website-images'));
vi.mock(import('@/infra/r2/upload'));

describe('upload-image', () => {
  mockAuthMiddleware();

  const createMock = deepMocked(WebsiteImages.create);

  function makeRequest(file: File, websiteId = 'websiteId') {
    const form = new FormData();
    form.append('file', file);
    form.append('websiteId', websiteId);
    return { method: 'POST', headers: { Cookie: 'session=sessionId' }, body: form };
  }

  function makeFile(type: string, sizeBytes: number) {
    return new File([new Uint8Array(sizeBytes)], 'image', { type });
  }

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/images/upload', { method: 'POST' });
    // Then
    await expectError(res, 401, 'Unauthorized');
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
    // Given
    const file = makeFile('image/jpeg', 1024);
    createMock.mockResolvedValue({
      id: 'imageId',
      userId: 'userId',
      websiteId: 'websiteId',
      url: 'https://r2.example.com/images/userId/abc123.jpg',
      sizeBytes: 1024,
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
    });
    // When
    const res = await app.request('/images/upload', makeRequest(file));
    // Then
    expect(res.status).toBe(201);
  });
});
