import { blocksSchema, type Blocks } from '../types';
import { v1ToV2 } from './v1-to-v2';
import { v2ToV3 } from './v2-to-v3';
import { v3ToV4 } from './v3-to-v4';
import { v4ToV5 } from './v4-to-v5';

export const CURRENT_SCHEMA_VERSION = 5;

type Loose = Record<string, unknown>;

const upgraders: Record<number, (raw: Loose) => Loose> = {
  1: v1ToV2,
  2: v2ToV3,
  3: v3ToV4,
  4: v4ToV5,
};

export function migrateBlocks(raw: unknown): Blocks {
  let data = raw as Loose;
  let version = data.schemaVersion as number;

  while (version < CURRENT_SCHEMA_VERSION) {
    const upgrade = upgraders[version];
    if (!upgrade) throw new Error(`No upgrader for blocks schema version ${version}`);
    data = upgrade(data);
    version += 1;
  }

  return blocksSchema.parse(data);
}
