import { getMyEvent } from "@/lib/dbrequests";
import { auth } from "@clerk/nextjs";
import Sections from "./sections";
import Description from "./description";
import Name from "./title";
import EventTime from "./time";

export type Section = {
  name: string;
  id: number;
  capacity: number;
  admissions: number;
  price: string;
};
export type Event = {
  name: string;
  id: number;
  description: string | null;
  time: Date | null;
};

export type Artist = {
  name: string | null;
};

export default async function Event({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const { eventId } = params;
  const { userId } = auth();
  const {
    event,
    sections,
    artists,
  }: {
    event: Event | null;
    sections: Section[] | null;
    artists: Artist[] | null;
  } =
    userId && eventId
      ? await getMyEvent(parseInt(eventId), userId)
      : { event: null, sections: null, artists: null };

  if (event && sections) {
    return (
      <main className="flex min-h-screen flex-col items-center p-36">
        <Name initName={event.name} eventId={event.id} />
        <EventTime initTime={event.time} eventId={event.id} />
        <div className="w-full flex flex-col space-y-4 px-8">
          <Description initDescription={event.description} eventId={event.id} />
          <Sections initSections={sections} />
        </div>
      </main>
    );
  }
}