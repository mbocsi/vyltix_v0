"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { saveNameChange } from "./actions";
import { Event } from "./page";
import Edit from "./edit";

export default function Name({ initEvent }: { initEvent: Event }) {
  const [name, setName] = useState(initEvent.name);
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
          func={() => saveNameChange(name, initEvent.id)}
        />
      </div>
    </section>
  );
}
