"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toNumber, averageRating } from "@/lib/api/gears";
import type { Gear } from "@/types/gear";
import { getSafeImageUrl } from "@/lib/image-utils";

type GearCardProps = {
  gear: Gear;
  className?: string;
};

export function GearCard({ gear, className }: GearCardProps) {
  const isAvailable = gear.status === "AVAILABLE" && gear.availableStock > 0;
  const rating = averageRating(gear.reviews);
  const price = toNumber(gear.rentalPricePerDay);

  return (
    <Link href={`/gears/${gear.id}`} className="group block">
      <Card
        className={cn(
          "overflow-hidden pt-0 transition-shadow hover:shadow-md",
          className,
        )}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
          <Image
            src={getSafeImageUrl(gear.image)}
            alt={gear.name}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            className={cn(
              "absolute left-2 top-2",
              isAvailable
                ? "bg-green-600 hover:bg-green-600"
                : "bg-muted-foreground",
            )}
          >
            {isAvailable
              ? "Available"
              : gear.status === "INACTIVE"
                ? "Inactive"
                : "Unavailable"}
          </Badge>
          {gear.condition === "USED" && (
            <Badge variant="secondary" className="absolute right-2 top-2">
              Used
            </Badge>
          )}
        </div>

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

        <CardContent className="px-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {gear.description}
          </p>
          {gear.provider?.address && (
            <span className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {gear.provider.address}
            </span>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between px-4 pb-4">
          <div>
            <span className="text-lg font-bold">${price}</span>
            <span className="text-sm text-muted-foreground">/day</span>
          </div>
          <span className="text-xs text-muted-foreground">{gear.brand}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
