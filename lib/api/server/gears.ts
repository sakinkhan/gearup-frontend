import { cookies } from "next/headers";
import type { Gear } from "@/types/gear";

export async function fetchGearById(id: string): Promise<Gear> {
  const API_URL = process.env.BACKEND_API_URL;

  if (!API_URL) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/gears/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("FETCH GEAR BY ID FAILED:", res.status, result);
    throw new Error(result?.message || "Failed to fetch gear");
  }

  return result.data;
}
