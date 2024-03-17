import { getEvent } from "@/lib/dbrequests";
import { auth } from "@clerk/nextjs";

export default async function Event({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const { eventId } = params;
  const { userId } = auth();
  let event;
  if (userId && eventId) {
    event = await getEvent(parseInt(eventId), userId);
  }

  if (event) {
    return (
      <main className="flex min-h-screen flex-col items-center p-36">
        <h1 className="text-3xl">{event.name}</h1>
        <div className="w-full flex flex-col space-y-4">
          <h1 className="text-xl">Sections</h1>
          {event.sections.map((section) => (
            <div
              key={section.name}
              className="space-y-4 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg flex flex-row justify-between"
            >
              <p>{section.name}</p>
              <p>
                {section.admissions}/{section.capacity}
              </p>
              <p>${section.price}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }
}
