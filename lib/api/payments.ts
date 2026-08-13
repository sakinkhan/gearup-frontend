import type { Payment } from "@/types/payment";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

const API_BASE = "/api";

export async function fetchMyPayments(): Promise<ApiEnvelope<Payment[]>> {
  const res = await fetch(`${API_BASE}/payments`, {
    credentials: "include",
  });

  const body: ApiEnvelope<Payment[]> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load payment history");
  }

  return body;
}

export async function confirmPayment(
  transactionId: string,
): Promise<ApiEnvelope<Payment>> {
  const res = await fetch(`${API_BASE}/payments/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      transactionId,
    }),
  });

  const body: ApiEnvelope<Payment> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to confirm payment");
  }

  return body;
}
