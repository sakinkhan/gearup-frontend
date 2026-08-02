"use client";

import Image from "next/image";

export function GearGallery({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border bg-muted">
      <Image
        src={image || "/placeholder-gear.png"}
        alt={name}
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
