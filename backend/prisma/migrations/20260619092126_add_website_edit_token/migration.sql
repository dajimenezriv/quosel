BEGIN;

-- Add a revocable, high-entropy share token for public (no-login) editor links.
ALTER TABLE "websites" ADD COLUMN "edit_token" TEXT;

-- Backfill existing rows with a unique placeholder.
UPDATE "websites" SET "edit_token" = md5("id" || random()::text) WHERE "edit_token" IS NULL;

-- AlterTable
ALTER TABLE "websites" ALTER COLUMN "edit_token" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "websites_edit_token_key" ON "websites"("edit_token");

COMMIT;
