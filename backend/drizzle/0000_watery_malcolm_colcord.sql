CREATE TABLE "places" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_url" text NOT NULL,
	"place_id" text,
	"name" text,
	"address" text,
	"phone" text,
	"website" text,
	"category" text,
	"rating" numeric(2, 1),
	"rating_count" integer,
	"latitude" double precision,
	"longitude" double precision,
	"raw" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "places_source_url_idx" ON "places" USING btree ("source_url");--> statement-breakpoint
CREATE INDEX "places_place_id_idx" ON "places" USING btree ("place_id");