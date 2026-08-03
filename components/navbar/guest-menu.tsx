"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GuestMenuProps = {
  mobile?: boolean;
};

export default function GuestMenu({ mobile = false }: GuestMenuProps) {
  return (
    <div
      className={cn("flex gap-2", mobile ? "flex-col w-full" : "items-center")}
    >
      <Button
        variant="outline"
        size="sm"
        asChild
        className={cn(mobile && "px-4 py-2 mx-4")}
      >
        <Link href="/auth/login">Login</Link>
      </Button>

      <Button size="sm" asChild className={cn(mobile && "px-4 py-2 mx-4")}>
        <Link href="/auth/register">Register</Link>
      </Button>
    </div>
  );
}
