export interface ProviderGearReview {
  id: string;
  customerId: string;
  gearItemId: string;
  rentalOrderId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ProviderGear {
  id: string;
  providerId: string;
  categoryName: string;
  name: string;
  brand: string;
  description: string;
  rentalPricePerDay: string;
  depositAmount: string;
  stock: number;
  availableStock: number;
  condition: "NEW" | "GOOD" | "FAIR" | "USED";
  status: "AVAILABLE" | "UNAVAILABLE" | "INACTIVE";
  image: string;
  createdAt: string;
  updatedAt: string;
  reviews: ProviderGearReview[];
}

interface ProviderMyGearsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProviderGear[];
}

export async function fetchProviderMyGears(): Promise<ProviderGear[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/provider/my-gears`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  const result: ProviderMyGearsResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch your gears");
  }

  return result.data;
}

export interface UpdateGearPayload {
  categoryName?: string;
  name?: string;
  brand?: string;
  description?: string;
  rentalPricePerDay?: number;
  depositAmount?: number;
  stock?: number;
  condition?: "NEW" | "GOOD" | "FAIR" | "USED";
  status?: "AVAILABLE" | "UNAVAILABLE" | "INACTIVE";
  image?: string;
}

export async function updateProviderGear(
  id: string,
  payload: UpdateGearPayload,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/provider/gear/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update gear");
  }

  return result.data;
}

export async function deleteProviderGear(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/provider/gear/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to delete gear");
  }

  return result.data;
}

export interface CreateGearPayload {
  categoryName: string;
  name: string;
  brand: string;
  description: string;
  rentalPricePerDay: number;
  depositAmount: number;
  stock: number;
  availableStock: number;
  condition: "NEW" | "GOOD" | "FAIR" | "USED";
  status: "AVAILABLE" | "UNAVAILABLE" | "INACTIVE";
  image: string;
}

export async function createProviderGear(payload: CreateGearPayload) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/provider/gear`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to create gear");
  }

  return result.data;
}
