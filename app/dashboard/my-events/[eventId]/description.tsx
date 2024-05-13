"use client";

import { Button } from "@/components/ui/button";
import { CgAddR } from "react-icons/cg";
import { useState } from "react";
import { saveDescriptionChange } from "./actions";
import { Event } from "./page";
import { Textarea } from "@/components/ui/textarea";

export default function Description({ initEvent }: { initEvent: Event }) {
  const [desc, setDesc] = useState(initEvent.description);
  const [edit, setEdit] = useState(false);
  return (
    <section
      className={`flex flex-col p-2 space-y-4 rounded-lg ${
        edit ? "bg-zinc-900 border-2 border-orange-500 border-opacity-50" : ""
      }`}
    >
      <div className="flex flex-row space-x-4 items-center">
        <h1 className="text-2xl">Description</h1>
        {edit ? (
          <>
            <Button
              className="flex px-4 rounded-lg flex-row items-center gap-2"
              onClick={() => {
                desc ? saveDescriptionChange(desc, initEvent.id) : null;
                setEdit((prev) => !prev);
              }}
            >
              <CgAddR size={25} />
              <p className="whitespace-nowrap">Save</p>
            </Button>
            <Button
              className="flex px-4 rounded-lg flex-row items-center gap-2"
              onClick={() => {
                setEdit((prev) => !prev);
              }}
              variant="destructive"
            >
              <p className="whitespace-nowrap">Discard Changes</p>
            </Button>
          </>
        ) : (
          <Button
            className="flex px-4 rounded-lg flex-row items-center gap-2"
            onClick={() => {
              setEdit((prev) => !prev);
            }}
          >
            <CgAddR size={25} />
            <p className="whitespace-nowrap">Edit</p>
          </Button>
        )}
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
