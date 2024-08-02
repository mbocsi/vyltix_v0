import Link from "next/link";
import { CgAddR } from "react-icons/cg";
import { getPastEvents } from "@/lib/dbrequests";
import { auth } from "@clerk/nextjs";
import EventNav from "../event-nav";

export default async function Page() {
  const { userId } = auth();
  let myEvents = null;
  if (userId) {
    myEvents = await getPastEvents(userId);
  }
  console.log(myEvents);

  if (myEvents) {
    return (
      <>
        <EventNav />
        <main className="flex flex-col items-center gap-12">
          <ul className="w-full flex flex-col gap-4">
            {myEvents.length == 0 ? (
              <div className="w-full flex flex-row justify-center">
                <p className="text-2xl">You have no events!</p>
              </div>
            ) : (
              myEvents.map((event) => {
                return (
                  <Link
                    href={`/dashboard/my-events/${event.eventId}`}
                    key={event.eventId}
                  >
                    <div className="flex h-16 p-6 rounded-full flex-row justify-between items-center dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 border shadow-sm hover:bg-zinc-100">
                      <p className="w-1/2">{event.eventName}</p>
                      <p className="w-1/4">{event.venueName}</p>
                      <p className="w-1/4">
                        {event.admissionCount}/{event.eventCapacity} sold
                      </p>
                    </div>
                  </Link>
                );
              })
            )}
          </ul>
        </main>
      </>
    );
  }
}
