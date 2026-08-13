import type { ApiResponse } from "@/types/gear";
import type { Category } from "@/types/category";

const API_BASE = "/api";

const API_URL = API_BASE || "http://localhost:5000/api";

export async function fetchCategories(): Promise<ApiResponse<Category[]>> {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
