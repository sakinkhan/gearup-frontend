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

const API_BASE = process.env.BACKEND_API_URL;

if (!API_BASE) {
  throw new Error("BACKEND_API_URL is not configured");
}

// Shared: sets cookies + redirects based on user role
const setSessionAndRedirect = async (
  accessToken: string,
  refreshToken: string,
) => {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
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

  const res = await fetch(`${API_BASE}/auth/login`, {
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

export async function registerAction(
  prevState: AuthState | false,
  formData: FormData,
) {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    image: formData.get("image"),
    role: formData.get("role"),
  };

  const res = await fetch(`${API_BASE}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!data.success) {
    return {
      success: false,
      statusCode: data.statusCode,
      message: data.message,
    };
  }

  return {
    success: true,
    statusCode: 201,
    message: "Registration successful",
  };
}
