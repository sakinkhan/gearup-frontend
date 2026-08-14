import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { GearGallery } from "@/app/(publicGroup)/gears/_components/gear-gallery";
import { GearSpecs } from "@/app/(publicGroup)/gears/_components/gear-specs";
import { RentNowCard } from "@/app/(publicGroup)/gears/_components/rent-now-card";
import { ProviderInfo } from "@/app/(publicGroup)/gears/_components/provider-info";
import { requireAuth } from "@/lib/validations/require-auth";
import { fetchGearById } from "@/lib/api/server/gears";
import { GearReviews } from "@/app/(publicGroup)/gears/_components/gear-reviews";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GearDetailsPage({ params }: Props) {
  const { id } = await params;

  await requireAuth(`/gears/${id}`);

  let gear;

  try {
    gear = await fetchGearById(id);
  } catch (error) {
    console.error("FETCH GEAR ERROR:", error);
    throw error;
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
                className={
                  isAvailable ? "bg-primary" : "bg-muted-foreground text-white"
                }
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
          <GearReviews reviews={gear.reviews} />
        </div>

        <div className="lg:sticky lg:top-20 lg:h-fit">
          <RentNowCard gear={gear} />
        </div>
      </div>
    </div>
  );
}
