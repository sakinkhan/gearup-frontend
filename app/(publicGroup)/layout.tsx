import { NavbarWrapper } from "@/components/navbar/navbar-wrapper";
import { Footer } from "@/components/ui/footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarWrapper />
      {children}
      <Footer />
    </div>
  );
}
