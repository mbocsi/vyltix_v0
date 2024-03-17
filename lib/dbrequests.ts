import { db, events, venues, sections, artists, artistsToEvents } from "@/db";
import { createEventData } from "@/app/dashboard/my-events/create-event/page";

export async function addEvent(data: createEventData, userId: string) {
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
    await tx.insert(sections).values(sectionData);

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
}
