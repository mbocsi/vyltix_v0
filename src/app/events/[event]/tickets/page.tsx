import { getEventTicketInfo } from "@/lib/dbrequests";
import Sections from "./sections";

export default async function Tickets({
  params,
}: {
  params: {
    event: number;
  };
}) {
  const { event } = params;
  const eventInfo = await getEventTicketInfo(event);
  if (!eventInfo) {
    return (
      <main className="flex min-h-screen flex-col p-24 space-y-12">
        <div className="flex flex-row">
          <h1 className="text-3xl text-red-500">
            Could not find tickets for this event!
          </h1>
        </div>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col p-24 space-y-12">
      <div className="flex flex-row space-x-4 py-4 items-end">
        <h1 className="text-3xl">{eventInfo.name}</h1>
        <h1>
          {eventInfo.time?.toLocaleTimeString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h1>
      </div>
      <section id="tickets" className="space-y-4">
        <Sections
          sections={eventInfo.sections}
          eventName={eventInfo.name}
        ></Sections>
      </section>
    </main>
  );
}
