import SearchBar from "@/components/searchbar";
import UpcomingEvents from "@/components/upcoming-events";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24 pt-36">
      <div className="w-full flex flex-col items-center gap-16">
        <div className="relative flex place-items-center before:opacity-70 before:blur-2xl after:blur-2xl after:-translate-x-1/3 before:absolute before:h-[200px] before:w-full sm:before:w-[240px] before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[360px] after:bg-gradient-conic after:from-sky-300 after:via-blue-300 after:content-[''] before:dark:from-black before:dark:to-transparent before:dark:opacity-30 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-50 before:lg:h-[200px] z-[-1]">
          <h1 className="text-6xl">Vyltix</h1>
        </div>
        <SearchBar href="/" placeholder="Search by event, artist, or venue" />
      </div>
      <div className="w-full">
        <h1 className="text-3xl py-4">Upcoming Events</h1>
        <UpcomingEvents count={4} />
      </div>
    </main>
  );
}
