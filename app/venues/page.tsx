import UpcomingVenues from "@/components/upcoming-venues";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl pb-12">Venues</h1>
      <UpcomingVenues count={10} />
    </main>
  );
}
