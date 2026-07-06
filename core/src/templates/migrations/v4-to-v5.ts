type Loose = Record<string, unknown>;

// v5 introduces standalone service/local landing pages alongside the homepage. Existing sites have
// none, so `pages` starts empty; the homepage and every other field are untouched, so v4 sites
// render identically after migration.
export function v4ToV5(raw: Loose): Loose {
  return { ...raw, schemaVersion: 5, pages: [] };
}
