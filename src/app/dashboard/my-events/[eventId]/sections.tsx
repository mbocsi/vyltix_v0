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
import { Event, Section } from "./page";
import Edit from "./edit";

export default function Sections({
  initSections,
}: {
  initSections: Section[];
}) {
  const [sections, setSections] = useState(initSections);
  const [edit, setEdit] = useState(false);
  const admissions = sections.reduce(
    (partialSum: number, a: any) => partialSum + a.admissions,
    0,
  );
  const capacity = sections.reduce(
    (partialSum: number, a: any) => partialSum + a.capacity,
    0,
  );
  let totalRevenue = 0;
  return (
    <section
      className={`flex flex-col p-2 space-y-4 rounded-lg ${
        edit
          ? "dark:bg-zinc-900 bg-zinc-100 border-2 border-orange-500 border-opacity-50"
          : ""
      }`}
    >
      <div className="flex flex-row space-x-4 items-center">
        <h1 className="text-2xl">Sections</h1>
        <Edit
          edit={edit}
          setEdit={setEdit}
          func={() => saveSectionChanges(sections)}
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
            {sections.map((section: Section, index: number) => {
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
          sections={sections}
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

    const newSections = sections.map((section: Object, i) =>
      index == i ? { ...section, [name]: val } : section,
    );
    setSections((prev: any) => {
      return { ...prev, sections: newSections };
    });
  }
}

function StaticContent({
  sections,
  admissions,
  capacity,
}: {
  sections: Section[];
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
        {sections.map((section: Section) => {
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
