"use client";

import { useMemo, useState } from "react";

import type { Gear } from "@/types/gear";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { updateGearStatus } from "@/lib/api/admin";
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

type GearTableProps = {
  initialGears: Gear[];
};

const ITEMS_PER_PAGE = 8;

const formatLabel = (value: string) =>
  value.charAt(0) + value.slice(1).toLowerCase();

export function GearTable({ initialGears }: GearTableProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gears, setGears] = useState<Gear[]>(initialGears);
  const [selectedGear, setSelectedGear] = useState<Gear | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const filteredGears = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return gears;

    return gears.filter(
      (gear) =>
        gear.name.toLowerCase().includes(query) ||
        gear.brand.toLowerCase().includes(query) ||
        gear.categoryName.toLowerCase().includes(query) ||
        gear.provider.name.toLowerCase().includes(query) ||
        gear.provider.email.toLowerCase().includes(query),
    );
  }, [gears, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredGears.length / ITEMS_PER_PAGE),
  );

  const paginatedGears = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredGears.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredGears, currentPage]);

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  async function handleStatusChange() {
    if (!selectedGear) return;

    const newStatus =
      selectedGear.status === "INACTIVE" ? "AVAILABLE" : "INACTIVE";

    try {
      setIsUpdatingStatus(true);

      const updatedGear = await updateGearStatus(selectedGear.id, newStatus);

      setGears((currentGears) =>
        currentGears.map((gear) =>
          gear.id === updatedGear.id
            ? {
                ...gear,
                status: updatedGear.status,
              }
            : gear,
        ),
      );

      setSelectedGear(null);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error ? error.message : "Failed to update gear status",
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

        <Input
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
          placeholder="Search gear..."
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gear</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Price / Day</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedGears.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No gear listings found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedGears.map((gear) => (
                <TableRow key={gear.id}>
                  {/* Gear */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={gear.image}
                        alt={gear.name}
                        width={40}
                        height={40}
                        className="size-10 rounded-md object-cover"
                      />

                      <div className="min-w-0">
                        <Link
                          href={`/gears/${gear.id}`}
                          className="font-medium hover:underline"
                        >
                          {gear.name}
                        </Link>

                        <p className="text-muted-foreground text-xs">
                          {gear.brand}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>{gear.categoryName}</TableCell>

                  {/* Provider */}
                  <TableCell>
                    <div>
                      <p className="font-medium">{gear.provider.name}</p>

                      <p className="text-muted-foreground text-xs">
                        {gear.provider.email}
                      </p>
                    </div>
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    ${Number(gear.rentalPricePerDay).toFixed(2)}
                  </TableCell>

                  {/* Condition */}
                  <TableCell>
                    <Badge variant="outline">
                      {formatLabel(gear.condition)}
                    </Badge>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant={
                        gear.status === "AVAILABLE"
                          ? "default"
                          : gear.status === "UNAVAILABLE"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {formatLabel(gear.status)}
                    </Badge>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right">
                    {gear.status === "INACTIVE" ? (
                      <Button
                        size="sm"
                        className="bg-green-600 text-white hover:bg-green-700"
                        onClick={() => setSelectedGear(gear)}
                      >
                        Reactivate
                      </Button>
                    ) : (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setSelectedGear(gear)}
                      >
                        Deactivate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Showing{" "}
          {filteredGears.length === 0
            ? 0
            : (currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
          to {Math.min(currentPage * ITEMS_PER_PAGE, filteredGears.length)} of{" "}
          {filteredGears.length} listings
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            <ChevronLeft />
          </Button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <AlertDialog
        open={!!selectedGear}
        onOpenChange={(open) => {
          if (!open && !isUpdatingStatus) {
            setSelectedGear(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedGear?.status === "INACTIVE"
                ? "Reactivate this gear listing?"
                : "Deactivate this gear listing?"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {selectedGear?.status === "INACTIVE" ? (
                <>
                  Are you sure you want to reactivate{" "}
                  <span className="font-medium">{selectedGear?.name}</span>? The
                  listing will become available to customers again.
                </>
              ) : (
                <>
                  Are you sure you want to deactivate{" "}
                  <span className="font-medium">{selectedGear?.name}</span>? The
                  listing will no longer be available to customers, but its
                  rental history and reviews will be preserved.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdatingStatus}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleStatusChange}
              disabled={isUpdatingStatus}
              className={
                selectedGear?.status === "INACTIVE"
                  ? "bg-green-600 text-white hover:bg-green-700!"
                  : "bg-destructive! text-white hover:bg-destructive/80! hover:text-black!"
              }
            >
              {isUpdatingStatus
                ? "Updating..."
                : selectedGear?.status === "INACTIVE"
                  ? "Reactivate Gear"
                  : "Deactivate Gear"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
