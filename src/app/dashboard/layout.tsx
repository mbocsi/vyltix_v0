import DashboardNav from "@/components/dashboard-navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNav />
      <div className="pl-72 pr-24 pt-36">{children}</div>
    </>
  );
}
