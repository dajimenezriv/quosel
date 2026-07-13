import { logger } from '@/core/logger';
import { Sessions } from '@/infra/postgres/sessions';
import type { DeepPartial } from 'ts-essentials';
import type { MockedFunction } from 'vitest';

export const loggerFn = vi.fn();
const loggerMock = vi.mocked(logger);
loggerMock.info.mockImplementation(loggerFn);
loggerMock.error.mockImplementation(loggerFn);

export const GET_AUTH_REQUEST = { headers: { Cookie: 'session=sessionId' } };
export const DELETE_AUTH_REQUEST = { method: 'DELETE', headers: { Cookie: 'session=sessionId' } };

export function postRequest(body?: object) {
  return {
    method: 'POST',
    headers: { Cookie: 'session=sessionId', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

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

export function deepSpyOn<T extends object, K extends keyof T>(object: T, method: K) {
  return vi.spyOn(object, method as any) as unknown as T[K] extends (...args: any[]) => unknown
    ? MockedFunction<(...args: Parameters<T[K]>) => DeepPartial<ReturnType<T[K]>>>
    : never;
}

export function mockAuthMiddleware(user?: object) {
  beforeEach(() => {
    vi.spyOn(Sessions, 'getById').mockResolvedValue({ user: { id: 'userId', ...user } } as any);
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
