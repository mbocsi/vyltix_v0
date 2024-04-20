import UpcomingEvents from "@/components/upcoming-events";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl pb-12">Events</h1>
      <UpcomingEvents count={10} />
    </main>
  );
}
