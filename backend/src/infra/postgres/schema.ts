import { bigint, doublePrecision, index, integer, jsonb, numeric, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { createdAt, foreignKey, id, nullableText, text, updatedAt } from './utils';

export const users = pgTable('users', {
  id: id(),
  googleId: text('google_id').unique(),
  email: text('email'),
  name: text('name'),
  picture: text('picture'),
  stripeCustomerId: nullableText('stripe_customer_id').unique(),
  stripeSubscriptionId: nullableText('stripe_subscription_id').unique(),
  subscriptionStatus: text('subscription_status'),
  subscriptionPriceId: text('subscription_price_id'),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  createdAt: createdAt(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: foreignKey('user_id').references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export const places = pgTable('places', {
  id: id(),
  userId: foreignKey('user_id').references(() => users.id, { onDelete: 'cascade' }),
  googleId: text('google_id').unique(),
  name: text('name'),
  internationalPhoneNumber: text('international_phone_number'),
  formattedAddress: text('formatted_address'),
  shortFormattedAddress: text('short_formatted_address'),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  rating: numeric('rating', { precision: 2, scale: 1 }),
  userRatingCount: integer('user_rating_count'),
  googleMapsPlaceUri: text('google_maps_place_uri'),
  googleMapsReviewsUri: text('google_maps_reviews_uri'),
  googleMapsPhotosUri: text('google_maps_photos_uri'),
  raw: jsonb('raw'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const reviews = pgTable(
  'reviews',
  {
    id: id(),
    placeId: foreignKey('place_id').references(() => places.id, { onDelete: 'cascade' }),
    googleId: text('google_id').unique(),
    rating: numeric('rating', { precision: 2, scale: 1 }).notNull(),
    text: text('text'),
    authorName: text('author_name'),
    authorPhotoUri: text('author_photo_uri'),
    publishTime: timestamp('publish_time', { withTimezone: true }).notNull(),
    googleMapsUri: text('google_maps_uri'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index('reviews_place_id_idx').on(t.placeId)],
);

export const websites = pgTable(
  'websites',
  {
    id: id(),
    userId: foreignKey('user_id').references(() => users.id, { onDelete: 'cascade' }),
    placeId: foreignKey('place_id').references(() => places.id, { onDelete: 'cascade' }),
    domain: text('domain').unique(),
    template: text('template'),
    texts: text('texts').array().notNull().default([]),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index('websites_user_id_idx').on(t.userId)],
);

export const websiteImages = pgTable(
  'website_images',
  {
    id: id(),
    userId: foreignKey('user_id').references(() => users.id, { onDelete: 'cascade' }),
    websiteId: foreignKey('website_id').references(() => websites.id, { onDelete: 'cascade' }),
    url: text('url'),
    sizeBytes: bigint('size_bytes', { mode: 'number' }).notNull(),
    createdAt: createdAt(),
  },
  (t) => [index('website_images_user_id_idx').on(t.userId), index('website_images_website_id_idx').on(t.websiteId)],
);
