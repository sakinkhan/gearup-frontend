"use server";

import { cookies } from "next/headers";

const API_BASE = process.env.BACKEND_API_URL;

if (!API_BASE) {
  throw new Error("BACKEND_API_URL is not configured");
}

type GetMeResult =
  | { success: true; data: any }
  | { success: false; message: string };

export const getMe = async (): Promise<GetMeResult> => {
  if (!API_BASE) {
    throw new Error(
      "API_BASE is not set. Check .env.local exists in the project root and restart the dev server.",
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

  try {
    const res = await fetch(`${API_BASE}/users/me`, {
      headers: {
        Cookie: `accessToken=${accessToken.value}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("getMe failed:", res.status, errorBody);
      return {
        success: false,
        message:
          res.status === 401
            ? "Session expired, please log in again"
            : "Failed to fetch user data",
      };
    }

    const json = await res.json();
    return {
      success: true,
      data: json.data ?? json,
    };
  } catch (err) {
    console.error("getMe network error:", err);
    return {
      success: false,
      message: "Unable to reach server",
    };
  }
};
