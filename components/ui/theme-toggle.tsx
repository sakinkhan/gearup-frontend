"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="size-9" disabled />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9 hover:bg-accent hover:text-accent-foreground"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <SunIcon className="size-4 scale-100 dark:scale-0 transition-transform" />
      <MoonIcon className="absolute size-4 scale-0 dark:scale-100 transition-transform" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
