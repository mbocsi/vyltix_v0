"use client";

import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createEvent } from "./actions";

const formSchema = z.object({
  eventName: z.string().min(2).max(50),
  eventDescription: z.string().optional(),
  artists: z
    .object({
      name: z.string(),
      description: z.string().optional(),
      social: z.string().optional(),
    })
    .array()
    .min(1),
  venueName: z.string().min(2).max(50),
  venueAddress: z.string().optional(),
  venueDescription: z.string().optional(),
  sections: z
    .object({
      name: z.string(),
      capacity: z.coerce.number(),
      ticketCost: z.coerce.string(),
      description: z.string().optional(),
    })
    .array()
    .min(1),
});

export type createEventData = z.infer<typeof formSchema>;

export default function CreateEvent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artists: [{ name: "", social: "", description: "" }],
      sections: [
        {
          name: "",
          capacity: 100,
          ticketCost: "0",
          description: "",
        },
      ],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createEvent(values);
  }

  const {
    fields: sections,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    name: "sections",
    control: form.control,
  });

  const {
    fields: artists,
    append: appendArtist,
    remove: removeArtist,
  } = useFieldArray({
    name: "artists",
    control: form.control,
  });

  return (
    <main className="flex flex-col items-center gap-12">
      <h1 className="text-3xl">Create An Event</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-4"
        >
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel className="text-2xl">Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your event name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that people will search for when buying
                  tickets for your event
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row space-x-8">
            <div className="space-y-8 flex flex-col w-full">
              <div className="space-y-2">
                <h1 className="text-2xl">Venue</h1>
                <FormField
                  control={form.control}
                  name="venueName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Venue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="venueAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Optional" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <h1 className="text-2xl">Artists</h1>
                {artists.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-4 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg"
                  >
                    <FormField
                      control={form.control}
                      name={`artists.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Artist Name</FormLabel>
                          <FormControl>
                            <div className="flex flex-row w-full space-x-2">
                              <Input placeholder="Artist" {...field} />
                              <Button
                                variant="destructive"
                                type="button"
                                onClick={() => removeArtist(index)}
                              >
                                Remove Artist
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    appendArtist({ name: "", social: "", description: "" })
                  }
                  className="w-full"
                >
                  Add Artist
                </Button>
              </div>

              <Button type="submit">Create Event</Button>
            </div>
            <div className="space-y-4 flex flex-col w-full">
              <h1 className="text-2xl">Sections</h1>
              {sections.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg space-y-2"
                >
                  <FormField
                    control={form.control}
                    name={`sections.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row">
                    <FormField
                      control={form.control}
                      name={`sections.${index}.capacity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Section Capacity</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`sections.${index}.ticketCost`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ticket Cost</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => removeSection(index)}
                  >
                    Remove Section
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  appendSection({
                    name: "",
                    capacity: 100,
                    ticketCost: "0",
                    description: "",
                  })
                }
              >
                Add Section
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}
