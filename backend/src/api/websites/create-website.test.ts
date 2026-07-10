import { app } from '@/app';
import { Sessions } from '@/infra/postgres/sessions';
import { Websites } from '@/infra/postgres/websites';
import { calls, deepMocked, expectError, expectJson, mockAuthMiddleware, postRequest } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/websites'));

const VALID_BODY = {
  name: 'Website',
  slug: 'website',
};

function mockSubscriptionStatus(subscriptionStatus: string) {
  deepMocked(Sessions.getById).mockResolvedValue({ user: { id: 'userId', subscriptionStatus } });
}

describe('create-website', () => {
  mockAuthMiddleware();

  beforeEach(() => {
    deepMocked(Websites.countByUserId).mockResolvedValue(0);
    deepMocked(Websites.create).mockResolvedValue({ id: 'websiteId' });
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites', { method: 'POST' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 400 if body is invalid', async () => {
    // When
    const res = await app.request('/websites', postRequest({}));
    // Then
    expect(res.status).toBe(400);
  });

  it('should return 201 with the created website id', async () => {
    // When
    const res = await app.request('/websites', postRequest(VALID_BODY));
    // Then
    await expectJson(res, 201, { id: 'websiteId' });
    calls(Websites.create).toStrictEqual(['userId', 'Website', 'website']);
  });

  it('should allow a free user to create their first website', async () => {
    // Given
    mockSubscriptionStatus('');
    deepMocked(Websites.countByUserId).mockResolvedValue(0);
    // When
    const res = await app.request('/websites', postRequest(VALID_BODY));
    // Then
    await expectJson(res, 201, { id: 'websiteId' });
    calls(Websites.create).toStrictEqual(['userId', 'Website', 'website']);
  });

  it('should return 403 if a free user is at the website limit', async () => {
    // Given
    mockSubscriptionStatus('');
    deepMocked(Websites.countByUserId).mockResolvedValue(1);
    // When
    const res = await app.request('/websites', postRequest(VALID_BODY));
    // Then
    await expectError(res, 403, 'Upgrade to create more websites.');
    calls(Websites.create).toStrictEqual([]);
  });

  it('should allow a paid user to create beyond the free limit', async () => {
    // Given
    mockSubscriptionStatus('active');
    deepMocked(Websites.countByUserId).mockResolvedValue(5);
    // When
    const res = await app.request('/websites', postRequest(VALID_BODY));
    // Then
    await expectJson(res, 201, { id: 'websiteId' });
    calls(Websites.create).toStrictEqual(['userId', 'Website', 'website']);
  });

  it('should return 403 if a paid user is at the website limit', async () => {
    // Given
    mockSubscriptionStatus('active');
    deepMocked(Websites.countByUserId).mockResolvedValue(10);
    // When
    const res = await app.request('/websites', postRequest(VALID_BODY));
    // Then
    await expectError(res, 403, 'You cannot create more websites. Contact hello@quosel.com if you need more.');
    calls(Websites.create).toStrictEqual([]);
  });

  it('should return 400 if the slug is reserved', async () => {
    // When
    const res = await app.request('/websites', postRequest({ name: 'Website', slug: 'www' }));
    // Then
    expect(res.status).toBe(400);
    calls(Websites.create).toStrictEqual([]);
  });
});
