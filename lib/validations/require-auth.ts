import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export async function requireAuth(redirectPath?: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(
      redirectPath
        ? `/auth/login?message=login-required&redirect=${redirectPath}`
        : "/auth/login",
    );
  }

  return user;
}
