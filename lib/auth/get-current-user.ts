import { cookies } from "next/headers";

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
  const API_URL = process.env.BACKEND_API_URL;

  if (!API_URL) {
    console.error("BACKEND_API_URL is not configured");
    return null;
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return null;
    }

    const res = await fetch(`${API_URL}/users/me`, {
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
