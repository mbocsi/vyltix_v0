"use client";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SectionInfo } from "./sections";

export default function Checkout({
  info,
  name,
}: {
  info: SectionInfo[];
  name: string;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Checkout!</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full flex flex-col max-w-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>Purchasing tickets for {name}</DrawerTitle>
            <DrawerDescription>Purchase tickets</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Purchase</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
