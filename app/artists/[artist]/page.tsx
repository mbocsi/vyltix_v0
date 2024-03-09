export default async function Page({
  params,
}: {
  params: {
    artist: string;
  };
}) {
  const { artist } = params;
  const artistName = decodeURI(artist);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl">{artistName}</h1>
      <p>WIP!</p>
    </main>
  );
}
