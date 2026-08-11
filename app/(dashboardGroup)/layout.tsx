import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </header>
          <main className="flex-1 p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default DashboardLayout;
