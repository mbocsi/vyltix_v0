"use server";

import { auth } from "@clerk/nextjs";
import { purchaseTickets } from "@/lib/dbrequests";
import { SectionInfo } from "./sections";
import { redirect } from "next/navigation";

export async function buyTickets(data: SectionInfo[]) {
  const { userId } = auth();
  console.log(userId);
  if (userId) {
    console.log(data);
    const ret = await purchaseTickets(data, userId);
    console.log("Ticket purchase by user", userId, "returned with code", ret);
    redirect(`/dashboard/my-tickets`);
  }
}
