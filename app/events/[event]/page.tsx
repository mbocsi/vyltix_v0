export default function Event({
  params,
}: {
  params: {
    event: string;
  };
}) {
  const { event } = params;
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl">{event}</h1>
    </main>
  );
}
