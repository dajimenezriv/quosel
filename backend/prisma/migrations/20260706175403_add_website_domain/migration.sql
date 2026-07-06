BEGIN;

-- AlterTable
ALTER TABLE "websites" ADD COLUMN IF NOT EXISTS "domain" TEXT;

-- Backfill existing rows with the default domain derived from the slug
UPDATE "websites" SET "domain" = 'https://sites.quosel.com/' || "slug" WHERE "domain" IS NULL;

-- Enforce NOT NULL now that existing rows are populated
ALTER TABLE "websites" ALTER COLUMN "domain" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "websites_domain_key" ON "websites"("domain");

COMMIT;
