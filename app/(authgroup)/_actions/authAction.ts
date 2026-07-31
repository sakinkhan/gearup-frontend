"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

export type AuthState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
};

// Shared: sets cookies + redirects based on decoded role
const setSessionAndRedirect = async (
  accessToken: string,
  refreshToken: string,
) => {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  const decodedToken = jwt.decode(accessToken) as JwtPayload;

  if (decodedToken.role === "CUSTOMER") {
    redirect("/dashboard/customer", "replace");
  } else if (decodedToken.role === "PROVIDER") {
    redirect("/dashboard/provider", "replace");
  } else if (decodedToken.role === "ADMIN") {
    redirect("/dashboard/admin", "replace");
  }
};

export const loginAction = async (
  prevState: AuthState | false,
  formData: FormData,
): Promise<AuthState> => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = { email, password };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    await setSessionAndRedirect(
      result.data.accessToken,
      result.data.refreshToken,
    );
  }

  return result;
};

export const registerAction = async (
  prevState: AuthState | false,
  formData: FormData,
): Promise<AuthState> => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const image = formData.get("image");
  const role = formData.get("role");

  const payload = { name, email, password, image, role };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    await setSessionAndRedirect(
      result.data.accessToken,
      result.data.refreshToken,
    );
  }

  return result;
};
