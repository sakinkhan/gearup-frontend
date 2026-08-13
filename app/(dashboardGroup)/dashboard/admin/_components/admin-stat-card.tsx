import Link from "next/link";
import { ArrowUpRight, Users, Package, ClipboardList } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type AdminStatCardProps = {
  title: string;
  value: number;
  description: string;
  href: string;
  icon: React.ElementType;
};

export function AdminStatCard({
  title,
  value,
  description,
  href,
  icon: Icon,
}: AdminStatCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm font-medium">{title}</p>

            <p className="text-3xl font-bold tracking-tight">{value}</p>

            <p className="text-muted-foreground text-sm">{description}</p>
          </div>

          <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
            <Icon className="size-5" />
          </div>
        </div>

        <Link
          href={href}
          className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          View details
          <ArrowUpRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
