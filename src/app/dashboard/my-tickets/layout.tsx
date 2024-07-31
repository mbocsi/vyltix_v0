import TicketNav from "./ticket-nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TicketNav />
      {children}
    </>
  );
}
