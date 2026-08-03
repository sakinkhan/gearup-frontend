import { UserRole } from "./nav-links";

export function roleBadgeClasses(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "bg-primary/20 text-primary";

    case "PROVIDER":
      return "bg-secondary text-secondary-foreground";

    default:
      return "bg-muted text-muted-foreground";
  }
}
