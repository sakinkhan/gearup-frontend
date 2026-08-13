import type { RentalOrder } from "@/types/rental";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

const API_BASE = "/api";

export async function fetchMyRentals(): Promise<ApiEnvelope<RentalOrder[]>> {
  const res = await fetch(`${API_BASE}/rentals`, {
    credentials: "include",
  });

  const body: ApiEnvelope<RentalOrder[]> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load rental history");
  }

  return body;
}

export async function returnRentalOrder(
  rentalOrderId: string,
): Promise<ApiEnvelope<RentalOrder>> {
  const res = await fetch(`${API_BASE}/rentals/${rentalOrderId}/return`, {
    method: "PATCH",
    credentials: "include",
  });

  const body: ApiEnvelope<RentalOrder> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to return rental order");
  }

  return body;
}
