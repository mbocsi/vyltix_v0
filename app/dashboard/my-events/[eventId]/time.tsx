"use client";

import { useState } from "react";
import { saveEventTimeChange } from "./actions";
import { Event } from "./page";
import { Input } from "@/components/ui/input";
import Edit from "./edit";

export default function EventTime({ initEvent }: { initEvent: Event }) {
  const [eventTime, setEventTime] = useState(initEvent.time);
  const [edit, setEdit] = useState(false);
  return (
    <section
      className={`flex flex-col p-2 space-y-4 rounded-lg ${
        edit
          ? "dark:bg-zinc-900 bg-zinc-100 border-2 border-orange-500 border-opacity-50"
          : ""
      }`}
    >
      <div className="flex flex-row space-x-4 items-center">
        <h1 className="text-lg">Event date and time</h1>
        <Edit
          edit={edit}
          setEdit={setEdit}
          func={() =>
            eventTime ? saveEventTimeChange(eventTime, initEvent.id) : null
          }
        />
      </div>
      {edit ? (
        <Input
          className="text-2xl"
          type="datetime-local"
          onChange={(e) => {
            setEventTime(new Date(e.target.value));
          }}
          defaultValue={eventTime ? eventTime.toString() : ""}
        />
      ) : (
        <p className={`${eventTime ? "" : "text-red-500"}`}>
          {eventTime
            ? eventTime.toLocaleTimeString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Not set!"}
        </p>
      )}
    </section>
  );
}
