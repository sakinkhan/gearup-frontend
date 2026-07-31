"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export type AuthState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
};

type TokenPayload = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
};

// Shared: sets cookies + redirects based on user role
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

  let decodedToken: TokenPayload;

  try {
    decodedToken = jwtDecode<TokenPayload>(accessToken);
  } catch (error) {
    console.error("JWT decode failed:", error);
    redirect("/auth/login");
  }

  switch (decodedToken.role) {
    case "CUSTOMER":
      redirect("/");

    case "PROVIDER":
      redirect("/dashboard/provider");

    case "ADMIN":
      redirect("/dashboard/admin");

    default:
      redirect("/auth/login");
  }
};

export const loginAction = async (
  prevState: AuthState | false,
  formData: FormData,
): Promise<AuthState> => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
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

  const payload = {
    name,
    email,
    password,
    image,
    role,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
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
