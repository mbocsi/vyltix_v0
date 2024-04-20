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
    { title: "Post Malone" },
    { title: "Marshmello" },
    { title: "Lil Nas" },
    { title: "Seventeen" },
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
    { title: "title9" },
    { title: "title10" },
    { title: "title11" },
    { title: "title12" },
    { title: "title13" },
    { title: "title14" },
  ];
  const res = new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  await res;
  return events.slice(0, n);
}

export async function getVenues(n: number) {
  const events: { title: string }[] = [
    { title: "Allstate Arena" },
    { title: "AT&T Stadium" },
    { title: "Madison Square Garden" },
    { title: "Red Rocks Amphitheater" },
    { title: "Ryman Auditorium" },
    { title: "The Greek Theatre" },
    { title: "The Fillmore Auditorium" },
    { title: "The Hollywood Bowl" },
    { title: "First Avenue" },
    { title: "Radio City Music Hall" },
  ];
  const res = new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  await res;
  return events.slice(0, n);
}
