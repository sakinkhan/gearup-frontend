import { UserRole } from "./nav-links";

export type NavbarUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string | null;
};
