import Link from "next/link";
import { CgAddR } from "react-icons/cg";

const myEvents: {
  eventName: string;
  artists: string[];
  venue: string;
  quantitySold: number;
  capacity: number;
}[] = [
  {
    eventName: "Daniels Guitar Concert",
    artists: ["Daniel Bocsi", "Gabor Szarvas"],
    venue: "Peace Plaza",
    quantitySold: 35,
    capacity: 50,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center p-24 pt-36 gap-12">
      <h1 className="text-3xl">My Events</h1>
      <ul className="w-2/3 flex flex-col gap-4">
        {myEvents.map((event) => (
          <Link
            href={`/dashboard/my-events/${event.eventName}`}
            key={event.eventName}
          >
            <div className="flex h-16 p-6 rounded-full flex-row justify-between items-center dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 border">
              <p>
                {event.artists}: {event.eventName}
              </p>
              <p>{event.venue}</p>
              <p>
                {event.quantitySold}/{event.capacity} sold
              </p>
            </div>
          </Link>
        ))}
        <Link href={`/dashboard/my-events/create-event`} className="w-min">
          <div className="flex h-12 p-4 rounded-lg flex-row items-center gap-2 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-900 border">
            <CgAddR size={25} />
            <p className="whitespace-nowrap">Create Event</p>
          </div>
        </Link>
      </ul>
    </main>
  );
}
