import { logger } from '@/core/logger';
import type { UserId } from '@/core/types';
import { prisma } from '@/infra/postgres/client';
import { Sessions } from '@/infra/postgres/sessions';
import type { DeepPartial } from 'ts-essentials';
import type { MockedFunction } from 'vitest';

export const GET_AUTH_REQUEST = { headers: { Cookie: 'session=sessionId' } };
export const POST_AUTH_REQUEST = { method: 'POST', headers: { Cookie: 'session=sessionId' } };

const loggerFn = vi.fn();
const loggerMock = vi.mocked(logger);
loggerMock.info.mockImplementation(loggerFn);
loggerMock.error.mockImplementation(loggerFn);

export function deepMocked<T extends (...args: any[]) => unknown>(fn: T) {
  return vi.mocked(fn) as MockedFunction<(...args: Parameters<T>) => DeepPartial<ReturnType<T>>>;
}

export function mockAuthMiddleware() {
  const getSessionByIdMock = vi.spyOn(Sessions, 'getById');

  beforeEach(() => {
    getSessionByIdMock.mockResolvedValue({ user: { id: 'userId' } } as any);
  });
}

export async function createUser() {
  const user = await prisma.user.create({
    data: {
      googleId: crypto.randomUUID(),
      email: 'sessions@test.com',
      name: '',
      picture: '',
      subscriptionStatus: '',
      subscriptionPriceId: '',
    },
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user.id } });
  });

  return { ...user, userId: user.id as UserId };
}

function getCalls(object: any) {
  return object.mock.calls.map((call: any) => {
    if (call.length === 1) return call[0];
    return call;
  });
}

export function calls(object: any) {
  return expect(getCalls(object));
}

export function call(object: any) {
  const calls = getCalls(object);
  if (calls.length !== 1) throw new Error(`Invalid length in ${object.getMockName()}: ${calls.length} calls`);
  return expect(calls[0]);
}

export async function expectJson(res: Response, code: number, json: object) {
  expect(res.status).toBe(code);
  expect(await res.json()).toStrictEqual(json);
}

export async function expectError(res: Response, code: number, message: string) {
  expect(res.status).toBe(code);
  expect(await res.json()).toStrictEqual({ error: message });
}
