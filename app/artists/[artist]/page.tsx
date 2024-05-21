import { getArtist, getArtistEvents } from "@/lib/dbrequests";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";

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
      {artistInfo?.imageURL ? (
        <Image
          src={artistInfo.imageURL}
          alt={`Image of ${artistInfo.name}`}
          width={300}
          height={300}
          className="rounded-xl"
        ></Image>
      ) : (
        <Skeleton className="h-[300px] w-[300px] rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>
      )}
      {artistInfo?.description ? (
        <p>About the artist: {artistInfo?.description}</p>
      ) : null}
      <h1 className="text-3xl">{artistInfo?.name}&apos;s events</h1>
      <div className="flex flex-col w-1/2">
        {events.map((rel) => (
          <Link href={`/events/${rel.event.id}`} key={rel.event.id}>
            <div className="flex h-16 p-6 rounded-full flex-row justify-between items-center dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 border">
              <p className="w-1/3">{rel.event.name}</p>
              <p className="w-1/3">{rel.event.venue.name}</p>
              <p className="w-1/3 text-right">
                {rel.event.time
                  ? rel.event.time.toLocaleString("en-us", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })
                  : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
