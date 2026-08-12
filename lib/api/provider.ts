import type { ProviderRentalOrder } from "@/types/provider";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export async function fetchProviderOrders(): Promise<
  ApiEnvelope<ProviderRentalOrder[]>
> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/provider/orders`,
    {
      credentials: "include",
    },
  );

  const body: ApiEnvelope<ProviderRentalOrder[]> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load provider orders");
  }

  return body;
}
