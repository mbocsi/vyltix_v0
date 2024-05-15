"use client";

import { useState } from "react";
import { saveDescriptionChange } from "./actions";
import { Event } from "./page";
import { Textarea } from "@/components/ui/textarea";
import Edit from "./edit";

export default function Description({ initEvent }: { initEvent: Event }) {
  const [desc, setDesc] = useState(initEvent.description);
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
        <h1 className="text-2xl">Description</h1>
        <Edit
          edit={edit}
          setEdit={setEdit}
          func={() => (desc ? saveDescriptionChange(desc, initEvent.id) : null)}
        />
      </div>
      {edit ? (
        <Textarea
          defaultValue={desc ? desc : ""}
          onChange={(e) => setDesc(e.target.value)}
        ></Textarea>
      ) : (
        <p className={`${desc ? "" : "text-red-500"}`}>
          {desc ? desc : "None"}
        </p>
      )}
    </section>
  );
}
