import { PackageSearch, AlertTriangle } from "lucide-react";
import { Gear } from "@/types/gear";
import { GearCard } from "./gear-card";
import { GearCardSkeleton } from "./gear-card-skeleton";
import { Button } from "@/components/ui/button";

type GearGridProps = {
  gears?: Gear[];
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  total?: number;
};

export function GearGrid({
  gears,
  isLoading,
  isFetching,
  isError,
  onRetry,
}: GearGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <GearCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-24 text-center">
        <AlertTriangle className="size-10 text-destructive" />
        <div>
          <p className="font-medium text-foreground">Something went wrong</p>
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t load gears right now.
          </p>
        </div>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        )}
      </div>
    );
  }

  if (!gears || gears.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-24 text-center">
        <PackageSearch className="size-10 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">No gear found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        isFetching
          ? "grid grid-cols-1 gap-4 opacity-60 transition-opacity sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }
    >
      {gears.map((gear) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
}
