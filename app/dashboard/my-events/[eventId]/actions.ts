"use server";

import { auth } from "@clerk/nextjs";
import {
  saveSection,
  saveDescription,
  saveName,
  saveEventTime,
} from "@/lib/dbrequests";
import { Event } from "@/app/dashboard/my-events/[eventId]/page";
import { redirect } from "next/navigation";

export async function saveSectionChanges(data: Event) {
  const { userId } = auth();
  console.log(userId);
  console.log(data);
  if (userId) {
    await saveSection(data);
    redirect(`/dashboard/my-events/${data.id}`);
  }
}

export async function saveDescriptionChange(desc: string, id: number) {
  const { userId } = auth();
  console.log(userId);
  console.log(desc);
  if (userId) {
    await saveDescription(desc, id);
    redirect(`/dashboard/my-events/${id}`);
  }
}

export async function saveNameChange(name: string, id: number) {
  const { userId } = auth();
  console.log(userId);
  console.log(name);
  if (userId) {
    let eventId = await saveName(name, id);
    redirect(`/dashboard/my-events/${id}`);
  }
}

export async function saveEventTimeChange(time: Date, id: number) {
  const { userId } = auth();
  console.log(userId);
  console.log(time);
  if (userId) {
    await saveEventTime(time, id);
    redirect(`/dashboard/my-events/${id}`);
  }
}
