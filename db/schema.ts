import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);
// Create a pgTable that maps to a table in your DB
export const events = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    name: text("name").unique().notNull(),
    address: text("email"),
    imageURL: text("image"),
    description: text("description"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  }
  //   (events) => {
  //     return {
  //       nameIdx: uniqueIndex("name_idx").on(events.name),
  //     };
  //   }
);

export const eventsRelations = relations(events, ({ many }) => ({
  sections: many(sections),
  artistsToEvents: many(artistsToEvents),
}));

export const sections = pgTable(
  "sections",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    capacity: integer("capacity").notNull(),
    admissions: integer("admissions").default(0),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    description: text("description"),
    eventId: integer("event_id"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  }
  //   (sections) => {
  //     return {
  //       nameIdx: index("name_idx").on(sections.name),
  //     };
  //   }
);

export const sectionsRelations = relations(sections, ({ one }) => ({
  event: one(events, {
    fields: [sections.eventId],
    references: [events.id],
  }),
}));

export const artists = pgTable(
  "artists",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
  }
  //   (artists) => {
  //     return {
  //       nameIdx: index("name_idx").on(artists.name),
  //     };
  //   }
);

export const artistsRelations = relations(artists, ({ many }) => ({
  artistsToEvents: many(artistsToEvents),
}));

export const artistsToEvents = pgTable("artistsToEvents", {
  eventId: integer("eventId").notNull(),
  artistId: integer("artistId").notNull(),
});

export const eventsToArtistsRelations = relations(
  artistsToEvents,
  ({ one }) => ({
    event: one(events, {
      fields: [artistsToEvents.eventId],
      references: [events.id],
    }),
    artist: one(artists, {
      fields: [artistsToEvents.artistId],
      references: [artists.id],
    }),
  })
);
