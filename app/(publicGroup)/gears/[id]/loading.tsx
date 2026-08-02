import { Skeleton } from "@/components/ui/skeleton";

export default function GearDetailsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Left Section */}
        <div className="space-y-6">
          {/* Main Image */}
          <Skeleton className="aspect-square w-full rounded-xl" />

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="aspect-square w-full rounded-md"
              />
            ))}
          </div>

          {/* Title & Description */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-32" />

            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>

          {/* Specs */}
          <div className="rounded-xl border p-6">
            <Skeleton className="mb-6 h-6 w-40" />

            <div className="grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-xl border p-6 space-y-5">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-10 w-32" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <Skeleton className="h-12 w-full rounded-lg" />

            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
