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
import { eq, and, sql } from "drizzle-orm";
import {
  Artist,
  Event,
  Section,
} from "@/app/dashboard/my-events/[eventId]/page";
import { SectionInfo } from "@/app/events/[event]/tickets/sections";

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
  const secs = db
    .select({
      admissionCount:
        sql<number>`cast(count(case ${tickets.vacant} when ${false} then 1 else null end) as int)`.as(
          "admissionCount",
        ),
      eventName: sql<string>`${events.name}`.as("eventName"),
      eventId: sql<number>`${events.id}`.as("eventId"),
      venueName: sql<string>`${venues.name}`.as("venueName"),
      sectionCapacity: sql<number>`${sections.capacity}`.as("sectionCapacity"),
    })
    .from(events)
    .fullJoin(venues, eq(venues.id, events.venueId))
    .fullJoin(sections, eq(sections.eventId, events.id))
    .fullJoin(tickets, eq(tickets.sectionId, sections.id))
    .where(eq(events.userId, userId))
    .groupBy(events.name, venues.name, sections.capacity, events.id)
    .as("secs");

  const res = await db
    .select({
      admissionCount: sql<number>`cast(sum(${secs.admissionCount}) as int)`,
      eventName: secs.eventName,
      eventId: secs.eventId,
      venueName: secs.venueName,
      eventCapacity: sql<number>`cast(sum(${secs.sectionCapacity}) as int)`,
    })
    .from(secs)
    .groupBy(secs.eventName, secs.venueName, secs.eventId);

  return res;
}

export async function getMyEvent(eventId: number, userId: string) {
  const event: Event[] = await db
    .select({
      name: events.name,
      id: events.id,
      description: events.description,
      time: events.time,
    })
    .from(events)
    .where(eq(events.id, eventId));

  const sects: Section[] = await db
    .select({
      id: sections.id,
      name: sections.name,
      price: sections.price,
      capacity: sections.capacity,
      admissions: sql<number>`cast(count(case ${tickets.vacant} when ${false} then 1 else null end) as int)`,
    })
    .from(sections)
    .where(eq(sections.eventId, eventId))
    .leftJoin(tickets, eq(tickets.sectionId, sections.id))
    .groupBy(sections.id, sections.name, sections.price, sections.capacity);

  const arts: Artist[] = await db
    .select({
      name: artists.name,
    })
    .from(events)
    .where(eq(events.id, eventId))
    .leftJoin(artistsToEvents, eq(artistsToEvents.eventId, events.id))
    .leftJoin(artists, eq(artists.id, artistsToEvents.artistId));

  // const res = await db.query.events.findFirst({
  //   where: and(eq(events.id, eventId), eq(events.userId, userId)),
  //   columns: {
  //     name: true,
  //     id: true,
  //     description: true,
  //     time: true,
  //   },
  //   with: {
  //     venue: {
  //       columns: {
  //         name: true,
  //       },
  //     },
  //     sections: {
  //       with: {
  //         tickets: {
  //           columns: {
  //             vacant: true,
  //           },
  //         },
  //       },
  //       columns: {
  //         id: true,
  //         name: true,
  //         capacity: true,
  //         admissions: true,
  //         price: true,
  //       },
  //     },
  //     artistsToEvents: {
  //       with: {
  //         artist: {
  //           columns: {
  //             name: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  return {
    event: event.length ? event[0] : null,
    sections: sects,
    artists: arts,
  };
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
  const res = await db
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
    .groupBy(sections.name, events.name, venues.name, events.time)
    .orderBy(events.name);
  return res;
}
