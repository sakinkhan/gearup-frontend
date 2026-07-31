"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");
  if (!accessToken?.value) {
    //
    return {
      success: false,
      message: "User not logged in",
    };
  }
  console.log("Token being sent:", accessToken.value);

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
    headers: {
      // Authorization: `Bearer ${accessToken.value}`,
      Cookie: `accessToken=${accessToken.value}`,
    },
    cache: "no-store",
    next: {
      revalidate: 60 * 60 * 24, // Revalidate every 24 hours
      tags: ["my-profile"],
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("getMe failed:", res.status, errorBody);
    throw new Error("Failed to fetch user data");
  }

  return res.json();
};
