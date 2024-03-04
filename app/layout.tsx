import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vyltix",
  description: "Buy concert tickets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar></Navbar>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
