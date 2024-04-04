import { getEvent } from "@/lib/dbrequests";
import { auth } from "@clerk/nextjs";
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

export default async function Event({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const { eventId } = params;
  const { userId } = auth();
  let event;
  if (userId && eventId) {
    event = await getEvent(parseInt(eventId), userId);
  }

  if (event) {
    const admissions = event.sections.reduce(
      (partialSum, a) => partialSum + a.admissions,
      0
    );
    const capacity = event.sections.reduce(
      (partialSum, a) => partialSum + a.capacity,
      0
    );
    let totalRevenue = 0;
    return (
      <main className="flex min-h-screen flex-col items-center p-36">
        <h1 className="text-3xl pb-8">{event.name}</h1>
        <div className="w-full flex flex-col space-y-4 px-8">
          <h1 className="text-xl">Sections</h1>
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
              {event.sections.map((section) => {
                const revenue = parseFloat(section.price) * section.admissions;
                totalRevenue += revenue;
                return (
                  <TableRow key={section.name}>
                    <TableCell className="font-medium">
                      {section.name}
                    </TableCell>
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
        </div>
      </main>
    );
  }
}
