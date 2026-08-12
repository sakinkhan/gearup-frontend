import { Card } from "@/components/ui/card";

export function CustomerDashboardSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <div>
        <h1 className="text-center text-2xl font-semibold">My Dashboard</h1>

        <p className="mt-3 text-center text-sm text-muted-foreground">
          Track your rentals, payments, and leave reviews once gear is returned.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="h-24 animate-pulse" />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="h-95 animate-pulse" />
        <Card className="h-95 animate-pulse" />
      </div>

      <Card className="h-95 animate-pulse" />
    </div>
  );
}
