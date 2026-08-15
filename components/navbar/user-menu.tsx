"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LifeBuoy, LogOut, Settings, User } from "lucide-react";
import { toast } from "sonner";
import { logout } from "@/app/service/logout";
import { getInitials } from "@/app/utils/navbar-utils/utils";
import { NavbarUser } from "@/app/utils/navbar-utils/types";
import { useCurrentUser } from "@/hooks/useUser";

type Props = {
  user: NavbarUser;
};

const menuGroups = [
  [
    {
      label: "Profile",
      href: "/profile",
      icon: User,
    },
  ],
  [
    {
      label: "Support",
      href: "/support",
      icon: LifeBuoy,
    },
  ],
];

export default function UserMenu({ user: initialUser }: Props) {
  const { data: currentUser } = useCurrentUser();
  const user = currentUser ?? initialUser;
  const router = useRouter();

  async function handleLogout() {
    await logout();

    toast.success("Logged out successfully");

    router.push("/");

    router.refresh();
  }
  const toProperCase = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

  const roleBadgeClasses = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "border-purple-500 text-purple-600 dark:text-purple-400";

      case "PROVIDER":
        return "border-blue-500 text-blue-600 dark:text-blue-400";

      case "CUSTOMER":
        return "border-green-500 text-green-600 dark:text-green-400";

      default:
        return "border-gray-500 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-10 rounded-full p-0">
          <Avatar className="size-10 border">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />

            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-3 px-2 py-3">
            <Avatar className="size-11">
              <AvatarImage src={user.image ?? undefined} alt={user.name} />

              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
              <span
                className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${roleBadgeClasses(
                  user.role,
                )}`}
              >
                {toProperCase(user.role)}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {menuGroups[0].map(({ href, label, icon: Icon }) => (
            <DropdownMenuItem key={href} asChild className="px-2">
              <Link href={href}>
                <Icon className="size-4" />
                {label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {menuGroups[1].map(({ href, label, icon: Icon }) => (
            <DropdownMenuItem key={href} asChild className="px-2">
              <Link href={href}>
                <Icon className="size-4" />
                {label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onSelect={handleLogout}
          className="px-2"
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
