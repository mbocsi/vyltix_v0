import Link from "next/link";
import { getUserUpcomingTickets } from "@/lib/dbrequests";
import { auth } from "@clerk/nextjs";

export default async function MyTickets() {
  const { userId } = auth();
  const userTickets = userId ? await getUserUpcomingTickets(userId) : null;
  console.log(userTickets);
  return (
    <main className="flex flex-col items-center gap-12 w-full">
      <ul className="w-full flex flex-col gap-4">
        {userTickets?.map((ticket) => (
          <Link
            href={`/dashboard/my-tickets/${ticket.eventName}`}
            key={ticket.eventName}
          >
            <div className="flex h-16 p-6 rounded-full flex-row justify-between items-center dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 border shadow-sm hover:bg-zinc-100">
              <p className="w-1/4">{ticket.eventName}</p>
              <p className="w-1/4">{ticket.sectionName}</p>
              <p className="w-1/4">{ticket.venueName}</p>
              <p className="text-nowrap">
                {ticket.time?.toLocaleString("en-us", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
              <p className="w-1/4 text-right">{ticket.count} pcs</p>
            </div>
          </Link>
        ))}
      </ul>
    </main>
  );
}
