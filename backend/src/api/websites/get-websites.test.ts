import { app } from '@/app';
import { Websites } from '@/infra/postgres/websites';
import { deepMocked, expectError, expectJson, GET_AUTH_REQUEST, mockAuthMiddleware } from '@/tests/utils.helper.test';
import { claudeStyles } from '@quosel/templates';

vi.mock(import('@/infra/postgres/websites'));

describe('get-websites', () => {
  mockAuthMiddleware();

  const getAllByUserIdMock = deepMocked(Websites.getAllByUserId);

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites');
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 200 with an empty array when user has no websites', async () => {
    // Given
    getAllByUserIdMock.mockResolvedValue([]);
    // When
    const res = await app.request('/websites', GET_AUTH_REQUEST);
    // Then
    await expectJson(res, 200, { websites: [] });
  });

  it('should return 200 with the list of websites', async () => {
    // Given
    getAllByUserIdMock.mockResolvedValue([
      {
        id: 'websiteId',
        userId: 'userId',
        name: 'name',
        domain: null,
        styles: claudeStyles,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        updatedAt: new Date('2024-01-01T00:00:00.000Z'),
      },
    ]);
    // When
    const res = await app.request('/websites', GET_AUTH_REQUEST);
    // Then
    expect(res.status).toBe(200);
  });
});
