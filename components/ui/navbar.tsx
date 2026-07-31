"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
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

// Primary navigation links, kept in an array for easy maintenance.
const navLinks = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Gears", href: "/gears", icon: FolderKanban },
  { label: "Team", href: "/team", icon: Users },
];

// User dropdown options, grouped for the menu.
const userMenuGroups = [
  [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Billing", href: "/billing", icon: CreditCard },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
  [{ label: "Support", href: "/support", icon: LifeBuoy }],
];

const user = {
  name: "Ava Carter",
  email: "ava@example.com",
  avatar: "/user-avatar.png",
};

// TODO: replace with real auth state (e.g. useSession(), useAuth(), or a server-passed prop)
const isLoggedIn = false;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="Logo-transparent.png" alt="Logo" className="w-30" />
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
                    isActive && "bg-accent text-primary-foreground",
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
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                      {user.name
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
                      {user.name}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {user.email}
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
                <Link href="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
