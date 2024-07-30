import UpcomingArtists from "@/components/upcoming-artists";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl pb-12">Artists</h1>
      <UpcomingArtists count={11} />
    </main>
  );
}
