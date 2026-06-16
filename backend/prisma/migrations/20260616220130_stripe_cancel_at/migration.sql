BEGIN;

-- AlterTable
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "subscription_cancel_at" TIMESTAMPTZ;

COMMIT;
