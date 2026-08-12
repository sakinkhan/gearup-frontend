import type { CreateReviewInput, Review } from "@/types/review";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export async function createReview(input: CreateReviewInput): Promise<Review> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    },
  );

  const body: ApiEnvelope<Review> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to submit review");
  }

  return body.data;
}

export async function fetchMyReviews(): Promise<ApiEnvelope<Review[]>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews/myReviews`,
    {
      credentials: "include",
    },
  );

  const body: ApiEnvelope<Review[]> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load reviews");
  }

  return body;
}
