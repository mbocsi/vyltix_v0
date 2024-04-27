import { getEventUser } from "@/lib/dbrequests";
import { auth } from "@clerk/nextjs";
import Sections from "./sections";

export default async function Event({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const { eventId } = params;
  const { userId } = auth();
  const event =
    userId && eventId ? await getEventUser(parseInt(eventId), userId) : null;

  if (event) {
    return (
      <main className="flex min-h-screen flex-col items-center p-36">
        <h1 className="text-3xl pb-8">{event.name}</h1>
        <div className="w-full flex flex-col space-y-4 px-8">
          <Sections initEvent={event}></Sections>
        </div>
      </main>
    );
  }
}
