"use server";

import { createEventData } from "./page";
import { auth } from "@clerk/nextjs";
import { addEvent } from "@/lib/dbrequests";
import { redirect } from "next/navigation";

export async function createEvent(data: createEventData) {
  const { userId } = auth();
  console.log(userId);
  if (userId) {
    console.log(data);
    let eventId = await addEvent(data, userId);
    if (eventId) {
      redirect(`/dashboard/my-events/${eventId}`);
    } else {
      redirect("/dashboard/my-events");
    }
  } else {
  }
}
