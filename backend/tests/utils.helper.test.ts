import type { DeepPartial } from 'ts-essentials';
import type { MockedFunction } from 'vitest';

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

export function deepMocked<T extends (...args: any[]) => unknown>(fn: T) {
  return vi.mocked(fn) as MockedFunction<(...args: Parameters<T>) => DeepPartial<ReturnType<T>>>;
}
