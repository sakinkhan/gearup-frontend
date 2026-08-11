"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateReview } from "@/hooks/use-create-review";
import { createReviewSchema, type CreateReviewInput } from "@/types/review";

interface ReviewDialogProps {
  gearItemId: string;
  gearName: string;
  rentalOrderId: string;
}

export function ReviewDialog({
  gearItemId,
  gearName,
  rentalOrderId,
}: ReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateReview();

  const form = useForm<CreateReviewInput>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      gearItemId,
      rentalOrderId,
      rating: 0,
      comment: "",
    },
  });

  const rating = form.watch("rating");

  function onSubmit(values: CreateReviewInput) {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset({ gearItemId, rentalOrderId, rating: 0, comment: "" });
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Leave a review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review {gearName}</DialogTitle>
          <DialogDescription>
            Share how the gear performed during your rental.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    form.setValue("rating", value, { shouldValidate: true })
                  }
                  className="p-0.5"
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                >
                  <Star
                    className={cn(
                      "h-6 w-6 transition-colors",
                      value <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-none text-muted-foreground",
                    )}
                  />
                </button>
              ))}
            </div>
            {form.formState.errors.rating && (
              <p className="text-sm text-destructive">
                {form.formState.errors.rating.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="comment">
              Comment
            </label>
            <Textarea
              id="comment"
              rows={4}
              placeholder="What worked well? Anything the provider should know?"
              {...form.register("comment")}
            />
            {form.formState.errors.comment && (
              <p className="text-sm text-destructive">
                {form.formState.errors.comment.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
