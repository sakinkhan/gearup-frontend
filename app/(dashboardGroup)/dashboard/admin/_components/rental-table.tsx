"use client";

import { useMemo, useState } from "react";

import type { RentalOrder, RentalOrderStatus } from "@/types/rental";

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
import { RentalDetailsDialog } from "./rental-details-dialog";

type RentalTableProps = {
  initialOrders: RentalOrder[];
};

const ITEMS_PER_PAGE = 8;

function formatStatus(status: RentalOrderStatus) {
  return status
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

function getStatusVariant(status: RentalOrderStatus) {
  switch (status) {
    case "PAID":
      return "secondary";

    case "CONFIRMED":
      return "default";

    case "PICKED_UP":
      return "default";

    case "RETURNED":
      return "secondary";

    case "COMPLETED":
      return "default";

    case "CANCELLED":
      return "destructive";

    case "PENDING_PAYMENT":
      return "outline";

    default:
      return "outline";
  }
}

export function RentalTable({ initialOrders }: RentalTableProps) {
  const [orders] = useState<RentalOrder[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<RentalOrder | null>(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return orders;

    return orders.filter((order) => {
      const matchesOrder = order.id.toLowerCase().includes(query);

      const matchesCustomer =
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query);

      const matchesGear = order.rentalItems.some(
        (item) =>
          item.gearItem.name.toLowerCase().includes(query) ||
          item.gearItem.brand.toLowerCase().includes(query),
      );

      return matchesOrder || matchesCustomer || matchesGear;
    });
  }, [orders, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ITEMS_PER_PAGE),
  );

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

        <Input
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
          placeholder="Search orders..."
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Gear</TableHead>
              <TableHead>Rental Period</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No rental orders found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  {/* Order */}
                  <TableCell>
                    <span className="font-mono text-xs">
                      #{order.id.slice(0, 8)}
                    </span>
                  </TableCell>

                  {/* Customer */}
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer.name}</p>

                      <p className="text-muted-foreground text-xs">
                        {order.customer.email}
                      </p>
                    </div>
                  </TableCell>

                  {/* Gear */}
                  <TableCell>
                    <div className="space-y-2">
                      {order.rentalItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <Image
                            src={item.gearItem.image}
                            alt={item.gearItem.name}
                            width={36}
                            height={36}
                            className="size-9 rounded-md object-cover"
                          />

                          <div className="min-w-0">
                            <Link
                              href={`/gears/${item.gearItem.id}`}
                              className="font-medium hover:underline"
                            >
                              {item.gearItem.name}
                            </Link>

                            <p className="text-muted-foreground text-xs">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* Rental Period */}
                  <TableCell>
                    <div className="text-sm">
                      <p>
                        {new Date(order.rentalStartDate).toLocaleDateString()}
                      </p>

                      <p className="text-muted-foreground">
                        to {new Date(order.rentalEndDate).toLocaleDateString()}
                      </p>

                      <p className="text-muted-foreground text-xs">
                        {order.totalDays}{" "}
                        {order.totalDays === 1 ? "day" : "days"}
                      </p>
                    </div>
                  </TableCell>

                  {/* Total */}
                  <TableCell className="font-medium">
                    ${Number(order.totalAmount).toFixed(2)}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>
                      {formatStatus(order.status)}
                    </Badge>
                  </TableCell>
                  {/* Action */}
                  <TableCell className="text-right">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </Button>
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
          {filteredOrders.length === 0
            ? 0
            : (currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
          to {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
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
      {/* Rental Details Dialog */}
      <RentalDetailsDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedOrder(null);
          }
        }}
      />
    </div>
  );
}
