import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  numeric,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Create a pgTable that maps to a table in your DB
export const events = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    name: text("name").unique().notNull(),
    userId: text("user_id").notNull(),
    venueId: integer("venue_id").notNull(),
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

export const eventsRelations = relations(events, ({ one, many }) => ({
  venue: one(venues, {
    fields: [events.venueId],
    references: [venues.id],
  }),
  sections: many(sections),
  artistsToEvents: many(artistsToEvents),
}));

export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  address: text("address"),
  imageURL: text("image"),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const venuesRelations = relations(venues, ({ many }) => ({
  events: many(events),
}));

export const sections = pgTable(
  "sections",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    capacity: integer("capacity").notNull(),
    admissions: integer("admissions").notNull().default(0),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    description: text("description"),
    eventId: integer("event_id").notNull(),
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
    createdAt: timestamp("createdAt").defaultNow().notNull(),
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
