"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useProviderMyGears } from "@/hooks/use-provider-my-gears";
import { ProviderGearCard } from "../_components/provider-gear-card";
import { ProviderGear } from "@/lib/api/provider-my-gears";
import { useState } from "react";
import { EditGearDialog } from "../_components/edit-gear-dialog";
import { DeleteGearDialog } from "../_components/delete-gear-dialog";
import { AddGearDialog } from "../_components/add-gear-dialog";

const ProviderMyGearsPage = () => {
  const { data: gears = [], isLoading, isError, error } = useProviderMyGears();
  const [addGearOpen, setAddGearOpen] = useState(false);
  const [editingGear, setEditingGear] = useState<ProviderGear | null>(null);

  const [deletingGear, setDeletingGear] = useState<ProviderGear | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-40" />
            <Skeleton className="mt-2 h-4 w-64" />
          </div>

          <Skeleton className="h-10 w-28" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-xl border">
              <Skeleton className="aspect-4/3 w-full" />

              <div className="space-y-3 p-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
        <h2 className="font-semibold">Unable to load your gears</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "Something went wrong while loading your gears."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Gears</h1>

          <p className="text-sm text-muted-foreground">
            Manage the equipment you have listed for rental.
          </p>
        </div>

        <Button type="button" onClick={() => setAddGearOpen(true)}>
          <Plus className="size-4" />
          Add Gear
        </Button>
      </div>

      {/* Empty state */}
      {gears.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h2 className="text-lg font-semibold">
            You haven't listed any gears yet
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add your first gear to start renting it out.
          </p>

          <Button asChild className="mt-4">
            <Link href="/provider/gears/create">
              <Plus className="mr-2 size-4" />
              Add Gear
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gears.map((gear) => (
            <ProviderGearCard
              key={gear.id}
              gear={gear}
              onEdit={setEditingGear}
              onDelete={setDeletingGear}
            />
          ))}
          <AddGearDialog open={addGearOpen} onOpenChange={setAddGearOpen} />

          <EditGearDialog
            gear={editingGear}
            open={editingGear !== null}
            onOpenChange={(open) => {
              if (!open) {
                setEditingGear(null);
              }
            }}
          />

          <DeleteGearDialog
            gear={deletingGear}
            open={deletingGear !== null}
            onOpenChange={(open) => {
              if (!open) {
                setDeletingGear(null);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProviderMyGearsPage;
