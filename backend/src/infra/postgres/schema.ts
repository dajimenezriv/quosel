import { doublePrecision, index, integer, jsonb, numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  googleId: text('google_id').notNull().unique(),
  email: text('email').notNull(),
  name: text('name'),
  picture: text('picture'),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  subscriptionStatus: text('subscription_status'),
  subscriptionPriceId: text('subscription_price_id'),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export const places = pgTable('places', {
  id: uuid('id').primaryKey().defaultRandom(),
  googlePlaceId: text('google_place_id').notNull().unique(),
  displayNameText: text('display_name_text').notNull(),
  displayNameLanguageCode: text('display_name_language_code').notNull(),
  nationalPhoneNumber: text('national_phone_number').notNull(),
  internationalPhoneNumber: text('international_phone_number').notNull(),
  formattedAddress: text('formatted_address').notNull(),
  shortFormattedAddress: text('short_formatted_address').notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  rating: numeric('rating', { precision: 2, scale: 1 }),
  userRatingCount: integer('user_rating_count'),
  googleMapsPlaceUri: text('google_maps_place_uri').notNull(),
  googleMapsReviewsUri: text('google_maps_reviews_uri').notNull(),
  googleMapsPhotosUri: text('google_maps_photos_uri').notNull(),
  raw: jsonb('raw'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    placeId: uuid('place_id')
      .notNull()
      .references(() => places.id, { onDelete: 'cascade' }),
    googleReviewName: text('google_review_name').notNull().unique(),
    rating: numeric('rating', { precision: 2, scale: 1 }).notNull(),
    originalText: text('original_text').notNull(),
    originalTextLanguageCode: text('original_text_language_code').notNull(),
    authorDisplayName: text('author_display_name').notNull(),
    authorPhotoUri: text('author_photo_uri').notNull(),
    publishTime: timestamp('publish_time', { withTimezone: true }).notNull(),
    googleMapsUri: text('google_maps_uri').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('reviews_place_id_idx').on(t.placeId)],
);
