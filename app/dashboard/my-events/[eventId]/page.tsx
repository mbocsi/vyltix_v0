import { getEventUser } from "@/lib/dbrequests";
import { auth } from "@clerk/nextjs";
import Sections from "./sections";
import Description from "./description";
import Name from "./title";

export type Event = {
  name: string;
  id: number;
  description: string | null;
  venue: {
    name: string;
  };
  sections: {
    id: number;
    admissions: number;
    capacity: number;
    name: string;
    price: string;
    tickets: {
      vacant: boolean;
    }[];
  }[];
  artistsToEvents: {
    id: number;
    eventId: number;
    artistId: number;
    artist: {
      name: string;
    };
  }[];
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
  const event =
    userId && eventId ? await getEventUser(parseInt(eventId), userId) : null;

  if (event) {
    return (
      <main className="flex min-h-screen flex-col items-center p-36">
        <Name initEvent={event} />
        <div className="w-full flex flex-col space-y-4 px-8">
          <Description initEvent={event} />
          <Sections initEvent={event} />
        </div>
      </main>
    );
  }
}
