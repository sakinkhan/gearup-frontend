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
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/me`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data.data.profile as CurrentUser;
}
