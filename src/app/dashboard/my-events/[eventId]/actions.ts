"use server";

import { auth } from "@clerk/nextjs";
import {
  saveSection,
  saveDescription,
  saveName,
  saveEventTime,
  saveEventPublic,
} from "@/lib/dbrequests";
import { Event, Section } from "@/app/dashboard/my-events/[eventId]/page";
import { redirect } from "next/navigation";
import Page from "../page";

export async function saveSectionChanges(sections: Section[]) {
  const { userId } = auth();
  console.log(userId);
  console.log(sections);
  if (userId) {
    await saveSection(sections);
    // redirect(`/dashboard/my-events/${data.id}`);
  }
}

export async function saveDescriptionChange(desc: string, id: number) {
  const { userId } = auth();
  console.log(userId);
  console.log(desc);
  if (userId) {
    await saveDescription(desc, id);
    // redirect(`/dashboard/my-events/${id}`);
  }
}

export async function saveNameChange(name: string, id: number) {
  const { userId } = auth();
  console.log(userId);
  console.log(name);
  if (userId) {
    await saveName(name, id);
    // redirect(`/dashboard/my-events/${id}`);
  }
}

export async function saveEventTimeChange(time: Date, id: number) {
  const { userId } = auth();
  console.log(userId);
  console.log(time);
  if (userId) {
    await saveEventTime(time, id);
    // redirect(`/dashboard/my-events/${id}`);
  }
}

export async function setEventPublic(pub: boolean, id: number) {
  const { userId } = auth();
  console.log(userId);
  console.log(pub);
  if (userId) {
    await saveEventPublic(pub, id);
    redirect(`/dashboard/my-events/${id}`);
  }
}
