"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { saveNameChange } from "./actions";
import Edit from "./edit";

export default function Name({
  initName,
  eventId,
}: {
  initName: string;
  eventId: number;
}) {
  const [name, setName] = useState(initName);
  const [edit, setEdit] = useState(false);
  return (
    <section className="pb-8">
      <div className="flex flex-row space-x-4 items-center">
        {edit ? (
          <Input
            className="text-2xl"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
        ) : (
          <h1 className="text-3xl">{name}</h1>
        )}

        <Edit
          edit={edit}
          setEdit={setEdit}
          func={() => saveNameChange(name, eventId)}
        />
      </div>
    </section>
  );
}
