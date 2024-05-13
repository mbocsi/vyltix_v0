"use server";

import {
  db,
  events,
  venues,
  sections,
  artists,
  artistsToEvents,
  tickets,
} from "@/db";
import { createEventData } from "@/app/dashboard/my-events/create-event/page";
import { eq, and } from "drizzle-orm";
import { Event } from "@/app/dashboard/my-events/[eventId]/sections";

export async function addEvent(data: createEventData, userId: string) {
  let eventId;
  await db.transaction(async (tx) => {
    const venueData = {
      name: data["venueName"],
      address: data["venueAddress"],
      description: data["venueDescription"],
    };
    const venue: { id: number }[] = await tx
      .insert(venues)
      .values(venueData)
      .returning({ id: venues.id });

    const eventData = {
      name: data["eventName"],
      userId: userId,
      venueId: venue[0]["id"],
      description: data["eventDescription"],
    };
    const event: { id: number }[] = await tx
      .insert(events)
      .values(eventData)
      .returning({ id: events.id });

    eventId = event[0]["id"];

    const sectionData: {
      name: string;
      capacity: number;
      price: string;
      description: string | undefined;
      eventId: number;
    }[] = data["sections"].map((section) => {
      return {
        name: section["name"],
        capacity: section["capacity"],
        price: section["ticketCost"],
        description: section["description"],
        eventId: event[0]["id"],
      };
    });
    const sectionRet = await tx
      .insert(sections)
      .values(sectionData)
      .returning({ id: sections.id, capacity: sections.capacity });

    let ticketData: { sectionId: number }[] = [];
    sectionRet.forEach((section) => {
      const data = Array(section.capacity).fill({
        sectionId: section.id,
      });
      ticketData = ticketData.concat(data);
    });

    await tx.insert(tickets).values(ticketData);

    const artistData: {
      name: string;
      description: string | undefined;
    }[] = data["artists"].map((artist) => ({
      name: artist["name"],
      description: artist["description"],
    }));

    const artist = await tx
      .insert(artists)
      .values(artistData)
      .returning({ id: artists.id });

    const eventToArtistData: {
      eventId: number;
      artistId: number;
    }[] = artist.map((artist) => ({
      eventId: event[0]["id"],
      artistId: artist["id"],
    }));

    await tx.insert(artistsToEvents).values(eventToArtistData);
  });
  return eventId;
}

export async function getEvents(userId: string) {
  const results = await db.query.events.findMany({
    where: eq(events.userId, userId),
    columns: {
      id: true,
      name: true,
    },
    with: {
      venue: {
        columns: {
          name: true,
        },
      },
      sections: {
        columns: {
          capacity: true,
          admissions: true,
        },
      },
      artistsToEvents: {
        with: {
          artist: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });
  return results;
}

export async function getEventUser(eventId: number, userId: string) {
  const results = await db.query.events.findFirst({
    where: and(eq(events.id, eventId), eq(events.userId, userId)),
    columns: {
      name: true,
      id: true,
    },
    with: {
      venue: {
        columns: {
          name: true,
        },
      },
      sections: {
        with: {
          tickets: {
            columns: {
              vacant: true,
            },
          },
        },
        columns: {
          id: true,
          name: true,
          capacity: true,
          admissions: true,
          price: true,
        },
      },
      artistsToEvents: {
        with: {
          artist: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });
  return results;
}

export async function getTopEvents(n: number) {
  const results = await db.query.events.findMany({
    columns: {
      id: true,
      name: true,
    },
    limit: n,
  });
  return results;
}

export async function getTopArtists(n: number) {
  const results = await db.query.artists.findMany({
    columns: {
      id: true,
      name: true,
      imageURL: true,
    },
    limit: n,
  });
  return results;
}

export async function getArtist(id: number) {
  const results = await db.query.artists.findFirst({
    where: eq(artists.id, id),
  });
  return results;
}

export async function getArtistEvents(id: number) {
  const results = await db.query.artistsToEvents.findMany({
    where: eq(artistsToEvents.artistId, id),
    with: {
      event: {
        columns: {
          id: true,
          name: true,
        },
        with: {
          venue: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });
  return results;
}

export async function getEventInfo(id: number) {
  const results = await db.query.events.findFirst({
    where: eq(events.id, id),
    columns: {
      name: true,
      description: true,
      imageURL: true,
      time: true,
    },
    with: {
      artistsToEvents: {
        where: eq(artistsToEvents.eventId, id),
        with: {
          artist: {
            columns: {
              id: true,
              name: true,
              imageURL: true,
            },
          },
        },
      },
    },
  });
  return results;
}

export async function saveSection(data: Event) {
  await db.transaction(async (tx) => {
    let ticketData: { sectionId: number }[] = [];
    for (const section of data.sections) {
      const prevSection = await tx.query.sections.findFirst({
        columns: { capacity: true },
        where: eq(sections.id, section.id),
      });
      if (!prevSection) {
        throw new Error("Section not found in database!");
      }
      console.log("previous capacity: ", prevSection.capacity);
      const deficit = section.capacity - prevSection.capacity;
      console.log("deficit: ", deficit);
      if (deficit < 1) {
        continue;
      }
      const data = Array(deficit).fill({
        sectionId: section.id,
      });
      ticketData = ticketData.concat(data);
    }
    console.log("ticket data: ", ticketData);
    if (ticketData.length != 0) {
      console.log("Inserting tickets!");
      await tx.insert(tickets).values(ticketData);
    }
    for (const section of data.sections) {
      await tx
        .update(sections)
        .set({
          name: section.name,
          capacity: section.capacity,
          price: section.price,
        })
        .where(eq(sections.id, section.id));
    }
  });
}
