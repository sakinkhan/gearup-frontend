"use client";

import { useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { toNumber } from "@/lib/api/gears";
import type { Gear } from "@/types/gear";
import { createCheckoutSession } from "@/lib/api/payment";
import { Textarea } from "../../../../components/ui/textarea";

const API_BASE = "/api";

export function RentNowCard({ gear }: { gear: Gear }) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unavailableRanges, setUnavailableRanges] = useState<
    { from: Date; to: Date }[]
  >([]);
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/rentals/gear/${gear.id}/availability`,
          {
            credentials: "include",
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch availability");
        }

        setUnavailableRanges(
          result.data.map(
            (rental: { rentalStartDate: string; rentalEndDate: string }) => ({
              from: new Date(rental.rentalStartDate),
              to: new Date(rental.rentalEndDate),
            }),
          ),
        );
      } catch (error) {
        console.error("Failed to fetch gear availability:", error);
      }
    };

    fetchAvailability();
  }, [gear.id]);

  const pricePerDay = toNumber(gear.rentalPricePerDay);
  const deposit = toNumber(gear.depositAmount);
  const maxQuantity = Math.max(1, gear.availableStock);

  const days = useMemo(() => {
    if (!range?.from || !range?.to) return 0;
    return Math.max(1, differenceInCalendarDays(range.to, range.from));
  }, [range]);

  const subtotal = days * pricePerDay * quantity;
  const totalDeposit = deposit * quantity;
  const total = subtotal + totalDeposit;
  const isAvailable = gear.status === "AVAILABLE" && gear.availableStock > 0;

  const unavailableLabel =
    gear.status === "INACTIVE" ? "No longer listed" : "Currently unavailable";

  const decrementQuantity = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const incrementQuantity = () => {
    setQuantity((q) => Math.min(maxQuantity, q + 1));
  };

  const handleQuantityInput = (value: string) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return;
    setQuantity(Math.min(maxQuantity, Math.max(1, Math.floor(parsed))));
  };

  const handleRent = async () => {
    if (!range?.from || !range?.to) {
      toast.error("Please select a rental date range.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create rental order
      const rentalResponse = await fetch(`${API_BASE}/rentals`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gearId: gear.id,
          rentalStartDate: range.from.toISOString(),
          rentalEndDate: range.to.toISOString(),
          notes: notes.trim(),
          items: [
            {
              gearItemId: gear.id,
              quantity,
            },
          ],
        }),
      });

      const rentalResult = await rentalResponse.json();

      if (!rentalResponse.ok) {
        throw new Error(rentalResult.message || "Booking failed");
      }

      const rentalOrderId = rentalResult.data.id;

      // 2. Create Stripe Checkout Session
      const paymentResult = await createCheckoutSession(rentalOrderId);

      const paymentUrl = paymentResult.data.paymentUrl;

      if (!paymentUrl) {
        throw new Error("Payment URL not found.");
      }

      toast.success("Redirecting to secure payment...");

      // 3. Redirect to Stripe
      window.location.assign(paymentUrl);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Couldn't complete booking. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="text-2xl font-bold">${pricePerDay}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {" "}
            / day
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          {gear.availableStock} of {gear.stock} unit{gear.stock > 1 ? "s" : ""}{" "}
          available
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={!isAvailable}
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 size-4" />
              {range?.from && range?.to
                ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                : "Select rental dates"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              disabled={[{ before: new Date() }, ...unavailableRanges]}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Quantity</span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8"
              disabled={!isAvailable || quantity <= 1}
              onClick={decrementQuantity}
            >
              <Minus className="size-3" />
            </Button>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={maxQuantity}
              value={quantity}
              disabled={!isAvailable}
              onChange={(e) => handleQuantityInput(e.target.value)}
              className="w-12 rounded-md border bg-background text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8"
              disabled={!isAvailable || quantity >= maxQuantity}
              onClick={incrementQuantity}
            >
              <Plus className="size-3" />
            </Button>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label htmlFor="customer-notes" className="text-sm font-medium">
            Customer notes
          </label>

          <Textarea
            id="customer-notes"
            placeholder="Add any special instructions or notes for the provider..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={!isAvailable || isSubmitting}
            rows={3}
            maxLength={500}
          />

          <div className="text-right text-xs text-muted-foreground">
            {notes.length}/500
          </div>
        </div>

        {days > 0 && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                ${pricePerDay} × {days} day{days > 1 ? "s" : ""} × {quantity}{" "}
                unit{quantity > 1 ? "s" : ""}
              </span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Refundable deposit × {quantity}
              </span>
              <span>${totalDeposit}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total due today</span>
              <span>${total}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          disabled={!isAvailable || isSubmitting}
          onClick={handleRent}
        >
          {!isAvailable
            ? unavailableLabel
            : isSubmitting
              ? "Booking..."
              : "Rent Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
