"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EventNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-row items-center mb-12 border-b shadow-sm">
      <Link
        href="/dashboard/my-events"
        className={`hover:bg-zinc-100 inline-flex items-center p-4 ${pathname == "/dashboard/my-events" ? "bg-zinc-100" : ""}`}
      >
        <p className="text-xl">Upcoming events</p>
      </Link>
      <Link
        href="/dashboard/my-events/past-events"
        className={`hover:bg-zinc-100 inline-flex items-center p-4 ${pathname == "/dashboard/my-events/past-events" ? "bg-zinc-100" : ""}`}
      >
        <p className="text-xl">Past events</p>
      </Link>
    </nav>
  );
}
