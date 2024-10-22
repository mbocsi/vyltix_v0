"use client";

import { getVenues } from "@/lib/requests";
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
  return await getVenues(count);
}
const queryClient = new QueryClient();

export default function UpcomingVenues({ count }: { count: number }) {
  return (
    <QueryClientProvider client={queryClient}>
      <VenueContent count={count} />
    </QueryClientProvider>
  );
}
function VenueContent({ count }: { count: number }) {
  // const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`venues-${count}`],
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
          <Card className="grow basis-0 dark:border-zinc-600" key={event.title}>
            <Link
              href={`/venues/${event.title}`}
              className="grow basis-0 dark:border-zinc-600"
            >
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
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
