"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CreditCard,
  FolderKanban,
  HomeIcon,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  User,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { logout } from "@/app/service/logout";
import { toast } from "sonner";

type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

const dashboardRouteByRole: Record<UserRole, string> = {
  CUSTOMER: "/dashboard/customer",
  PROVIDER: "/dashboard/provider",
  ADMIN: "/dashboard/admin",
};

const userMenuGroups = [
  [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Billing", href: "/billing", icon: CreditCard },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
  [{ label: "Support", href: "/support", icon: LifeBuoy }],
];

type NavbarUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string | null;
};

type NavbarProps = {
  user: NavbarUser | null;
};

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoggedIn = !!user;

  const dashboardHref = user ? dashboardRouteByRole[user.role] : "";

  const navLinks = [
    {
      label: "Home",
      href: "/",
      icon: HomeIcon,
    },
    {
      label: "Gears",
      href: "/gears",
      icon: FolderKanban,
    },
  ];

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully");

    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo-transparent.png"
            width={120}
            height={50}
            alt="GearUp Logo"
          />
        </Link>

        {/* Navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;

            return (
              <li key={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(active && "bg-accent text-primary")}
                >
                  <Link href={link.href}>
                    <Icon className="size-4" />
                    {link.label}
                  </Link>
                </Button>
              </li>
            );
          })}

          {isLoggedIn && (
            <li>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  pathname === dashboardHref && "bg-accent text-primary",
                )}
              >
                <Link href={dashboardHref}>
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
              </Button>
            </li>
          )}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-9 rounded-full p-0">
                  <Avatar className="size-9">
                    <AvatarImage src={user.image || ""} alt={user.name} />

                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                {/* User info */}
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{user.name}</span>

                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Middle menu */}
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/billing">
                      <CreditCard className="size-4" />
                      Billing
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="size-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Bottom logout */}
                <DropdownMenuItem variant="destructive" onSelect={handleLogout}>
                  <LogOut className="size-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>

              <Button size="sm" asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
