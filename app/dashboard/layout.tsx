import DashboardNav from "@/components/dashboard-navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNav />
      {children}
    </>
  );
}
