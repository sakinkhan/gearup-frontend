import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Gear } from "@/types/gear";

const availabilityStyles: Record<Gear["availability"], string> = {
  available: "bg-green-500/10 text-green-600 border-green-500/20",
  unavailable: "bg-red-500/10 text-red-600 border-red-500/20",
  maintenance: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

const availabilityLabels: Record<Gear["availability"], string> = {
  available: "Available",
  unavailable: "Unavailable",
  maintenance: "In Maintenance",
};

export function GearCard({ gear }: { gear: Gear }) {
  const image = gear.images?.[0] ?? "/placeholder-gear.png";

  return (
    <Link
      href={`/gears/${gear.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        <Image
          src={image}
          alt={gear.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge
          variant="outline"
          className={cn("absolute top-2 right-2 border backdrop-blur-sm", availabilityStyles[gear.availability])}
        >
          {availabilityLabels[gear.availability]}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {gear.category}
          </span>
          {gear.brand && <span className="text-xs text-muted-foreground">{gear.brand}</span>}
        </div>
        <h3 className="line-clamp-1 font-semibold text-foreground">{gear.name}</h3>
        <div className="mt-auto flex items-baseline gap-1 pt-2">
          <span className="text-lg font-bold text-foreground">${gear.pricePerDay.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">/ day</span>
        </div>
      </div>
    </Link>
  );
}