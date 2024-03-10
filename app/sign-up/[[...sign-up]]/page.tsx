"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {theme == "dark" ? (
        <SignUp
          appearance={{ baseTheme: dark }}
          unsafeMetadata={{ type: "customer" }}
        />
      ) : (
        <SignUp unsafeMetadata={{ type: "customer" }} />
      )}
    </div>
  );
}
