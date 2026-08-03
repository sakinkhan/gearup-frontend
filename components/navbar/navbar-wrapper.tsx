import { getCurrentUser } from "@/app/utils/getCurrentUser";
import { Navbar } from "../navbar/navbar";

export async function NavbarWrapper() {
  let user = null;

  try {
    user = await getCurrentUser();
  } catch (err) {
    console.error("NavbarWrapper: failed to load current user", err);
  }

  return <Navbar user={user} />;
}
