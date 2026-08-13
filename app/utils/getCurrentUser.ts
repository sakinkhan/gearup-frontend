import { cookies } from "next/headers";

const API_BASE = process.env.BACKEND_API_URL;

if (!API_BASE) {
  throw new Error("BACKEND_API_URL is not configured");
}

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  image?: string | null;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status: string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE}/users/me`, {
      headers: {
        Cookie: `accessToken=${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data.data.profile as CurrentUser;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return null;
  }
}
