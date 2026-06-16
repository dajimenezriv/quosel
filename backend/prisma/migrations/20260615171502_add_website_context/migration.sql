BEGIN;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "subscription_status" SET DEFAULT '',
ALTER COLUMN "subscription_price_id" SET DEFAULT '';

-- AlterTable
ALTER TABLE "websites" ADD COLUMN IF NOT EXISTS "context" TEXT NOT NULL DEFAULT '';

COMMIT;
