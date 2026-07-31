import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

type UserPayload = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
};

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return null;
  }

  try {
    return jwtDecode<UserPayload>(token);
  } catch {
    return null;
  }
}
