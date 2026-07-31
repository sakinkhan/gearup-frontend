import { PackageSearch } from "lucide-react";
import { Gear } from "@/types/gear";
import { GearCard } from "./gear-card";

export function GearGrid({ gears }: { gears: Gear[] }) {
  if (gears.length === 0) {
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {gears.map((gear) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
}
