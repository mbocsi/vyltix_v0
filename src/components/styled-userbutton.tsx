"use client";

import { useTheme } from "next-themes";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function StyledUserButton() {
  const { theme } = useTheme();

  if (theme == "dark") {
    return <UserButton appearance={{ baseTheme: dark }} />;
  } else {
    return <UserButton />;
  }
}
