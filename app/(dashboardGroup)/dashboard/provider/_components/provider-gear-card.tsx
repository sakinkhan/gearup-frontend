"use client";

import Image from "next/image";
import { Pencil, Star, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toNumber, averageRating } from "@/lib/api/gears";
import { getSafeImageUrl } from "@/lib/image-utils";
import { ProviderGear } from "@/lib/api/provider-my-gears";

type ProviderGearCardProps = {
  gear: ProviderGear;
  className?: string;
  onEdit: (gear: ProviderGear) => void;
  onDelete: (gear: ProviderGear) => void;
};

export function ProviderGearCard({
  gear,
  className,
  onEdit,
  onDelete,
}: ProviderGearCardProps) {
  const isAvailable = gear.status === "AVAILABLE" && gear.availableStock > 0;

  const rating = averageRating(gear.reviews);
  const price = toNumber(gear.rentalPricePerDay);

  return (
    <Card
      className={cn(
        "group overflow-hidden pt-0 transition-shadow hover:shadow-md",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        <Image
          src={getSafeImageUrl(gear.image)}
          alt={gear.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Availability */}
        <Badge
          className={cn(
            "absolute left-2 top-2",
            isAvailable ? "bg-primary" : "bg-muted-foreground text-white",
          )}
        >
          {isAvailable
            ? "Available"
            : gear.status === "INACTIVE"
              ? "Inactive"
              : "Unavailable"}
        </Badge>

        {/* Condition */}
        <Badge variant="secondary" className="absolute right-2 top-2">
          {gear.condition === "NEW"
            ? "New"
            : gear.condition === "GOOD"
              ? "Good"
              : gear.condition === "FAIR"
                ? "Fair"
                : "Used"}
        </Badge>
      </div>

      {/* Header */}
      <CardHeader className="gap-1 px-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {gear.categoryName}
          </span>

          {rating != null && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </span>
          )}
        </div>

        <h3 className="line-clamp-1 text-base font-semibold">{gear.name}</h3>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-4">
        <p className="mb-1 text-sm font-medium text-muted-foreground">
          {gear.brand}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {gear.description}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Stock:{" "}
            <span className="font-medium text-foreground">
              {gear.availableStock}/{gear.stock}
            </span>
          </span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between gap-3 px-4 pb-4">
        <div>
          <span className="text-lg font-bold">${price}</span>
          <span className="text-sm text-muted-foreground">/day</span>
        </div>

        <div className="flex items-center gap-1">
          {/* Edit button */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={(event) => {
              event.preventDefault();
              onEdit(gear);
            }}
          >
            <Pencil className="size-3.5" />
            <span className="sr-only">Edit {gear.name}</span>
          </Button>
          {/* Delete button */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8 text-destructive hover:text-destructive"
            onClick={(event) => {
              event.preventDefault();
              onDelete(gear);
            }}
          >
            <Trash2 className="size-3.5" />
            <span className="sr-only">Delete {gear.name}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
