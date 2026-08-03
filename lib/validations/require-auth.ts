import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth/get-current-user";

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return user;
}
