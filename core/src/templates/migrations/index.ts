import { blocksSchema, type Blocks } from '../types';
import { v1ToV2 } from './v1-to-v2';
import { v2ToV3 } from './v2-to-v3';

export const CURRENT_SCHEMA_VERSION = 3;

type Loose = Record<string, unknown>;

const upgraders: Record<number, (raw: Loose) => Loose> = {
  1: v1ToV2,
  2: v2ToV3,
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
