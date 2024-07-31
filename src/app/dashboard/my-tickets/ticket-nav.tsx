"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TicketNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-row items-center mb-12 border-b shadow-sm">
      <Link
        href="/dashboard/my-tickets"
        className={`hover:bg-zinc-100 inline-flex items-center p-4 ${pathname == "/dashboard/my-tickets" ? "bg-zinc-100" : ""}`}
      >
        <p className="text-xl">Upcoming events</p>
      </Link>
      <Link
        href="/dashboard/my-tickets/past-events"
        className={`hover:bg-zinc-100 inline-flex items-center p-4 ${pathname == "/dashboard/my-tickets/past-events" ? "bg-zinc-100" : ""}`}
      >
        <p className="text-xl">Past events</p>
      </Link>
      <Link
        href="/dashboard/my-tickets/listings"
        className={`hover:bg-zinc-100 inline-flex items-center p-4 ${pathname == "/dashboard/my-tickets/listings" ? "bg-zinc-100" : ""}`}
      >
        <p className="text-xl">Listings</p>
      </Link>
    </nav>
  );
}
