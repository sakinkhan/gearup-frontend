"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteProviderGear } from "@/hooks/use-provider-my-gears";
import { ProviderGear } from "@/lib/api/provider-my-gears";

type DeleteGearDialogProps = {
  gear: ProviderGear | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteGearDialog({
  gear,
  open,
  onOpenChange,
}: DeleteGearDialogProps) {
  const deleteGear = useDeleteProviderGear();

  if (!gear) return null;

  const handleDelete = async () => {
    await deleteGear.mutateAsync(gear.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className="font-medium text-foreground">{gear.name}</span>.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteGear.isError && (
          <p className="text-sm text-destructive">
            {deleteGear.error instanceof Error
              ? deleteGear.error.message
              : "Failed to delete gear."}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteGear.isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteGear.isPending}
            className="bg-destructive! text-white hover:bg-destructive/60! hover:text-black!"
          >
            {deleteGear.isPending ? "Deleting..." : "Delete Gear"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
