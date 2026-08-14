import { GearCardSkeleton } from "@/app/(publicGroup)/gears/_components/gear-card-skeleton";

export default function GearsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <div className="h-96 rounded-lg border bg-card" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <GearCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
