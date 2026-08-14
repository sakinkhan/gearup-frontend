"use client";

import { useMemo, useState } from "react";
import type { User } from "@/types/user";
import { updateUserStatus } from "@/lib/api/admin";

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

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UsersTableProps = {
  initialUsers: User[];
};

const ITEMS_PER_PAGE = 8;

export function UsersTable({ initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query),
    );
  }, [users, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / ITEMS_PER_PAGE),
  );

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  const formatLabel = (value: string) =>
    value.charAt(0) + value.slice(1).toLowerCase();

  async function handleStatusChange() {
    if (!selectedUser) return;

    const newStatus = selectedUser.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    try {
      setIsUpdating(true);

      const updatedUser = await updateUserStatus(selectedUser.id, newStatus);

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        ),
      );

      setSelectedUser(null);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to update user status",
      );
    } finally {
      setIsUpdating(false);
    }
  }
  const roleBadgeClasses = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "border-purple-500 text-purple-600 dark:text-purple-400";

      case "PROVIDER":
        return "border-blue-500 text-blue-600 dark:text-blue-400";

      case "CUSTOMER":
        return "border-green-500 text-green-600 dark:text-green-400";

      default:
        return "border-gray-500 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

          <Input
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search users..."
            className="pl-9"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border">
          <Table className="min-w-187.5 text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="w-50">User</TableHead>
                <TableHead className="w-55">Email</TableHead>
                <TableHead className="w-30">Role</TableHead>
                <TableHead className="w-30">Status</TableHead>
                <TableHead className="w-30">Joined</TableHead>
                <TableHead className="w-30 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex min-w-0 items-center gap-2">
                        <Avatar className="size-8 shrink-0">
                          <AvatarImage
                            src={user.image || undefined}
                            alt={user.name}
                          />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((name) => name[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <span
                          className="max-w-35 truncate font-medium sm:max-w-42.5"
                          title={user.name}
                        >
                          {user.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span
                        className="block max-w-40 truncate text-xs sm:max-w-50 sm:text-sm"
                        title={user.email}
                      >
                        {user.email}
                      </span>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-[11px] sm:text-xs ${roleBadgeClasses(user.role)}`}
                      >
                        {formatLabel(user.role)}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          user.status === "ACTIVE" ? "default" : "destructive"
                        }
                        className="text-[11px] sm:text-xs"
                      >
                        {formatLabel(user.status)}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right">
                      {user.role === "ADMIN" ? (
                        <Button
                          className="text-muted-foreground h-8 px-2 text-xs sm:px-3 sm:text-sm"
                          disabled
                          variant="outline"
                        >
                          Protected
                        </Button>
                      ) : (
                        <Button
                          variant={
                            user.status === "ACTIVE" ? "destructive" : "default"
                          }
                          size="sm"
                          className="h-8 px-2 text-xs sm:px-3 sm:text-sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          {user.status === "ACTIVE" ? "Suspend" : "Activate"}
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-xs sm:text-sm">
            Showing{" "}
            {filteredUsers.length === 0
              ? 0
              : (currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
            to {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>

            <span className="text-xs sm:text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      <AlertDialog
        open={!!selectedUser}
        onOpenChange={(open) => {
          if (!open && !isUpdating) {
            setSelectedUser(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedUser?.status === "ACTIVE"
                ? "Suspend this user?"
                : "Activate this user?"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {selectedUser?.status === "ACTIVE"
                ? `${selectedUser.name} will no longer be able to use their GearUp account until activated again.`
                : `${selectedUser?.name} will be able to use their GearUp account again.`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleStatusChange}
              disabled={isUpdating}
              className={
                selectedUser?.status === "ACTIVE"
                  ? "bg-destructive! text-white! hover:bg-destructive/80! hover:text-black!"
                  : "bg-primary hover:bg-green-800! hover:text-white!"
              }
            >
              {isUpdating
                ? "Updating..."
                : selectedUser?.status === "ACTIVE"
                  ? "Suspend User"
                  : "Activate User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
