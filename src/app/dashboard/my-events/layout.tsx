import EventNav from "./event-nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <EventNav />
      {children}
    </>
  );
}
