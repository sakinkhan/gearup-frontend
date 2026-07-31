import { getCurrentUser } from "@/app/utils/getCurrentUser";
import { Navbar } from "./navbar";

export async function NavbarWrapper() {
  const user = await getCurrentUser();

  return <Navbar user={user} />;
}
