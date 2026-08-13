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

const API_URL = process.env.BACKEND_API_URL;

if (!API_URL) {
  throw new Error("BACKEND_API_URL is not configured");
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data.data.profile as CurrentUser;
}
