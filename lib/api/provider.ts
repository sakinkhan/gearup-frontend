import type { ProviderRentalOrder } from "@/types/provider";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
const API_BASE = "/api";

export async function fetchProviderOrders(): Promise<
  ApiEnvelope<ProviderRentalOrder[]>
> {
  const res = await fetch(`${API_BASE}/provider/orders`, {
    credentials: "include",
  });

  const body: ApiEnvelope<ProviderRentalOrder[]> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load provider orders");
  }

  return body;
}
