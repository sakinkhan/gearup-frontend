"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useReturnRental } from "@/hooks/use-return-rental";

interface ReturnRentalButtonProps {
  rentalOrderId: string;
}

export function ReturnRentalButton({ rentalOrderId }: ReturnRentalButtonProps) {
  const { mutate, isPending } = useReturnRental();

  const handleReturn = () => {
    mutate(rentalOrderId);
  };

  return (
    <Button
      variant="outline"
      className="w-full "
      size="sm"
      onClick={handleReturn}
      disabled={isPending}
    >
      <RotateCcw className="mr-2 size-4" />

      {isPending ? "Returning..." : "Return gear"}
    </Button>
  );
}
