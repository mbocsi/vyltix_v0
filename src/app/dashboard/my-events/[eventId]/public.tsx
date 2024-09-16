"use client";

import { Button } from "@/components/ui/button";
import { setEventPublic } from "./actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function PublicToggle({
  pub,
  id,
}: {
  pub: boolean;
  id: number;
}) {
  return (
    <div className="inline-flex items-center justify-between space-x-4">
      <p className="text-2xl">Change Event Visibility</p>
      {!pub ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="default">Make event public</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to make this event public?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action can not be undone. Making major changes to this
                event once it is public is limited.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setEventPublic(true, id)}>
                Make public
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button variant="outline" disabled>
          This event is already public
        </Button>
      )}
    </div>
  );
}
