import type { Payment } from "@/types/payment";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export async function fetchMyPayments(): Promise<ApiEnvelope<Payment[]>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
    credentials: "include",
  });

  const body: ApiEnvelope<Payment[]> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load payment history");
  }

  return body;
}
