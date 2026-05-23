import {
  pgTable,
  uuid,
  text,
  numeric,
  integer,
  doublePrecision,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const places = pgTable(
  "places",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceUrl: text("source_url").notNull(),
    placeId: text("place_id"),
    name: text("name"),
    address: text("address"),
    phone: text("phone"),
    website: text("website"),
    category: text("category"),
    rating: numeric("rating", { precision: 2, scale: 1 }),
    ratingCount: integer("rating_count"),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    raw: jsonb("raw"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("places_source_url_idx").on(t.sourceUrl),
    index("places_place_id_idx").on(t.placeId),
  ],
);
