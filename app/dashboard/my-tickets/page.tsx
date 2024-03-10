import Link from "next/link";

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

export default function MyTickets() {
  return (
    <main className="min-h-screen flex flex-col items-center p-24 pt-36 gap-12">
      <h1 className="text-3xl">My Tickets</h1>
      <ul className="w-2/3 flex flex-col gap-4">
        {tickets.map((ticket) => (
          <Link
            href={`/dashboard/my-tickets/${ticket.event}`}
            key={ticket.event}
          >
            <div className="flex h-16 p-6 rounded-full flex-row justify-between items-center dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 border">
              <p>
                {ticket.artist}: {ticket.event}
              </p>
              <p>{ticket.venue}</p>
              <p>{ticket.quantity} pcs</p>
            </div>
          </Link>
        ))}
      </ul>
    </main>
  );
}
