import { app } from '@/app';
import mock from '@/examples/circolo-popolare.json';
import { Websites } from '@/infra/postgres/websites';
import { expectError, expectJson, mockAuthMiddleware, POST_AUTH_REQUEST } from '@/tests/utils.helper.test';

vi.mock(import('@/core/env'));
vi.mock(import('@/infra/postgres/websites'));

const VALID_URL = '/websites/create-from-google-place?googlePlaceId=ChIJK4j9CagbdkgRluwkqYLufoE';

describe('create-from-google-place', () => {
  mockAuthMiddleware();

  const fetchMock = vi.spyOn(globalThis, 'fetch');

  beforeEach(() => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mock),
    } as Response);
    vi.mocked(Websites.create).mockResolvedValue('websiteId');
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites/create-from-google-place', { method: 'POST' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 400 if googlePlaceId is missing', async () => {
    // When
    const res = await app.request('/websites/create-from-google-place', POST_AUTH_REQUEST);
    // Then
    await expectError(res, 400, 'Validation error: Invalid input: expected string, received undefined at "googlePlaceId"');
  });

  it('should return 500 if Google API returns an error', async () => {
    // Given
    fetchMock.mockResolvedValue({
      ok: false,
      status: 503,
      text: () => Promise.resolve('Service Unavailable'),
    } as Response);
    // When
    const res = await app.request(VALID_URL, POST_AUTH_REQUEST);
    // Then
    await expectError(res, 500, 'Cannot obtain place details from Google Maps');
  });

  it('should return 200 and the place id on success', async () => {
    // When
    const res = await app.request(VALID_URL, POST_AUTH_REQUEST);
    // Then
    await expectJson(res, 200, { websiteId: 'websiteId' });
  });
});
