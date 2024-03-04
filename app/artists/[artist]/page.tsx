export default async function Page({
  params,
}: {
  params: {
    artist: string;
  };
}) {
  const { artist } = params;
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl">{artist}</h1>
      <p>WIP!</p>
    </main>
  );
}
