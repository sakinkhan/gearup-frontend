"use client";

import { useState } from "react";

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

import { useCreateProviderGear } from "@/hooks/use-provider-my-gears";

type AddGearDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddGearDialog({ open, onOpenChange }: AddGearDialogProps) {
  const createGear = useCreateProviderGear();

  const [categoryName, setCategoryName] = useState("");
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

  const [image, setImage] = useState("");

  const resetForm = () => {
    setCategoryName("");
    setName("");
    setBrand("");
    setDescription("");
    setRentalPricePerDay("");
    setDepositAmount("");
    setStock("");
    setCondition("NEW");
    setStatus("AVAILABLE");
    setImage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createGear.mutateAsync({
        categoryName,
        name,
        brand,
        description,
        rentalPricePerDay: Number(rentalPricePerDay),
        depositAmount: Number(depositAmount),
        stock: Number(stock),
        availableStock: Number(stock),
        condition,
        status,
        image,
      });

      resetForm();
      onOpenChange(false);
    } catch {
      // Error is available through createGear.error
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !createGear.isPending) {
          resetForm();
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Gear</DialogTitle>

          <DialogDescription>
            Add a new piece of equipment to your rental inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>

            <Input
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="e.g. Water Sports"
              required
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="gear-name">Name</Label>

            <Input
              id="gear-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Stand Up Paddleboard"
              required
            />
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <Label htmlFor="gear-brand">Brand</Label>

            <Input
              id="gear-brand"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              placeholder="e.g. Red Paddle Co"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="gear-description">Description</Label>

            <Textarea
              id="gear-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the gear..."
              rows={4}
              required
            />
          </div>

          {/* Price + Deposit */}
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

          {/* Stock + Condition */}
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

          {/* Status */}
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

          {/* Image */}
          <div className="space-y-2">
            <Label htmlFor="gear-image">Image URL</Label>

            <Input
              id="gear-image"
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://..."
              required
            />
          </div>

          {/* Error */}
          {createGear.isError && (
            <p className="text-sm text-destructive">
              {createGear.error instanceof Error
                ? createGear.error.message
                : "Failed to create gear."}
            </p>
          )}

          {/* Actions */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createGear.isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={createGear.isPending}>
              {createGear.isPending ? "Adding..." : "Add Gear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
