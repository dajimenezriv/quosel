BEGIN;

-- Add a revocable, high-entropy share token for public (no-login) editor links.
-- Stored as a SHA-256 hash; the raw token only lives in the share URL.
ALTER TABLE "websites" ADD COLUMN "edit_token" TEXT;

-- Backfill existing rows with a unique placeholder. Owners regenerate to get a
-- real shareable link, which rotates this value.
UPDATE "websites" SET "edit_token" = md5("id" || random()::text) WHERE "edit_token" IS NULL;

-- AlterTable
ALTER TABLE "websites" ALTER COLUMN "edit_token" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "websites_edit_token_key" ON "websites"("edit_token");

COMMIT;
