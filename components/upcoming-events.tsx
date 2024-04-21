"use client";

import { getUpcomingEvents } from "@/lib/requests";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

async function getData(count: number) {
  return await getUpcomingEvents(count);
}
const queryClient = new QueryClient();

export default function UpcomingEvents({ count }: { count: number }) {
  return (
    <QueryClientProvider client={queryClient}>
      <EventContent count={count} />
    </QueryClientProvider>
  );
}
function EventContent({ count }: { count: number }) {
  // const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`events-${count}`],
    queryFn: () => getData(count),
  });

  if (isPending) {
    return (
      <div className="flex flex-row gap-8 justify-evenly flex-wrap">
        {Array.from(Array(count).keys()).map((key) => (
          <Card className="grow basis-0 dark:border-zinc-600" key={key}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-40 rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-[150px] min-w-full rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>
                <Skeleton className="h-4 w-52 rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>
                <Skeleton className="h-4 w-24 rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>{" "}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  if (data) {
    return (
      <div className="flex flex-row gap-8 justify-evenly flex-wrap">
        {data.map((event) => (
          <Card className="grow basis-0 dark:border-zinc-600" key={event.id}>
            <Link
              href={`/events/${event.id}`}
              className="grow basis-0 dark:border-zinc-600"
            >
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[150px] min-w-full rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>
                  <Skeleton className="h-4 w-52 rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>
                  <Skeleton className="h-4 w-24 rounded-lg dark:bg-zinc-700 bg-zinc-200"></Skeleton>{" "}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    );
  }
}
