import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          {children}
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default DashboardLayout;
