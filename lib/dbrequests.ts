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
import { count, eq, and, sql } from "drizzle-orm";
import { Event } from "@/app/dashboard/my-events/[eventId]/page";
import { SectionInfo } from "@/app/events/[event]/tickets/sections";
import { eventsToArtistsRelations } from "@/db/schema";

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
      description: true,
      time: true,
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
          time: true,
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

export async function saveDescription(desc: string, id: number) {
  await db.update(events).set({ description: desc }).where(eq(events.id, id));
}

export async function saveName(name: string, id: number) {
  await db.update(events).set({ name: name }).where(eq(events.id, id));
}

export async function saveEventTime(time: Date, id: number) {
  await db.update(events).set({ time: time }).where(eq(events.id, id));
}

export async function getEventTicketInfo(id: number) {
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
      sections: {
        columns: {
          id: true,
          name: true,
          capacity: true,
          admissions: true,
          price: true,
        },
      },
    },
  });
  return results;
}

class QuantityError extends Error {}

export async function purchaseTickets(sections: SectionInfo[], id: string) {
  // Check that tickets were actually purchased here
  await db.transaction(async (tx) => {
    for (const section of sections) {
      if (section.quantity == 0) {
        continue;
      }
      const vacant = await tx.query.tickets.findMany({
        columns: {
          id: true,
        },
        where: and(eq(tickets.sectionId, section.id), eq(tickets.vacant, true)),
        limit: section.quantity,
      });
      console.log(
        "Found",
        vacant.length,
        "vacant tickets for section",
        section.name,
      );
      if (vacant.length != section.quantity) {
        tx.rollback();
        return new QuantityError();
      }
      for (const sect of vacant) {
        const updatedTicket = await tx
          .update(tickets)
          .set({ vacant: false, ownedBy: id })
          .where(eq(tickets.id, sect.id))
          .returning({ id: tickets.id });
        console.log("Allocated ticket id:", updatedTicket[0].id);
      }
    }
  });
  return 0;
}

export async function getUserTickets(id: string) {
  return await db
    .select({
      count: sql<number>`cast(count(${tickets.id}) as int)`,
      sectionName: sections.name,
      eventName: events.name,
      venueName: venues.name,
      time: events.time,
    })
    .from(tickets)
    .innerJoin(sections, eq(tickets.sectionId, sections.id))
    .innerJoin(events, eq(sections.eventId, events.id))
    .innerJoin(venues, eq(events.venueId, venues.id))
    .where(eq(tickets.ownedBy, id))
    .groupBy(sections.name, events.name, venues.name, events.time);
  // return await db.query.tickets.findMany({
  //   with: {
  //     section: {
  //       columns: {
  //         name: true,
  //       },
  //       with: {
  //         event: {
  //           columns: {
  //             name: true,
  //           },
  //           with: {
  //             venue: {
  //               columns: {
  //                 name: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
}
