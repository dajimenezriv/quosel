import { logger } from '@/core/logger';
import { Sessions } from '@/infra/postgres/sessions';
import type { DeepPartial } from 'ts-essentials';
import type { MockedFunction } from 'vitest';

export const loggerFn = vi.fn();
const loggerMock = vi.mocked(logger);
loggerMock.info.mockImplementation(loggerFn);
loggerMock.error.mockImplementation(loggerFn);

const COOKIE_HEADERS = { headers: { Cookie: 'session=sessionId' } };
export const GET_AUTH_REQUEST = COOKIE_HEADERS;
export const DELETE_AUTH_REQUEST = { method: 'DELETE', ...COOKIE_HEADERS };

export function putRequest(body?: object) {
  return {
    method: 'PUT',
    headers: { Cookie: 'session=sessionId', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export function deepMocked<T extends (...args: any[]) => unknown>(fn: T) {
  return vi.mocked(fn) as MockedFunction<(...args: Parameters<T>) => DeepPartial<ReturnType<T>>>;
}

export function mockAuthMiddleware() {
  const getSessionByIdMock = vi.spyOn(Sessions, 'getById');

  beforeEach(() => {
    getSessionByIdMock.mockResolvedValue({ user: { id: 'userId' } } as any);
  });
}

export function calls(object: any) {
  const calls = object.mock.calls.map((call: any) => {
    if (call.length === 1) return call[0];
    return call;
  });
  if (calls.length !== 1) return expect(calls);
  return expect(calls[0]);
}

export async function expectJson(res: Response, code: number, json: object) {
  expect(res.status).toBe(code);
  expect(await res.json()).toStrictEqual(json);
}

export async function expectError(res: Response, code: number, message: string) {
  expect(res.status).toBe(code);
  expect(await res.json()).toStrictEqual({ message });
}
