import { AlertTriangle, PackageSearch } from "lucide-react";

import { Gear } from "@/types/gear";
import { GearCard } from "./gear-card";
import { GearCardSkeleton } from "./gear-card-skeleton";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type GearGridProps = {
  gears?: Gear[];
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function GearGrid({
  gears = [],
  isLoading,
  isFetching,
  isError,
  onRetry,
  page,
  totalPages,
  onPageChange,
}: GearGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <GearCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Only show error when request actually fails
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-24 text-center">
        <AlertTriangle className="size-10 text-destructive" />

        <div>
          <p className="font-medium text-foreground">Something went wrong</p>

          <p className="text-sm text-muted-foreground">
            We couldn't load gears right now.
          </p>
        </div>

        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        )}
      </div>
    );
  }

  // Empty API response is not an error
  if (gears.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-24 text-center">
        <PackageSearch className="size-10 text-muted-foreground" />

        <div>
          <p className="font-medium text-foreground">No gear found</p>

          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div
        className={`grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
          isFetching ? "opacity-60" : "opacity-100"
        }`}
      >
        {gears.map((gear) => (
          <GearCard key={gear.id} gear={gear} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault();

                  if (page > 1) {
                    onPageChange(page - 1);
                  }
                }}
                className={
                  page === 1 ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageNumber}
                    onClick={(event) => {
                      event.preventDefault();
                      onPageChange(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault();

                  if (page < totalPages) {
                    onPageChange(page + 1);
                  }
                }}
                className={
                  page === totalPages
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
