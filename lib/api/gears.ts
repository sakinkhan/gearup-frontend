import type { ApiResponse, Gear, GearFilters } from "@/types/gear";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000/api";

function buildQuery(filters: GearFilters = {}) {
  const params = new URLSearchParams();

  if (filters.search?.trim()) {
    params.set("search", filters.search.trim());
  }

  if (filters.categoryName) {
    params.set("categoryName", filters.categoryName);
  }

  if (filters.brand) {
    params.set("brand", filters.brand);
  }

  if (filters.minPrice !== undefined && filters.minPrice !== null) {
    params.set("minPrice", String(filters.minPrice));
  }

  if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
    params.set("maxPrice", String(filters.maxPrice));
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.startDate) {
    params.set("startDate", filters.startDate);
  }

  if (filters.endDate) {
    params.set("endDate", filters.endDate);
  }

  if (filters.page) {
    params.set("page", String(filters.page));
  }

  return params.toString();
}

// Public API
export async function fetchGears(
  filters: GearFilters = {},
): Promise<ApiResponse<Gear[]>> {
  const query = buildQuery(filters);

  const url = `${API_URL}/gears${query ? `?${query}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("FETCH GEARS FAILED:", res.status, errorBody);
    throw new Error(`Failed to fetch gears (${res.status})`);
  }

  return res.json();
}

export function toNumber(value: string | number): number {
  return typeof value === "number" ? value : Number(value);
}

export function averageRating(reviews: { rating: number }[]): number | null {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);

  return total / reviews.length;
}
