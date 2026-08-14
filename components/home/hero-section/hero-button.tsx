import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getDashboardPath } from "@/lib/utils";
import { dashboardLink } from "@/app/utils/navbar-utils/nav-links";

export async function BecomeProviderButton() {
  const user = await getCurrentUser();
  const DashboardIcon = dashboardLink.icon;

  const href = user
    ? getDashboardPath(user.role)
    : "/auth/register?role=PROVIDER";

  return (
    <Button
      asChild
      variant="outline"
      className="bg-accent px-6 py-3 font-semibold"
    >
      <Link href={href}>
        {user ? (
          <>
            <DashboardIcon className="h-4 w-4" />
            Go to Dashboard
          </>
        ) : (
          "Become a Provider"
        )}
      </Link>
    </Button>
  );
}
