"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUpdateProviderGear } from "@/hooks/use-provider-my-gears";
import { ProviderGear } from "@/lib/api/provider-my-gears";

type EditGearDialogProps = {
  gear: ProviderGear | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditGearDialog({
  gear,
  open,
  onOpenChange,
}: EditGearDialogProps) {
  const updateGear = useUpdateProviderGear();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [rentalPricePerDay, setRentalPricePerDay] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [stock, setStock] = useState("");
  const [condition, setCondition] = useState<"NEW" | "GOOD" | "FAIR" | "USED">(
    "NEW",
  );
  const [status, setStatus] = useState<
    "AVAILABLE" | "UNAVAILABLE" | "INACTIVE"
  >("AVAILABLE");

  useEffect(() => {
    if (!gear) return;

    setName(gear.name);
    setBrand(gear.brand);
    setDescription(gear.description);
    setRentalPricePerDay(gear.rentalPricePerDay);
    setDepositAmount(gear.depositAmount);
    setStock(String(gear.stock));
    setCondition(gear.condition);
    setStatus(gear.status);
  }, [gear]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!gear) return;

    await updateGear.mutateAsync({
      id: gear.id,
      payload: {
        name,
        brand,
        description,
        rentalPricePerDay: Number(rentalPricePerDay),
        depositAmount: Number(depositAmount),
        stock: Number(stock),
        condition,
        status,
      },
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Gear</DialogTitle>

          <DialogDescription>
            Update the details of your gear item.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="gear-name">Name</Label>

            <Input
              id="gear-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gear-brand">Brand</Label>

            <Input
              id="gear-brand"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gear-description">Description</Label>

            <Textarea
              id="gear-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gear-price">Rental Price / Day</Label>

              <Input
                id="gear-price"
                type="number"
                min="0"
                step="0.01"
                value={rentalPricePerDay}
                onChange={(event) => setRentalPricePerDay(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gear-deposit">Deposit</Label>

              <Input
                id="gear-deposit"
                type="number"
                min="0"
                step="0.01"
                value={depositAmount}
                onChange={(event) => setDepositAmount(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gear-stock">Stock</Label>

              <Input
                id="gear-stock"
                type="number"
                min="1"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Condition</Label>
              <Select
                value={condition}
                onValueChange={(value) =>
                  setCondition(value as "NEW" | "GOOD" | "FAIR" | "USED")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="GOOD">Good</SelectItem>
                  <SelectItem value="FAIR">Fair</SelectItem>
                  <SelectItem value="USED">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 grid grid-cols-2">
            <div className="space-y-2">
              <Label>Status</Label>

              <Select
                value={status}
                onValueChange={(value) =>
                  setStatus(value as "AVAILABLE" | "UNAVAILABLE" | "INACTIVE")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="AVAILABLE">Available</SelectItem>

                  <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>

                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {updateGear.isError && (
            <p className="text-sm text-destructive">
              {updateGear.error instanceof Error
                ? updateGear.error.message
                : "Failed to update gear."}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateGear.isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={updateGear.isPending}>
              {updateGear.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
