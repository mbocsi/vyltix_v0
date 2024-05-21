import Link from "next/link";
import { getUserTickets } from "@/lib/dbrequests";
import { auth } from "@clerk/nextjs";

const tickets: {
  event: string;
  artist: string;
  venue: string;
  quantity: number;
}[] = [
  {
    event: "H.E.R. Tour",
    artist: "IU",
    venue: "Allstate Arena",
    quantity: 3,
  },
];

export default async function MyTickets() {
  const { userId } = auth();
  const userTickets = userId ? await getUserTickets(userId) : null;
  console.log(userTickets);
  return (
    <main className="min-h-screen flex flex-col items-center p-24 pt-36 gap-12">
      <h1 className="text-3xl">My Tickets</h1>
      <ul className="w-2/3 flex flex-col gap-4">
        {userTickets?.map((ticket) => (
          <Link
            href={`/dashboard/my-tickets/${ticket.eventName}`}
            key={ticket.eventName}
          >
            <div className="flex h-16 p-6 rounded-full flex-row justify-between items-center dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 border">
              <p className="w-1/4">{ticket.eventName}</p>
              <p className="w-1/4">{ticket.sectionName}</p>
              <p className="w-1/4">{ticket.venueName}</p>
              {/* <p> */}
              {/*   {ticket.time?.toLocaleString("en-us", { */}
              {/*     day: "numeric", */}
              {/*     month: "short", */}
              {/*     year: "numeric", */}
              {/*     hour: "numeric", */}
              {/*     minute: "numeric", */}
              {/*   })} */}
              {/* </p> */}
              <p className="w-1/4 text-right">{ticket.count} pcs</p>
            </div>
          </Link>
        ))}
      </ul>
    </main>
  );
}
