"use server";

import { auth } from "@clerk/nextjs";
import { saveSection } from "@/lib/dbrequests";
import { Event } from "@/app/dashboard/my-events/[eventId]/sections";
import { redirect } from "next/navigation";

export async function saveSectionChanges(data: Event) {
  const { userId } = auth();
  console.log(userId);
  console.log(data);
  if (userId) {
    let eventId = await saveSection(data);
    redirect(`/dashboard/my-events/${data.id}`);
  }
}
