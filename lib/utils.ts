import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDashboardPath(role?: string | null) {
  switch (role) {
    case "PROVIDER":
      return "/dashboard/provider";
    case "ADMIN":
      return "/dashboard/admin";
    case "CUSTOMER":
    default:
      return "/dashboard/customer";
  }
}
