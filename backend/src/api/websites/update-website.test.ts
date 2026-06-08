import { app } from '@/app';
import { Websites } from '@/infra/postgres/websites';
import { R2 } from '@/infra/r2/r2';
import { call, calls, deepMocked, expectError, mockAuthMiddleware, putRequest } from '@/tests/utils.helper.test';
import type { Blocks } from '@quosel/templates';

vi.mock(import('@/infra/postgres/websites'));
vi.mock(import('@/infra/r2/r2'));

const VALID_BLOCKS: Blocks = {
  schemaVersion: 1,
  nav: { ctaText: 'Contact', ctaLink: '#contact' },
  hero: { firstTitle: 'Hello', secondTitle: 'World', text: 'text', ctaText: 'CTA', ctaLink: '#cta', phone: '123', imageUrl: '' },
  aboutUs: { nav: 'About', title: 'About Us', text1: 'text1', text2: 'text2', imageUrl: '' },
  gallery: { nav: 'Gallery', title: 'Gallery', text: 'text', ctaText: 'See more', ctaLink: '#gallery' },
  reviews: { nav: 'Reviews', title: 'Reviews' },
  services: { nav: 'Services', title: 'Services', text: 'text', ctaText: 'Book', ctaLink: '#services' },
  location: { nav: 'Location', title: 'Location', address: '123 Main St', ctaText: 'Directions', ctaLink: '#location' },
};

const VALID_BODY = { blocks: VALID_BLOCKS, styles: {} };

const WEBSITE_MOCK = {
  place: {
    name: 'Test Place',
    formattedAddress: '123 Main St',
  },
};

describe('update-website', () => {
  mockAuthMiddleware();

  const getByIdMock = deepMocked(Websites.getById);
  const uploadMock = vi.mocked(R2.upload);

  beforeEach(() => {
    getByIdMock.mockResolvedValue({ id: 'websiteId', place: WEBSITE_MOCK.place });
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
    calls(uploadMock).toStrictEqual([]);
  });

  it('should return 204 and upload to R2 when publish is true', async () => {
    // When
    const res = await app.request('/websites/websiteId?publish=true', putRequest(VALID_BODY));
    // Then
    expect(res.status).toBe(204);
    call(uploadMock).toStrictEqual(['websites/websiteId/index.html', expect.any(File)]);
  });
});
