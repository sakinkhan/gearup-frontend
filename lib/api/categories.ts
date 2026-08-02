import type { ApiResponse } from "@/types/gear";
import type { Category } from "@/types/category";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000/api";

export async function fetchCategories(): Promise<ApiResponse<Category[]>> {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
