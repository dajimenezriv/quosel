type Loose = Record<string, unknown>;

// v6 makes the structured business data the source of truth: the visible address line and schedule
// table are now derived from it, so the page and the JSON-LD can never disagree.
//
// The old freeform address was a single string ("40-41 Rathbone Pl, London W1T 1HX, UK"). Splitting
// it reliably is not possible across locales, so it moves into `street` whole: the derived display
// line comes out byte-identical to before, and we emit only the components we actually know rather
// than guessing a locality or postcode. Owners split it properly in the editor.
//
// Opening hours get no such fallback. The old `location.schedule.items` were freeform label/value
// text ("Monday — Friday" / "10:00 — 14:00 · 16:00 — 20:00", "Closed", "By appointment"), and a
// misparsed opening time is worse than none once Google surfaces it. So hours reset to empty and
// the schedule stops rendering until the owner re-enters it. The stale `schedule.items` left behind
// on the location block are dropped by the zod schema, which strips unknown keys.
export function v5ToV6(raw: Loose): Loose {
  return {
    ...raw,
    schemaVersion: 6,
    businessType: 'LocalBusiness',
    address: { street: (raw.address as string | undefined) ?? '', locality: '', region: '', postalCode: '', country: '' },
    geo: { latitude: '', longitude: '' },
    hours: [],
    sameAs: [],
    priceRange: '',
  };
}
