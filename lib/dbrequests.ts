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

export async function getEvent(eventId: number, userId: string) {
  const results = await db.query.events.findFirst({
    where: and(eq(events.id, eventId), eq(events.userId, userId)),
    columns: {
      name: true,
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
