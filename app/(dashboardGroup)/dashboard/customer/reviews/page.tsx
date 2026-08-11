import { Star } from "lucide-react";

export default function CustomerReviewsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">My Reviews</h2>
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-12 text-center text-sm text-muted-foreground">
        <Star className="size-6" />
        <p>Coming soon — this will list the reviews you&apos;ve left.</p>
        <p className="text-xs">
          Waiting on a GET /api/reviews/my (or similar) endpoint.
        </p>
      </div>
    </div>
  );
}
