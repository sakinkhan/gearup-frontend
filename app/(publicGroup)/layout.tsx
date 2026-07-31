import { Navbar } from "@/components/ui/navbar";
import { getMe } from "../service/getMe";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
}
