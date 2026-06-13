BEGIN;

-- AlterTable
ALTER TABLE "websites" ADD COLUMN "slug" TEXT;

-- Backfill existing rows with their id, which is already unique and URL-safe
UPDATE "websites" SET "slug" = "id" WHERE "slug" IS NULL;

-- Enforce NOT NULL now that every row has a value
ALTER TABLE "websites" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "websites_slug_key" ON "websites"("slug");

COMMIT;
