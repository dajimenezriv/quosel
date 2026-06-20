import { app } from '@/app';
import { calls, deepMocked, expectError, expectJson, mockAuthMiddleware, postRequest } from '@/tests/utils.helper.test';
import { getOrCreateCustomer } from './get-or-create-customer';
import { stripe } from './utils';

vi.mock(import('./get-or-create-customer'));
vi.mock(import('./utils'));

describe('checkout', () => {
  mockAuthMiddleware();

  beforeEach(() => {
    vi.mocked(getOrCreateCustomer).mockResolvedValue('customerId');
    deepMocked(stripe.checkout.sessions.create).mockResolvedValue({ url: 'https://checkout.stripe.com' });
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/billing/checkout', { method: 'POST' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 200 with the checkout url', async () => {
    // When
    const res = await app.request('/billing/checkout', postRequest());
    // Then
    await expectJson(res, 200, { url: 'https://checkout.stripe.com' });
    calls(getOrCreateCustomer).toStrictEqual('userId');
  });

  it('should return 500 when the session has no url', async () => {
    // Given
    deepMocked(stripe.checkout.sessions.create).mockResolvedValue({});
    // When
    const res = await app.request('/billing/checkout', postRequest());
    // Then
    await expectError(res, 500, 'No session url');
  });

  it('should return 429 when exceeding the rate limit', async () => {
    // When
    for (let i = 0; i < 10; i++) await app.request('/billing/checkout', postRequest());
    const res = await app.request('/billing/checkout', postRequest());
    // Then
    await expectError(res, 429, 'Too many requests');
  });
});
