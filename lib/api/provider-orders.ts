export type RentalStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "CONFIRMED"
  | "PICKED_UP"
  | "RETURNED"
  | "COMPLETED"
  | "CANCELLED";

export interface ProviderOrder {
  id: string;
  customerId: string;
  status: RentalStatus;

  rentalStartDate: string;
  rentalEndDate: string;

  totalAmount: string;
  totalDays: number;

  notes: string;

  createdAt: string;
  updatedAt: string;

  customer?: {
    id: string;
    name: string;
    email: string;
  };

  rentalItems: {
    id: string;
    quantity: number;

    gearItem: {
      id: string;
      name: string;
      image: string;
    };
  }[];
}

export interface UpdateOrderStatusPayload {
  status: RentalStatus;
}

export async function fetchProviderOrders(): Promise<ProviderOrder[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/provider/orders`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch provider orders");
  }

  return result.data;
}

export async function updateProviderOrderStatus(
  orderId: string,
  status: RentalStatus,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/provider/orders/${orderId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        status,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update order status");
  }

  return result.data;
}
