import { text as drizzleText, timestamp, uuid } from 'drizzle-orm/pg-core';

export function text(name: string) {
  return drizzleText(name).notNull();
}

export function nullableText(name: string) {
  return drizzleText(name);
}

export function id() {
  return uuid('id').primaryKey().defaultRandom();
}

export function foreignKey(name: string) {
  return uuid(name).notNull();
}

export function createdAt() {
  return timestamp('created_at', { withTimezone: true }).notNull().defaultNow();
}

export function updatedAt() {
  return timestamp('updated_at', { withTimezone: true }).notNull().defaultNow();
}
