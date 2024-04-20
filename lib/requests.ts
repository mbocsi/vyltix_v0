"use server";

import { getTopEvents, getTopArtists } from "@/lib/dbrequests";

export async function getUpcomingArtists(n: number) {
  return await getTopArtists(n);
}

export async function getUpcomingEvents(n: number) {
  return await getTopEvents(n);
}

export async function getVenues(n: number) {
  console.log("get venues!");
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
    setTimeout(resolve, 300);
  });
  await res;
  return events.slice(0, n);
}
