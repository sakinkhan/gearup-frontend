import { z } from "zod";

export const createReviewSchema = z.object({
  gearItemId: z.string().uuid(),
  rentalOrderId: z.string().uuid(),
  rating: z
    .number({ invalid_type_error: "Please select a rating" })
    .int()
    .min(1, "Please select a rating")
    .max(5),
  comment: z
    .string()
    .min(5, "Comment must be at least 5 characters")
    .max(500, "Comment must be under 500 characters"),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;

export interface Review {
  id: string;
  gearItemId: string;
  rentalOrderId: string;
  customerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
