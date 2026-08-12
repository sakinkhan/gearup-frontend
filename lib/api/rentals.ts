import type { RentalOrder } from "@/types/rental";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export async function fetchMyRentals(): Promise<ApiEnvelope<RentalOrder[]>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/rentals`,
    {
      credentials: "include",
    },
  );

  const body: ApiEnvelope<RentalOrder[]> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load rental history");
  }

  return body;
}
