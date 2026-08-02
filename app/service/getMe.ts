"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const getMe = async () => {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_BACKEND_API_URL is not set. Check .env.local exists in the project root and restart the dev server.",
    );
  }

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");
  if (!accessToken?.value) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      Cookie: `accessToken=${accessToken.value}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("getMe failed:", res.status, errorBody);
    throw new Error("Failed to fetch user data");
  }

  return res.json();
};
