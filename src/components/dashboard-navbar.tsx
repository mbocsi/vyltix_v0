import Link from "next/link";
import { Separator } from "./ui/separator";

export default function DashboardNav() {
  return (
    <div className="fixed left-0 h-full flex flex-col justify-center">
      <nav className="fixed left-0 w-52 flex flex-col gap-4 justify-around p-6 bg-white bg-opacity-50 dark:bg-zinc-950 dark:bg-opacity-60 backdrop-blur-md border border-zinc-200 dark:border-zinc-900 z-10 rounded-r-xl shadow-md">
        <Link href="/dashboard/my-events" className="text-xl whitespace-nowrap">
          My events
        </Link>
        <Separator />
        <Link
          href="/dashboard/my-tickets"
          className="text-xl whitespace-nowrap"
        >
          My tickets
        </Link>
        <Separator />
        <Link
          href="/dashboard/my-listings"
          className="text-xl whitespace-nowrap"
        >
          My listings
        </Link>
        <Separator />
        <Link
          href="/dashboard/my-profile"
          className="text-xl whitespace-nowrap"
        >
          My profile
        </Link>
        <Separator />
        <Link
          href="/dashboard/my-settings"
          className="text-xl whitespace-nowrap"
        >
          My settings
        </Link>
      </nav>
    </div>
  );
}
