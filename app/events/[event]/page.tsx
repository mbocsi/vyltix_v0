import { Skeleton } from "@/components/ui/skeleton";
import { getEventInfo } from "@/lib/dbrequests";
import Image from "next/image";
import Link from "next/link";

export default async function Event({
  params,
}: {
  params: {
    event: number;
  };
}) {
  const { event } = params;
  const eventInfo = await getEventInfo(event);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">{eventInfo?.name}</h1>
        {eventInfo?.imageURL ? (
          <Image
            src={eventInfo.imageURL}
            alt={`Image for event, ${eventInfo.name}`}
          ></Image>
        ) : (
          <></>
        )}
        {eventInfo?.description ? <p>{eventInfo?.description}</p> : <></>}
      </div>

      <div className="flex flex-col w-1/2 items-center gap-4">
        <p className="font-bold">Featured artists: </p>
        <div className="flex flex-row gap-4 flex-wrap justify-center">
          {eventInfo?.artistsToEvents.map((rel) => (
            <Link href={`/artists/${rel.artist.id}`} key={rel.artist.id}>
              <div className="border p-2 rounded-lg dark:border-zinc-600 border-zinc-200 text-center flex flex-row gap-2 items-center">
                {rel.artist.imageURL ? (
                  <Image
                    src={rel.artist.imageURL}
                    alt={`Image of ${rel.artist.name}`}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  ></Image>
                ) : (
                  <Skeleton className="h-[50px] w-[50px] rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>
                )}
                <p className="text-xl">{rel.artist.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-1/2 items-center gap-4">
        <p className="font-bold">Time:</p>
        {eventInfo?.time ? (
          <p className="text-xl">
            {eventInfo?.time?.toLocaleTimeString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        ) : (
          <p className="text-xl">TBD</p>
        )}
      </div>

      <Link href={`/event/${event}/tickets`} className="w-1/2">
        <div className="rounded-lg border dark:border-zinc-600 border-zinc-200 p-4 text-center">
          <p className="text-xl">Buy tickets</p>
        </div>
      </Link>
    </main>
  );
}
