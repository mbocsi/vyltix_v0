import Link from "next/link";
import { CgAddR } from "react-icons/cg";
import { getEvents } from "@/lib/dbrequests";
import { auth } from "@clerk/nextjs";

export default async function Page() {
  const { userId } = auth();
  let myEvents = null;
  if (userId) {
    myEvents = await getEvents(userId);
  }

  if (myEvents) {
    return (
      <main className="min-h-screen flex flex-col items-center p-24 pt-36 gap-12">
        <h1 className="text-3xl">My Events</h1>
        <ul className="w-2/3 flex flex-col gap-4">
          {myEvents.length == 0 ? (
            <div className="w-full flex flex-row justify-center">
              <p className="text-2xl">You have no events!</p>
            </div>
          ) : (
            myEvents.map((event) => {
              const admissions = event.sections.reduce(
                (partialSum, a) => partialSum + a.admissions,
                0
              );
              const capacity = event.sections.reduce(
                (partialSum, a) => partialSum + a.capacity,
                0
              );
              return (
                <Link
                  href={`/dashboard/my-events/${event.id}`}
                  key={event.name}
                >
                  <div className="flex h-16 p-6 rounded-full flex-row justify-between items-center dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 border">
                    <p>{event.name}</p>
                    <p>{event.venue.name}</p>
                    <p>
                      {admissions}/{capacity} sold
                    </p>
                  </div>
                </Link>
              );
            })
          )}
          <Link href={`/dashboard/my-events/create-event`} className="w-min">
            <div className="flex h-12 p-4 rounded-lg flex-row items-center gap-2 bg-zinc-200 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-900 border">
              <CgAddR size={25} />
              <p className="whitespace-nowrap">Create Event</p>
            </div>
          </Link>
        </ul>
      </main>
    );
  }
}
