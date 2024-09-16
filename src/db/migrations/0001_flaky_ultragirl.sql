DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_name_unique" UNIQUE("name");