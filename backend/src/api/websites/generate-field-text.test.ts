import { app } from '@/app';
import { Ai } from '@/infra/ai/ai';
import { calls, expectError, expectJson, mockAuthMiddleware, postRequest } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/ai/ai'));

describe('generate-field-text', () => {
  mockAuthMiddleware();

  beforeEach(() => {
    vi.mocked(Ai.generateFieldText).mockResolvedValue('generated text');
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites/generate-field-text', { method: 'POST' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 400 if body is invalid', async () => {
    // When
    const res = await app.request('/websites/generate-field-text', postRequest({}));
    // Then
    expect(res.status).toBe(400);
  });

  it('should return 200 with the generated text', async () => {
    // When
    const res = await app.request('/websites/generate-field-text', postRequest({ prompt: 'Write a hero title' }));
    // Then
    await expectJson(res, 200, { text: 'generated text' });
    calls(Ai.generateFieldText).toStrictEqual('Write a hero title');
  });
});
