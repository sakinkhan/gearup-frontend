"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import { useMyReviews } from "@/hooks/use-my-reviews";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={
            star <= rating
              ? "size-4 fill-amber-400 text-amber-400"
              : "size-4 text-muted-foreground"
          }
        />
      ))}
    </div>
  );
}

export default function CustomerReviewsPage() {
  const { data: reviews = [], isLoading, isError, error } = useMyReviews();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">My Reviews</h2>
          <p className="text-sm text-muted-foreground">
            Reviews you&apos;ve left for rented gear.
          </p>
        </div>

        <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
          Loading your reviews...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">My Reviews</h2>
          <p className="text-sm text-muted-foreground">
            Reviews you&apos;ve left for rented gear.
          </p>
        </div>

        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-8 text-center text-sm text-destructive">
          {error instanceof Error
            ? error.message
            : "Failed to load your reviews."}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">My Reviews</h2>
          <p className="text-sm text-muted-foreground">
            Reviews you&apos;ve left for rented gear.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Star className="size-6 text-muted-foreground" />
          </div>

          <div>
            <p className="font-medium">No reviews yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Once you return your rented gear, you can leave a review here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-lg font-medium">My Reviews</h2>

        <p className="text-sm text-muted-foreground">
          Reviews you&apos;ve left for rented gear.
        </p>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="flex gap-4">
              {/* Gear image */}
              <div className="relative size-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                <Image
                  src={review.gearItem.image || "/placeholder-gear.png"}
                  alt={review.gearItem.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              </div>

              {/* Review content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium">{review.gearItem.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {review.gearItem.brand}
                    </p>
                  </div>

                  <StarRating rating={review.rating} />
                </div>

                {review.comment && (
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {review.comment}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>
                    Rental: {formatDate(review.rentalOrder.rentalStartDate)} –{" "}
                    {formatDate(review.rentalOrder.rentalEndDate)}
                  </span>

                  <span>Reviewed {formatDate(review.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
