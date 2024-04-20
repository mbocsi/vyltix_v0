export default function Event({
  params,
}: {
  params: {
    venue: string;
  };
}) {
  const { venue } = params;
  const venueName = decodeURI(venue);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl">{venueName}</h1>
    </main>
  );
}
