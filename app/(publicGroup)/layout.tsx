import { NavbarWrapper } from "@/components/ui/navbar-wrapper";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarWrapper />
      {children}
    </div>
  );
}
