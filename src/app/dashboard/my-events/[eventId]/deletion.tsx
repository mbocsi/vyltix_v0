"use client";
import { Button } from "@/components/ui/button";
import { delEvent } from "./actions";

export default function EventDeletion({ id }: { id: number }) {
  return (
    <div className="inline-flex items-center justify-between space-x-4">
      <p className="text-2xl">Delete Event</p>
      <Button variant="destructive" onClick={() => delEvent(id)}>
        Delete event
      </Button>
    </div>
  );
}
