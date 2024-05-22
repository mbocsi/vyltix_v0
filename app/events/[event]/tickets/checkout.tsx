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
import { buyTickets } from "./actions";

export default function Checkout({
  info,
  name,
  price,
}: {
  info: SectionInfo[];
  name: string;
  price: number;
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
            <DrawerDescription>
              Confirm the following purchase
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {info.map((section) => {
              if (section.quantity > 0) {
                return (
                  <p key={section.id} className="font-thin">
                    {section.quantity}x {section.name}
                  </p>
                );
              }
            })}
          </div>
          <div className="p-4 pb-0">
            <p className="text-opacity-50">Total:</p>
            <p className="text-2xl font-thin">${price}</p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={() => buyTickets(info)}>Purchase</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
