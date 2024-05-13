"use server";

import { auth } from "@clerk/nextjs";
import { saveSection, saveDescription } from "@/lib/dbrequests";
import { Event } from "@/app/dashboard/my-events/[eventId]/page";
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

export async function saveDescriptionChange(desc: string, id: number) {
  const { userId } = auth();
  console.log(userId);
  console.log(desc);
  if (userId) {
    let eventId = await saveDescription(desc, id);
    redirect(`/dashboard/my-events/${id}`);
  }
}
