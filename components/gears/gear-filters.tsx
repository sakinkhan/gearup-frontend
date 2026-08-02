"use client";

import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/use-categories";
import type { GearFilters } from "@/types/gear";
import { useGearBrands } from "@/hooks/use-gear-brands";

const MAX_PRICE = 500;

type GearFiltersSidebarProps = {
  filters: GearFilters;
  onChange: (next: Partial<GearFilters>) => void;
  onReset: () => void;
};

export function GearFiltersSidebar({
  filters,
  onChange,
  onReset,
}: GearFiltersSidebarProps) {
  const { data: categories = [] } = useCategories();
  const brands = useGearBrands();

  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice ?? 0,
    filters.maxPrice ?? MAX_PRICE,
  ]);

  const hasActiveFilters = Boolean(
    filters.search ||
    filters.categoryName ||
    filters.brand ||
    filters.minPrice != null ||
    filters.maxPrice != null ||
    filters.status ||
    filters.startDate ||
    filters.endDate,
  );

  const dateRange: DateRange | undefined =
    filters.startDate && filters.endDate
      ? { from: new Date(filters.startDate), to: new Date(filters.endDate) }
      : undefined;

  return (
    <aside className="h-fit space-y-6 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="h-auto p-1 text-xs text-muted-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X className="mr-1 size-3" />
          Clear all
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search gear..."
          defaultValue={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={filters.categoryName ?? "all"}
          onValueChange={(value) =>
            onChange({ categoryName: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Brand</Label>
        <Select
          value={filters.brand ?? "all"}
          onValueChange={(value) =>
            onChange({ brand: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Price per day</Label>
          <span className="text-xs text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          min={0}
          max={MAX_PRICE}
          step={5}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          onValueCommit={(value) =>
            onChange({ minPrice: value[0], maxPrice: value[1] })
          }
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Availability dates</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 size-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL d")} -{" "}
                    {format(dateRange.to, "LLL d")}
                  </>
                ) : (
                  format(dateRange.from, "LLL d")
                )
              ) : (
                "Pick a date range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) =>
                onChange({
                  startDate: range?.from ? range.from.toISOString() : undefined,
                  endDate: range?.to ? range.to.toISOString() : undefined,
                })
              }
              disabled={{ before: new Date() }}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={filters.status ?? "all"}
          onValueChange={(value) =>
            onChange({
              status:
                value === "all" ? undefined : (value as GearFilters["status"]),
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Any status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            <SelectItem value="AVAILABLE">Available</SelectItem>
            <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}
