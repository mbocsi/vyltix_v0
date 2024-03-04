export async function getUpcomingArtists(n: number) {
  const events: { title: string }[] = [
    { title: "IU" },
    { title: "Dreamcatcher" },
    { title: "Coldplay" },
    { title: "Taylor Swift" },
    { title: "Imagine Dragons" },
    { title: "BTS" },
    { title: "Ed Sheeran" },
    { title: "The Weeknd" },
  ];
  const res = new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  await res;
  return events.slice(0, n);
}

export async function getUpcomingEvents(n: number) {
  const events: { title: string }[] = [
    { title: "title1" },
    { title: "title2" },
    { title: "title3" },
    { title: "title4" },
    { title: "title5" },
    { title: "title6" },
    { title: "title7" },
    { title: "title8" },
  ];
  const res = new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  await res;
  return events.slice(0, n);
}
