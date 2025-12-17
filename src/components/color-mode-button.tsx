"use client";

import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function ColorModeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      change mode
    </Button>
  );
}
