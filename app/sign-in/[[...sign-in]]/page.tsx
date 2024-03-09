"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {theme == "dark" ? (
        <SignIn appearance={{ baseTheme: dark }} />
      ) : (
        <SignIn />
      )}
    </div>
  );
}
