import { blocksSchema, type Blocks } from '../types';
import { v5ToV6 } from './v5-to-v6';

const CURRENT_SCHEMA_VERSION = 6;

type Loose = Record<string, unknown>;

const upgraders: Record<number, (raw: Loose) => Loose> = {
  5: v5ToV6,
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
