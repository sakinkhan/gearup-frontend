import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { fetchGearById } from "@/lib/api/gears";
import { averageRating } from "@/lib/api/gears";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GearGallery } from "@/components/gears/gear-gallery";
import { GearSpecs } from "@/components/gears/gear-specs";
import { RentNowCard } from "@/components/gears/rent-now-card";

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

  const isAvailable = gear.status === "AVAILABLE" && gear.availableStock > 0;

  const rating = averageRating(gear.reviews);

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
                  isAvailable
                    ? "bg-green-600 hover:bg-green-600"
                    : "bg-muted-foreground"
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
            {rating != null && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                {rating.toFixed(1)} ({gear.reviews.length} review
                {gear.reviews.length !== 1 ? "s" : ""})
              </span>
            )}
            <p className="text-muted-foreground">{gear.description}</p>
          </div>

          <GearSpecs gear={gear} />

          <div className="flex items-center gap-3 rounded-lg border p-4">
            <Avatar className="size-12">
              <AvatarImage
                src={gear.provider.image ?? ""}
                alt={gear.provider.name}
              />
              <AvatarFallback>
                {gear.provider.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{gear.provider.name}</p>
              <p className="text-sm text-muted-foreground">
                {gear.provider.email}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:h-fit">
          <RentNowCard gear={gear} />
        </div>
      </div>
    </div>
  );
}
