"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  User,
  Settings,
  CreditCard,
  LifeBuoy,
  LogOut,
  HomeIcon,
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/app/service/logout";
import { toast } from "sonner";

// Roles supported by the app
type UserRole = "customer" | "provider" | "admin";

// Maps each role to its dashboard route
const dashboardRouteByRole: Record<UserRole, string> = {
  customer: "/dashboard/customer",
  provider: "/dashboard/provider",
  admin: "/dashboard/admin",
};

// User dropdown options, grouped for the menu.
const userMenuGroups = [
  [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Billing", href: "/billing", icon: CreditCard },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
  [{ label: "Support", href: "/support", icon: LifeBuoy }],
];

// TODO: replace this whole block with real auth state, e.g.:
// const { user, isLoggedIn } = useAuth();
// where user.role comes from your decoded JWT / session payload.
const isLoggedIn = false;
const user = {
  name: "Ava Carter",
  email: "ava@example.com",
  avatar: "/user-avatar.png",
  role: "customer" as UserRole,
};

type IUser = {
  success: boolean;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

type NavbarProps = {
  user: IUser;
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  console.log(user);

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully");
      router.push("/auth/login");
    }
  };
  const pathname = usePathname();

  // Dashboard route depends on the logged-in user's role.
  const dashboardHref =
    dashboardRouteByRole[user.data?.profile?.role as UserRole];

  // Base nav links (always visible)
  const navLinks = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Gears", href: "/gears", icon: FolderKanban },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logo-transparent.png"
            width={120}
            height={50}
            alt="Logo"
          />
          {/* <img src="Logo-transparent.png" alt="Logo" className="w-30" /> */}
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive &&
                      "bg-accent text-primary-foreground dark:text-primary",
                  )}
                >
                  <Link href={link.href}>
                    <Icon
                      className={cn("size-4", isActive && "text-primary")}
                    />
                    {link.label}
                  </Link>
                </Button>
              </li>
            );
          })}

          {/* Dashboard link — only visible when logged in, route depends on role */}
          {isLoggedIn && (
            <li key={dashboardHref}>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  "hover:bg-accent hover:text-accent-foreground",
                  pathname === dashboardHref &&
                    "bg-accent text-primary-foreground",
                )}
              >
                <Link href={dashboardHref}>
                  <LayoutDashboard
                    className={cn(
                      "size-4",
                      pathname === dashboardHref && "text-primary",
                    )}
                  />
                  Dashboard
                </Link>
              </Button>
            </li>
          )}
        </ul>

        {/* Auth area: user dropdown when logged in, Login/Register when not */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="size-9 rounded-full p-0 ring-offset-background hover:ring-2 hover:ring-ring"
                >
                  <Avatar className="size-9">
                    <AvatarImage
                      src={
                        user.data?.profile?.profile?.profilePhoto ||
                        "/placeholder.svg"
                      }
                      alt={user.data?.profile?.name || "User Avatar"}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                      {user.data?.profile?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-popover text-popover-foreground"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      {user.data?.profile?.name}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {user.data?.profile?.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                {userMenuGroups.map((group, i) => (
                  <div key={i}>
                    <DropdownMenuGroup>
                      {group.map((item) => {
                        const Icon = item.icon;
                        return (
                          <DropdownMenuItem
                            key={item.href}
                            asChild
                            className="focus:bg-accent focus:text-accent-foreground"
                          >
                            <Link href={item.href}>
                              <Icon className="size-4" />
                              {item.label}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-border" />
                  </div>
                ))}
                <DropdownMenuItem
                  variant="destructive"
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onSelect={() => console.log("[v0] Sign out clicked")}
                >
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
              <Button
                size="sm"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
