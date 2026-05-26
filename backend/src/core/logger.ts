/* eslint-disable no-console */
import { inspect } from 'node:util';

type LogData = {
  [key: string]: unknown;
};
type LogError = LogData & {
  error: unknown;
};

function format(data: LogData) {
  return inspect(data, {
    depth: Infinity,
    colors: true,
    breakLength: Infinity,
  });
}

export const logger = {
  info(msg: string, data?: LogData) {
    console.info(format({ level: 'info', msg, ...data }));
  },
  error(msg: string, data?: LogError) {
    console.error(format({ level: 'error', msg, ...data }));
  },
};
