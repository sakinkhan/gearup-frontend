import { Navbar } from "@/components/ui/navbar";
import { getMe } from "../service/getMe";
import { NavbarWrapper } from "@/components/ui/navbar-wrapper";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <div>
      <NavbarWrapper />
      {children}
    </div>
  );
}
