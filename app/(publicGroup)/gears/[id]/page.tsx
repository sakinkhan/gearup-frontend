import { notFound } from "next/navigation";
import { fetchGearById } from "@/lib/api/gears";
import { Badge } from "@/components/ui/badge";
import { GearGallery } from "@/components/gears/gear-gallery";
import { GearSpecs } from "@/components/gears/gear-specs";
import { RentNowCard } from "@/components/gears/rent-now-card";
import { ProviderInfo } from "@/components/gears/provider-info";

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let gear;
  try {
    gear = await fetchGearById(id);
  } catch {
    notFound();
  }

  if (!gear) {
    notFound();
  }

  const isAvailable = gear.status === "AVAILABLE" && gear.availableStock > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <GearGallery image={gear.image} name={gear.name} />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{gear.categoryName}</Badge>
              <Badge
                className={isAvailable ? "bg-primary" : "bg-muted-foreground"}
              >
                {isAvailable
                  ? "Available"
                  : gear.status === "INACTIVE"
                    ? "Inactive"
                    : "Unavailable"}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold">{gear.name}</h1>
            <p className="text-sm text-muted-foreground">{gear.brand}</p>
            <p className="text-muted-foreground">{gear.description}</p>
          </div>

          <GearSpecs gear={gear} />
          <ProviderInfo provider={gear.provider} />
        </div>

        <div className="lg:sticky lg:top-20 lg:h-fit">
          <RentNowCard gear={gear} />
        </div>
      </div>
    </div>
  );
}
