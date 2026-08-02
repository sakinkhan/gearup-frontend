import type { ApiResponse, Gear, GearFilters } from "@/types/gear";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000/api";

function buildQuery(filters: GearFilters) {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.categoryName) params.set("categoryName", filters.categoryName);
  if (filters.brand) params.set("brand", filters.brand);
  if (filters.minPrice != null)
    params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice != null)
    params.set("maxPrice", String(filters.maxPrice));
  if (filters.status) params.set("status", filters.status);
  if (filters.startDate) params.set("startDate", filters.startDate);
  if (filters.endDate) params.set("endDate", filters.endDate);
  if (filters.page) params.set("page", String(filters.page));
  return params.toString();
}

export async function fetchGears(
  filters: GearFilters = {},
): Promise<ApiResponse<Gear[]>> {
  const query = buildQuery(filters);
  const res = await fetch(`${API_URL}/gears${query ? `?${query}` : ""}`);
  if (!res.ok) throw new Error("Failed to fetch gears");
  return res.json();
}

export async function fetchGearById(id: string): Promise<Gear> {
  const res = await fetch(`${API_URL}/gears/${id}`);
  if (!res.ok) throw new Error("Failed to fetch gear");
  const json: ApiResponse<Gear> = await res.json();
  return json.data;
}

export function toNumber(value: string | number): number {
  return typeof value === "number" ? value : parseFloat(value);
}

export function averageRating(reviews: { rating: number }[]): number | null {
  if (!reviews || reviews.length === 0) return null;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
}
