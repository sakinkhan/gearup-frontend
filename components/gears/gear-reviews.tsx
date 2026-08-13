"use client";

import { Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type GearReview = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  customer?: {
    id: string;
    name: string;
    image?: string | null;
  };
};

type GearReviewsProps = {
  reviews: GearReview[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function GearReviews({ reviews }: GearReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            No reviews yet for this gear.
          </p>
        </CardContent>
      </Card>
    );
  }

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Customer Reviews</CardTitle>

          <div className="flex items-center gap-2">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />

            <span className="font-semibold">{averageRating.toFixed(1)}</span>

            <span className="text-sm text-muted-foreground">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {reviews.map((review, index) => (
          <div key={review.id}>
            <div className="flex gap-3">
              <Avatar className="size-10">
                <AvatarImage
                  src={review.customer?.image ?? undefined}
                  alt={review.customer?.name ?? "Customer"}
                />

                <AvatarFallback>
                  {getInitials(review.customer?.name ?? "Customer")}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">
                      {review.customer?.name ?? "Customer"}
                    </p>

                    <div className="mt-1 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={
                            index < review.rating
                              ? "size-3.5 fill-yellow-400 text-yellow-400"
                              : "size-3.5 text-muted-foreground"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {review.comment && (
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {review.comment}
                  </p>
                )}
              </div>
            </div>

            {index < reviews.length - 1 && <Separator className="mt-5" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
