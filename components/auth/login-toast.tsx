"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function LoginToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");

    if (message === "login-required") {
      toast.error("You must be logged in to view gear details.");
    }
  }, [searchParams]);

  return null;
}
