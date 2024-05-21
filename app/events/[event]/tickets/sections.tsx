"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Checkout from "./checkout";

type Section = {
  id: number;
  name: string;
  capacity: number;
  admissions: number;
  price: string;
};
type Sections = Section[];
export type SectionInfo = {
  id: number;
  name: string;
  capacity: number;
  admissions: number;
  price: string;
  quantity: number;
};
export default function Sections({
  sections,
  eventName,
}: {
  sections: Sections;
  eventName: string;
}) {
  sections.sort(
    (sec1, sec2) => parseFloat(sec2.price) - parseFloat(sec1.price),
  );
  const [sectionsInfo, setSectionsInfo] = useState(
    sections.map((section: Section) => {
      return { ...section, quantity: 0 };
    }),
  );
  return (
    <>
      <Table className="w-1/2">
        <TableHeader>
          <TableRow>
            <TableHead>Section Name</TableHead>
            <TableHead>Price/Ticket ($)</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Cost ($)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sectionsInfo.map((section: SectionInfo, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{section.name}</TableCell>
                <TableCell>${section.price}</TableCell>
                <TableCell className="flex flex-row items-center space-x-3">
                  <Button
                    className="rounded-full bg-zinc-500 w-8 h-8 p-0"
                    onClick={() =>
                      setSectionsInfo((prev) => {
                        return prev.map((s) =>
                          section.id == s.id
                            ? { ...s, quantity: Math.max(s.quantity - 1, 0) }
                            : s,
                        );
                      })
                    }
                  >
                    -
                  </Button>
                  <p className="w-4 text-center">{section.quantity}</p>
                  <Button
                    className="rounded-full bg-indigo-500 dark:bg-indigo-500 w-8 h-8 p-0"
                    onClick={() =>
                      setSectionsInfo((prev) => {
                        return prev.map((s) =>
                          section.id == s.id
                            ? { ...s, quantity: Math.min(s.quantity + 1, 10) }
                            : s,
                        );
                      })
                    }
                  >
                    +
                  </Button>
                </TableCell>
                <TableCell>
                  ${parseFloat(section.price) * section.quantity}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              $
              {sectionsInfo.reduce(
                (cur, sec) => sec.quantity * parseFloat(sec.price) + cur,
                0,
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Checkout
        info={sectionsInfo}
        name={eventName}
        price={sectionsInfo.reduce(
          (cur, sec) => sec.quantity * parseFloat(sec.price) + cur,
          0,
        )}
      />
    </>
  );
}
