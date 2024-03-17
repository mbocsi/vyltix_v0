"use server";

import { createEventData } from "./page";
import { auth } from "@clerk/nextjs";
import { addEvent } from "@/lib/dbrequests";

export async function createEvent(data: createEventData) {
  const { userId } = auth();
  console.log(userId);
  if (userId) {
    console.log(data);
    await addEvent(data, userId);
  }
}
