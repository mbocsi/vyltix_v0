import Link from "next/link";

export default function DashboardNav() {
  return (
    <div className="fixed left-0 h-full flex flex-col justify-center">
      <nav className="fixed left-0 w-36 flex flex-col gap-4 justify-around items-end p-6 bg-white bg-opacity-50 dark:bg-zinc-950 dark:bg-opacity-60 backdrop-blur-md border border-zinc-200 dark:border-zinc-900 z-10 rounded-r-xl">
        <Link href="/dashboard/my-events" className="text-xl whitespace-nowrap">
          My events
        </Link>
        <Link
          href="/dashboard/my-tickets"
          className="text-xl whitespace-nowrap"
        >
          My tickets
        </Link>
      </nav>
    </div>
  );
}
