"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

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
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ChevronsUpDownIcon,
  CreditCard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { toast } from "sonner";

import { logout } from "@/app/service/logout";
import { getInitials } from "@/app/utils/navbar-utils/utils";
import { roleBadgeClasses } from "@/app/utils/navbar-utils/role-badge";
import { NavbarUser } from "@/app/utils/navbar-utils/types";

type Props = {
  user: NavbarUser;
};

const menuGroups = [
  [{ label: "Profile", href: "/profile", icon: User }],
  [{ label: "Support", href: "/support", icon: LifeBuoy }],
];

export function NavUser({ user }: Props) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  async function handleLogout() {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 p-2"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
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
                    className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${roleBadgeClasses(
                      user.role,
                    )}`}
                  >
                    {user.role.toLowerCase()}
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
              className="px-2"
              onSelect={(e) => {
                e.preventDefault(); // keep menu open after toggling
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </DropdownMenuItem>

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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
