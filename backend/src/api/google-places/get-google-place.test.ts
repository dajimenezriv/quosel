import { barberoBenimacletMock } from './barbero-benimaclet.mock.ts';
import { getGooglePlace } from './get-google-place.ts';

describe('get-google-place', () => {
  const fetchMock = vi.spyOn(globalThis, 'fetch');

  it('should parse the places detail response', async () => {
    // Given
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(barberoBenimacletMock),
    } as Response);
    // When
    await getGooglePlace('ChIJRWnYS1BHYA0RK5rHEosqXcQ');
  });
});
