"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { saveSectionChanges } from "./actions";
import { Event } from "./page";
import Edit from "./edit";

export default function Sections({ initEvent }: { initEvent: Event }) {
  const [event, setEvent] = useState(initEvent);
  const [edit, setEdit] = useState(false);
  const admissions = event.sections.reduce(
    (partialSum: number, a: any) => partialSum + a.admissions,
    0
  );
  const capacity = event.sections.reduce(
    (partialSum: number, a: any) => partialSum + a.capacity,
    0
  );
  let totalRevenue = 0;
  return (
    <section
      className={`flex flex-col p-2 space-y-4 rounded-lg ${
        edit ? "bg-zinc-900 border-2 border-orange-500 border-opacity-50" : ""
      }`}
    >
      <div className="flex flex-row space-x-4 items-center">
        <h1 className="text-2xl">Sections</h1>
        <Edit
          edit={edit}
          setEdit={setEdit}
          func={() => saveSectionChanges(event)}
        />
      </div>
      {edit ? (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Section Name</TableHead>
              <TableHead>Admissions</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Price/Ticket ($)</TableHead>
              <TableHead>Revenue ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {event.sections.map((section: any, index: number) => {
              const revenue = parseFloat(section.price) * section.admissions;
              totalRevenue += revenue;
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {" "}
                    <Input
                      defaultValue={section.name}
                      className="w-min"
                      name="name"
                      onChange={(e) => handleSectionChange(e, index)}
                    />
                  </TableCell>
                  <TableCell>{section.admissions}</TableCell>
                  <TableCell>
                    <Input
                      defaultValue={section.capacity}
                      className="w-1/2"
                      name="capacity"
                      onChange={(e) => handleSectionChange(e, index)}
                    />
                  </TableCell>
                  <TableCell className="flex flex-row items-center">
                    $<Input defaultValue={section.price} className="w-1/2" />
                  </TableCell>
                  <TableCell>${revenue}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{admissions}</TableCell>
              <TableCell>{capacity}</TableCell>
              <TableCell></TableCell>
              <TableCell>${totalRevenue}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <StaticContent
          event={event}
          admissions={admissions}
          capacity={capacity}
        />
      )}
    </section>
  );
  function handleSectionChange(e: any, index: number) {
    const {
      name,
      value,
    }: { name: "name" | "capacity" | "price"; value: string } = e.target;
    console.log(value);
    let val: string | number = value;
    if (name != "name") {
      val = parseInt(value);
    }

    const newSections = event.sections.map((section: Object, i) =>
      index == i ? { ...section, [name]: val } : section
    );
    setEvent((prev: any) => {
      return { ...prev, sections: newSections };
    });
  }
}

function StaticContent({
  event,
  admissions,
  capacity,
}: {
  event: Event;
  admissions: number;
  capacity: number;
}) {
  let totalRevenue = 0;
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Section Name</TableHead>
          <TableHead>Admissions</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Price/Ticket ($)</TableHead>
          <TableHead>Revenue ($)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {event.sections.map((section: any) => {
          const revenue = parseFloat(section.price) * section.admissions;
          totalRevenue += revenue;
          return (
            <TableRow key={section.name}>
              <TableCell className="font-medium">{section.name}</TableCell>
              <TableCell>{section.admissions}</TableCell>
              <TableCell>{section.capacity}</TableCell>
              <TableCell>${section.price}</TableCell>
              <TableCell>${revenue}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>{admissions}</TableCell>
          <TableCell>{capacity}</TableCell>
          <TableCell></TableCell>
          <TableCell>${totalRevenue}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
