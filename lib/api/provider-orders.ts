import type { ProviderRentalOrder, RentalStatus } from "@/types/provider";
const API_BASE = "/api";
export async function fetchProviderOrders(): Promise<ProviderRentalOrder[]> {
  const response = await fetch(`${API_BASE}/provider/orders`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch provider orders");
  }

  return result.data;
}

export async function updateProviderOrderStatus(
  orderId: string,
  status: RentalStatus,
): Promise<ProviderRentalOrder> {
  const response = await fetch(`${API_BASE}/provider/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      status,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update order status");
  }

  return result.data;
}
