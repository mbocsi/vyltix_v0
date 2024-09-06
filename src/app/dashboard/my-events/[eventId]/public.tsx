"use client";

import { Button } from "@/components/ui/button";
import { setEventPublic } from "./actions";

export default function PublicToggle({
  pub,
  id,
}: {
  pub: boolean;
  id: number;
}) {
  return (
    <div className="inline-flex items-center justify-between w-1/2 space-x-4">
      <p className="text-2xl">Change Event Visibility</p>
      {!pub ? (
        <Button variant="destructive" onClick={() => setEventPublic(true, id)}>
          Make event public
        </Button>
      ) : (
        <Button variant="outline" disabled>
          This event is already public
        </Button>
      )}
    </div>
  );
}
