import SearchBar from "@/components/searchbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getUpcomingArtists } from "@/lib/requests";

export default async function Home() {
  const events = await getUpcomingArtists(4);
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
        <div className="flex flex-row gap-8 justify-evenly flex-wrap-reverse">
          {events.map((event) => (
            <Card
              key={event.title}
              className="grow basis-0 dark:border-zinc-600"
            >
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[150px] min-w-full rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>
                  <Skeleton className="h-4 w-40 rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>
                  <Skeleton className="h-4 w-24 rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>{" "}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
