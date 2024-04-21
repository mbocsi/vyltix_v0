import { getArtist, getArtistEvents } from "@/lib/dbrequests";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: {
    artist: number;
  };
}) {
  const { artist } = params;

  const artistInfo = await getArtist(artist);
  const events = await getArtistEvents(artist);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-12">
      <h1 className="text-3xl">{artistInfo?.name}</h1>
      <p>About the artist: {artistInfo?.description}</p>
      <h1 className="text-3xl">{artistInfo?.name}'s events</h1>
      <div className="flex flex-col w-1/2">
        {events.map((rel) => (
          <Link href={`/events/${rel.event.id}`} key={rel.event.id}>
            <div className="flex h-16 p-6 rounded-full flex-row justify-between items-center dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 border">
              <p>{rel.event.name}</p>
              <p>{rel.event.venue.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
